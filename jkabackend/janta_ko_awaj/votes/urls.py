# votes/urls.py
from django.urls import path
from .views import VoteAPIView

urlpatterns = [
    path("complaints/<int:complaint_id>/vote/", VoteAPIView.as_view(), name="vote"),
]
