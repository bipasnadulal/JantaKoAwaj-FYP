from django.urls import path
from .views import UserNotificationsView, MarkNotificationAsReadView

urlpatterns = [
    path('', UserNotificationsView.as_view(), name='user-notifications'),
    path('<int:pk>/read/', MarkNotificationAsReadView.as_view(), name='mark-notification-as-read'),
]