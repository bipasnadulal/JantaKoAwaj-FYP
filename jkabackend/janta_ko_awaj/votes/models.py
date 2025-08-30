from django.db import models
from django.conf import settings
from complaints.models import Complaint
# Create your models here.
class Vote(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="votes")

    complaint = models.ForeignKey(Complaint, on_delete=models.CASCADE, related_name="votes")
    vote_type = models.CharField(max_length=10, choices=[("agree", "Agree"), ("disagree", "Disagree")])

    class Meta:
        unique_together = ("user", "complaint")  
