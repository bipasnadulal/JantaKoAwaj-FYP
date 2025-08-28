from rest_framework import serializers
from .models import Notification

class NotificationSerializer(serializers.ModelSerializer):
    complaint_title = serializers.CharField(source="complaint.title", read_only=True)
    class Meta:
        model = Notification
        fields = ['id', 'message', 'read', 'created_at']
        