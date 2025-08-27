from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import AuthorityLoginSerializer

class AuthorityLoginView(APIView):
    """
    POST request with email and password to login authority.
    """
    def post(self, request):
        serializer = AuthorityLoginSerializer(data=request.data)
        if serializer.is_valid():
            authority = serializer.validated_data['user']
            return Response({
                'email': authority.email,
                'name': authority.name,
                'role': authority.role,
                'message': 'Authority login successful'
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
