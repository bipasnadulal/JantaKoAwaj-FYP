# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    phone = models.CharField(max_length=10, unique=True)
    province = models.CharField(max_length=50)
    district = models.CharField(max_length=50)
    municipality = models.CharField(max_length=100)
    ward = models.CharField(max_length=5)

    def __str__(self):
        return self.username
