from django.db import models
from django.conf import settings
# Create your models here.

class Notification(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, 
                         on_delete=models.CASCADE,
                         related_name='notifications')
    
    complaint = models.ForeignKey("complaints.Complaint", on_delete=models.CASCADE)
    message = models.TextField()
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']


    def __str__(self):
        return f"Notification for {self.user.username}: {self.message[:30]}"