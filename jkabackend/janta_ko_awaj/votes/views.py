from complaints.serializers import ComplaintSerializer
from complaints.models import Complaint
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.shortcuts import get_object_or_404
from .models import Vote
from notifications.utils import notify_vote_thresholds

class VoteAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, complaint_id):
        complaint = get_object_or_404(Complaint, id=complaint_id)
        vote_type = request.data.get("vote_type")

        existing_vote = Vote.objects.filter(user=request.user, complaint=complaint).first()

        if existing_vote:
            existing_vote.vote_type = vote_type
            existing_vote.save()
        else:
            Vote.objects.create(user=request.user, complaint=complaint, vote_type=vote_type)

        agree = complaint.votes.filter(vote_type='agree').count()
        disagree = complaint.votes.filter(vote_type='disagree').count()
        total = agree + disagree
        notify_vote_thresholds(complaint, agree, total)

        complaint.refresh_from_db()
        
        # Return the updated complaint
        serializer = ComplaintSerializer(complaint, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)
