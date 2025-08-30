from django.urls import path
from .views import CreateComplaint, ListComplaints, UserComplaintsView

urlpatterns = [
    path('create/', CreateComplaint.as_view(), name='create-complaint'),
    path('list/', ListComplaints.as_view(), name='list-complaints'),
    path('user/', UserComplaintsView.as_view(), name='user-complaints'),
]
