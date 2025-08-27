from rest_framework import serializers
from django.contrib.auth.hashers import check_password
from .models import Authority

class AuthorityLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        # Check if authority exists
        try:
            authority = Authority.objects.get(email=email)
        except Authority.DoesNotExist:
            raise serializers.ValidationError("Invalid email or password")

        # Check password
        if not check_password(password, authority.password):
            raise serializers.ValidationError("Invalid email or password")

        # Attach authority instance to validated data
        data['user'] = authority
        return data
