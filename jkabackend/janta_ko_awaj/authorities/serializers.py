from rest_framework import serializers
from .models import Authority
from django.contrib.auth.hashers import check_password

class AuthorityLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        try:
            authority = Authority.objects.get(email=email)
        except Authority.DoesNotExist:
            raise serializers.ValidationError("Invalid email or password")

        if not check_password(password, authority.password):
            raise serializers.ValidationError("Invalid email or password")

        data['authority'] = authority
        return data

class AuthoritySerializer(serializers.ModelSerializer):
    class Meta:
        model = Authority
        fields = ['id', 'name', 'email', 'role']


