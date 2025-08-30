from rest_framework import serializers
from .models import CustomUser

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    confirmPassword = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model = CustomUser
        fields = ['username', 'phone', 'password', 'confirmPassword', 'province', 'district', 
                  'municipality', 'ward']
    
    def validate(self, data):
        if data['password'] != data['confirmPassword']:
            raise serializers.ValidationError({"confirmPassword": "Passwords must match."})
        return data

    def create(self, validated_data):
        validated_data.pop('confirmPassword')
        user = CustomUser.objects.create_user(**validated_data)
        return user
    

class UserDetailSerializer(serializers.ModelSerializer):
    complaints_posted = serializers.SerializerMethodField()
    total_votes_cast = serializers.SerializerMethodField()
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'phone', 'province', 'district', 'municipality', 'ward', 'complaints_posted', 'total_votes_cast']
        read_only_fields = ['id', 'phone']

    def get_complaints_posted(self, obj):
        return obj.complaint_set.count()

    
    def get_total_votes_cast(self, obj):
        return obj.votes.count()