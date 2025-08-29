from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Complaint
from .serializers import ComplaintSerializer
from utils.assign_authority import assign_authority
from notifications.models import Notification
from ml.classify import classify_complaint
from rest_framework.permissions import IsAuthenticated, AllowAny
from notifications.utils import notify_user, notify_assigned_authorities_for_complaint
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

        serializer = ComplaintSerializer(data=request.data)
        if serializer.is_valid():
            complaint = serializer.save(user=request.user, status="under review")
            text = complaint.title + " " + complaint.description
            result = classify_complaint(text)

            if result == "genuine":
                complaint.status = "genuine"
                complaint.save()

                assign_authority(complaint)

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
                    user=complaint.user,
                    message=f"Your complaint '{complaint.title}' has been marked as spam and rejected."
                )

            return Response(ComplaintSerializer(complaint).data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class ListComplaints(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        
        complaints = Complaint.objects.filter(status = "genuine").order_by('-created_at')
        serializer = ComplaintSerializer(complaints, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

        

