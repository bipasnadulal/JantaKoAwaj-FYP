from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.generics import UpdateAPIView
from rest_framework.response import Response
from rest_framework import status
from .models import Complaint
from .serializers import ComplaintSerializer, ComplaintUpdateSerializer, TopComplaintSerializer
from authorities.models import Authority
from utils.assign_authority import assign_authority
from notifications.models import Notification
from votes.models import Vote
from ml.classify import classify_complaint
from rest_framework.permissions import IsAuthenticated, AllowAny
from notifications.utils import notify_user, notify_assigned_authorities_for_complaint
from authorities.auth_backend import AuthorityJWTAuthentication
from rest_framework import permissions
from notifications.utils import notify_assigned_authorities_for_complaint
from django.db.models import Count, Q
from .models import Complaint, ComplaintUpdate



# Create your views here.

class CreateComplaint(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Check for duplicate complaint by the same user
        title = request.data.get('title')
        description = request.data.get('description')
        category = request.data.get('category')

        if Complaint.objects.filter(user=request.user, title=title, description=description, category=category).exists():
            return Response(
                {"error": "You have already submitted this complaint."}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = ComplaintSerializer(data=request.data, context={"request": request})

        if serializer.is_valid():
            complaint = serializer.save(user=request.user, status="under review")
            text = complaint.title + " " + complaint.description
            result = classify_complaint(text)

            assigned_authority = assign_authority(complaint.category)
            complaint.authority = assigned_authority

            if result == "genuine":
                complaint.status = "genuine"
                complaint.save()

                notify_user(
                    user=complaint.user,
                    complaint=complaint,
                    message=f"Your complaint '{complaint.title}' has been marked as genuine and assigned to {complaint.authority}."
                )

                notify_assigned_authorities_for_complaint(complaint)

            else:
                complaint.status = "rejected"
                complaint.authority = assign_authority(complaint.category)
                complaint.save()
                Notification.objects.create(
                    recipient_user=complaint.user,
                    complaint=complaint,
                    message=f"Your complaint '{complaint.title}' has been marked as spam and rejected."
                )

            return Response(ComplaintSerializer(complaint).data, status=status.HTTP_201_CREATED)

        # If serializer fails
        print("Serializer errors:", serializer.errors)
        return Response(
            {"error": "Invalid data submitted", "details": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )

    
class ListComplaints(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        
        complaints = Complaint.objects.filter(status__in=["genuine", "reviewed"]).order_by('-created_at')
        serializer = ComplaintSerializer(complaints, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

        
class UserComplaintsView(ListAPIView):
    serializer_class = ComplaintSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Complaint.objects.filter(user=self.request.user)


class UserOverviewAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        
        
        total_complaints = Complaint.objects.filter(user=user).count()
        
        
        votes_cast = Vote.objects.filter(user=user).count()
        
        
        resolved_issues = Complaint.objects.filter(user=user, status="resolved").count()
        
        data = {
            "total_complaints": total_complaints,
            "votes_cast": votes_cast,
            "resolved_issues": resolved_issues,
        }
        return Response(data)
    

class AssignedComplaintsView(APIView):
    authentication_classes = [AuthorityJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        authority = request.user  # Logged-in authority
        # Filter complaints assigned to this authority
        complaints = Complaint.objects.filter(authority=authority)
        serializer = ComplaintSerializer(complaints, many=True)
        return Response(serializer.data)
    

class UpdateComplaintStatusView(UpdateAPIView):
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    authentication_classes = [AuthorityJWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    STATUS_MESSAGES = {
        'submitted': 'has been submitted',
        'in_progress': 'is now in progress',
        'reviewed': 'has been reviewed',
        'genuine': 'has been marked as genuine',
        'resolved': 'has been resolved',
        'rejected': 'has been rejected'
    }

    def update(self, request, *args, **kwargs):
        complaint = self.get_object()
        authority = request.user  

        # Check authority (for authorization)
        if complaint.authority != authority:
            return Response({"error": "Not authorized"}, status=status.HTTP_403_FORBIDDEN)

        old_status = complaint.status

        
        allowed_fields = ["status", "progress", "response_text", "response_file"]
        data = {field: request.data[field] for field in allowed_fields if field in request.data}

        serializer = self.get_serializer(complaint, data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            updated_complaint = serializer.instance
            new_status = updated_complaint.status

            # Log complaint update history
            ComplaintUpdate.objects.create(
                complaint=updated_complaint,
                status=new_status,
                progress=updated_complaint.progress,
                response_text=data.get("response_text", ""),
                response_file=data.get("response_file")
            )

            # Notify user about status change
            if complaint.user and old_status != new_status:
                status_message = self.STATUS_MESSAGES.get(new_status, "status updated")
                Notification.objects.create(
                    recipient_user=complaint.user,
                    complaint=complaint,
                    message=f"Your complaint '{complaint.title}' {status_message}."
                )

            # Notify user if authority responded
            if complaint.user and "response_text" in data:
                Notification.objects.create(
                    recipient_user=complaint.user,
                    complaint=complaint,
                    message=f"The authority responded to your complaint '{complaint.title}': {data['response_text'][:100]}"
                )

            # Notify authority themselves
            Notification.objects.create(
                recipient_authority=authority,
                complaint=complaint,
                message=f"You updated complaint '{complaint.title}' from '{old_status}' to '{new_status}'."
            )

            return Response(serializer.data, status=status.HTTP_200_OK)

        # # If invalid, log errors for debugging
        # print("Update errors:", serializer.errors)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ComplaintCountsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        authority = request.user  
        assigned_complaints = Complaint.objects.filter(authority=authority)

        total = assigned_complaints.count()
        resolved = assigned_complaints.filter(status='resolved').count()
        pending = assigned_complaints.filter(status='pending').count()

        return Response({
            'total': total,
            'resolved': resolved,
            'pending': pending,
        })
    


class ComplaintHistoryView(APIView):
    permission_classes = [AllowAny] 
    def get(self, request, pk):
        complaint = Complaint.objects.get(pk=pk)
        updates = complaint.updates.order_by("created_at")
        serializer = ComplaintUpdateSerializer(updates, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    


class ComplaintsSummaryAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self):
        total = Complaint.objects.count()
        statuses = [
            {"label": "Complaint Registered", "count": total},
            {"label": "Resolved by Authority", "count": Complaint.objects.filter(status="resolved").count()},
            {"label": "Reviewed, No Action", "count": Complaint.objects.filter(status="rejected").count()},
            {"label": "Under Processing", "count": Complaint.objects.filter(status="in-progress").count()},
            {"label": "Not Addressed", "count": Complaint.objects.filter(status="under review").count()},
        ]

        for stat in statuses:
            stat["percentage"] = round((stat["count"] / total) * 100, 2) if total > 0 else 0

        return Response({"total": total, "statuses": statuses})
    

class TopComplaintsView(APIView):
    permission_classes = [AllowAny] 

    def get(self, request):
        
        top_complaints = Complaint.objects.annotate(
            agree_count=Count('votes', filter=Q(votes__vote_type='agree'))
        ).order_by('-agree_count')[:4]

        serializer = ComplaintSerializer(top_complaints, many=True, context={'request': request})
        return Response(serializer.data)