from django.contrib import admin
from .models import Authority
# Register your models here.

@admin.register(Authority)
class AuthorityAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'role', 'created_at')