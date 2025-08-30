from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.permissions import IsAuthenticated
from .models import Authority
from complaints.models import Complaint
from complaints.serializers import ComplaintSerializer
from .serializers import AuthorityLoginSerializer, AuthoritySerializer
from .auth_backend import AuthorityJWTAuthentication
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken


# Login View
class AuthorityLoginView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        serializer = AuthorityLoginSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

        authority = serializer.validated_data['authority']
        refresh = RefreshToken.for_user(authority)
        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "authority": {
                "id": authority.id,
                "email": authority.email,
                "name": authority.name,
                "role": authority.role
            }
        }, status=status.HTTP_200_OK)


# Get Authority Details (for logged-in authority)

class AuthorityDetailView(APIView):
    authentication_classes = [AuthorityJWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            authority = Authority.objects.get(email=request.user.email)
        except Authority.DoesNotExist:
            return Response({"error": "Authority not found"}, status=404)

        serializer = AuthoritySerializer(authority)
        return Response(serializer.data, status=status.HTTP_200_OK)
    




