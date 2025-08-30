from django.urls import path
from .views import RegisterUser, LoginUser, UserDetail

urlpatterns = [
    path('register/', RegisterUser.as_view(), name='register'),
    path('login/', LoginUser.as_view(), name='login'),
    path('user/', UserDetail.as_view(), name='user-detail'),
]