from django.db import models
from django.contrib.auth.hashers import make_password
from django.utils import timezone


class Authority(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128, null=True, blank=True)   # store hashed password
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=50, default="authority")
    created_at = models.DateTimeField(default=timezone.now)

    def save(self, *args, **kwargs):
        # Ensure password is always hashed before saving
        if not self.password.startswith("pbkdf2_"):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.role})"
