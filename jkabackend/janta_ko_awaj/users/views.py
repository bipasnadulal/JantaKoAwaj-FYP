from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .serializers import UserRegisterSerializer
from rest_framework.permissions import AllowAny

class RegisterUser(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = UserRegisterSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            
            return Response({"message": "User registered successfully"}, status = status.HTTP_201_CREATED)
       
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
class LoginUser(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        phone = request.data.get('phone')
        password = request.data.get('password')

        user = authenticate(username=phone, password=password) 
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                "message": "Login successful", 
                "username": user.username,
                "token": token.key
                })
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)