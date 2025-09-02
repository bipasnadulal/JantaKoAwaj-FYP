from django.urls import path
from .views import CreateComplaint, ListComplaints, UserComplaintsView, UserOverviewAPIView, AssignedComplaintsView, UpdateComplaintStatusView, ComplaintCountsView, ComplaintHistoryView, ComplaintsSummaryAPIView, TopComplaintsView

urlpatterns = [
    path('create/', CreateComplaint.as_view(), name='create-complaint'),
    path('list/', ListComplaints.as_view(), name='list-complaints'),
    path('user/', UserComplaintsView.as_view(), name='user-complaints'),
    path('overview/', UserOverviewAPIView.as_view(), name='user-overview'),
    path('assigned/', AssignedComplaintsView.as_view(), name='assigned-complaints'),
    path("<int:pk>/update/", UpdateComplaintStatusView.as_view(), name="update-complaint"),
    path('counts/', ComplaintCountsView.as_view(), name='complaint-counts'),
    path("<int:pk>/history/", ComplaintHistoryView.as_view(), name="complaint-history"),
    path("summary/", ComplaintsSummaryAPIView.as_view(), name="complaints-summary"),
    path("top/", TopComplaintsView.as_view(), name="top-complaints"),
]
