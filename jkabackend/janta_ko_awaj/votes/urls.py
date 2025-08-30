# votes/urls.py
from django.urls import path
from .views import VoteAPIView, UserVotedComplaintsAPIView

urlpatterns = [
    path("complaints/<int:complaint_id>/vote/", VoteAPIView.as_view(), name="vote"),

    path("complaints/voted/", UserVotedComplaintsAPIView.as_view(), name="voted-complaints"),
]
