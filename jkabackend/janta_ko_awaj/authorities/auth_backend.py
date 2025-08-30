from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Authority

class AuthorityJWTAuthentication(JWTAuthentication):
    def get_user(self, validated_token):
        try:
            user_id = validated_token['user_id']
            return Authority.objects.get(id=user_id)
        except Authority.DoesNotExist:
            return None
