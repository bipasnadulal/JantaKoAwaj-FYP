from django.db import models
from django.utils import timezone
from django.contrib.auth.hashers import make_password

class Authority(models.Model):
    ROLE_CHOICES = [
        ("education", "Education"),
        ("environment", "Environment"),
        ("police", "Municipal Guard"),
        ("agriculture", "Agriculture and Livestock"),
        ("infrastructure", "Public Infrastructure"),
    ]

    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128, null=True, blank=True)
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default="infrastructure")
    created_at = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        if self.password and not self.password.startswith("pbkdf2_"):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.role})"

    @property
    def is_authenticated(self):
        return True
