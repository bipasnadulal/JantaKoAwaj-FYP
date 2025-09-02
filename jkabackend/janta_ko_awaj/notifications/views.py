from django.shortcuts import render
from rest_framework import generics, permissions
from .models import Notification
from .serializers import NotificationSerializer
from rest_framework.response import Response


# Create your views here.


#--------User Notifications Views--------#
class UserNotificationsView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(
            recipient_user=self.request.user
        ).order_by('-created_at')
    

# class MarkNotificationAsReadView(generics.UpdateAPIView):
#     serializer_class = NotificationSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         return Notification.objects.filter(
#             recipient_user=self.request.user
#         )


class MarkNotificationAsReadView(generics.UpdateAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(recipient_user=self.request.user)

    def patch(self, request, *args, **kwargs):
        notification = self.get_object()
        notification.read = True
        notification.save()
        serializer = self.get_serializer(notification)
        return Response(serializer.data)

    


#--------Authority Notifications Views--------#
class AuthorityNotificationsView(generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Fetch notifications assigned to the authority (based on logged-in authority user).
        Assuming Notification model has a field like `authority` that links to user/authority.
        """
        return Notification.objects.filter(recipient_authority=self.request.user).order_by('-created_at')


class MarkAuthorityNotificationAsReadView(generics.UpdateAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(recipient_authority=self.request.user)
    

