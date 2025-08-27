from django.urls import path
from .views import AuthorityLoginView

urlpatterns = [
    path('login/', AuthorityLoginView.as_view(), name='authority-login'),
]
