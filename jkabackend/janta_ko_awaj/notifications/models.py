from django.db import models
from django.conf import settings
# Create your models here.

# class Notification(models.Model):
#     user = models.ForeignKey(settings.AUTH_USER_MODEL, 
#                          on_delete=models.CASCADE,
#                          related_name='notifications')
    
#     complaint = models.ForeignKey("complaints.Complaint", on_delete=models.CASCADE)
#     message = models.TextField()
#     read = models.BooleanField(default=False)
#     created_at = models.DateTimeField(auto_now_add=True)

#     class Meta:
#         ordering = ['-created_at']


#     def __str__(self):
#         return f"Notification for {self.user.username}: {self.message[:30]}"

from django.db import models
from django.conf import settings

class Notification(models.Model):
    
    recipient_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='notifications',
        null=True, blank=True
    )
    recipient_authority = models.ForeignKey(
        'authorities.Authority',
        on_delete=models.CASCADE,
        related_name='notifications',
        null=True, blank=True
    )

    complaint = models.ForeignKey("complaints.Complaint", on_delete=models.CASCADE)
    message = models.TextField()
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        who = self.recipient_user.username if self.recipient_user else (self.recipient_authority.name if self.recipient_authority else "unknown")
        return f"Notification for {who}: {self.message[:30]}"
