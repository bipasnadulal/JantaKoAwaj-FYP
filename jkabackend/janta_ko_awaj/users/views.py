from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .serializers import UserRegisterSerializer

class RegisterUser(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            
            return Response({"message": "User registered successfully"}, status = status.HTTP_201_CREATED)
       
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
class LoginUser(APIView):
    def post(self, request):
        phone = request.data.get('phone')
        password = request.data.get('password')

        user = authenticate(username=phone, password=password)  # now works with phone
        if user:
            return Response({"message": "Login successful", "username": user.username})
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)