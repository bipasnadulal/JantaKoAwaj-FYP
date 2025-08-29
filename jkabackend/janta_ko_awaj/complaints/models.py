from django.db import models
from django.conf import settings
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver

from notifications.models import Notification  
from notifications.utils import notify_user


STATUS_CHOICES = [
    ("under review", "Under Review"),
    ("genuine", "Genuine"),
    ("rejected", "Rejected"),
    ("in-progress", "In Progress"),
    ("resolved", "Resolved"),
]

CATEGORY_CHOICES = [
    ("Public Infrastructure", "Public Infrastructure"),
    ("Environment", "Environment"),
    ("Municipal Guard", "Municipal Guard"),
    ("Education", "Education"),
    ("Agriculture and Livestocks", "Agriculture and Livestocks"),
]

class Complaint(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="under review")

    province = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    municipality = models.CharField(max_length=100)
    ward = models.CharField(max_length=50, null=True, blank=True) 

    authority = models.CharField(max_length=100, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    last_threshold_notified = models.PositiveSmallIntegerField(default=0)

    def __str__(self):
        return f"{self.title} - {self.user.username}"



#for the new complaint received notification
@receiver(post_save, sender=Complaint)
def create_complaint_notification(sender, instance, created, **kwargs):
    if created:
        notify_user(
            user=instance.user,
            complaint=instance,
            message=f"Your complaint '{instance.title}' has been submitted and is under review."
        )


#for the status change notification
@receiver(pre_save, sender=Complaint)
def complaint_status_change_notification(sender, instance, **kwargs):
    if instance.pk:
        old_instance = Complaint.objects.get(pk=instance.pk)
        if old_instance.status != instance.status:
            notify_user(
                user=instance.user,
                complaint=instance,
                message=f"Your complaint '{instance.title}' status changed to '{instance.status}'."
            )

