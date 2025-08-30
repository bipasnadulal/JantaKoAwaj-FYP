from django.urls import path
from .views import CreateComplaint, ListComplaints, UserComplaintsView, UserOverviewAPIView, AssignedComplaintsView

urlpatterns = [
    path('create/', CreateComplaint.as_view(), name='create-complaint'),
    path('list/', ListComplaints.as_view(), name='list-complaints'),
    path('user/', UserComplaintsView.as_view(), name='user-complaints'),
    path('overview/', UserOverviewAPIView.as_view(), name='user-overview'),
    path('assigned/', AssignedComplaintsView.as_view(), name='assigned-complaints'),
]
