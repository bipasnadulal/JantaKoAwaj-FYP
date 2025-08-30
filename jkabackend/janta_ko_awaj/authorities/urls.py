from django.urls import path
from .views import AuthorityLoginView, AuthorityDetailView

urlpatterns = [
    path('login/', AuthorityLoginView.as_view(), name='authority-login'),
    path('detail/', AuthorityDetailView.as_view(), name='authority-detail'),
]
