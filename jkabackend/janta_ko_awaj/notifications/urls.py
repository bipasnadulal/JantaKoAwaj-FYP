from django.urls import path
from .views import (UserNotificationsView, MarkNotificationAsReadView, AuthorityNotificationsView, MarkAuthorityNotificationAsReadView)

urlpatterns = [
    #--------User Notifications URLs--------#
    path('', UserNotificationsView.as_view(), name='user-notifications'),
    path('<int:pk>/read/', MarkNotificationAsReadView.as_view(), name='mark-notification-as-read'),

    #--------Authority Notifications URLs--------#
     path('authority/', AuthorityNotificationsView.as_view(), name='authority-notifications'),
    path('authority/<int:pk>/read/', MarkAuthorityNotificationAsReadView.as_view(), name='mark-authority-notification-as-read'),
]
