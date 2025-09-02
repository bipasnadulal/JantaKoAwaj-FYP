from rest_framework import serializers
from .models import Complaint, ComplaintUpdate
from users.models import CustomUser 

class ComplaintSerializer(serializers.ModelSerializer):
    agreeVotes = serializers.SerializerMethodField()
    disagreeVotes = serializers.SerializerMethodField()
    userVote = serializers.SerializerMethodField()
    location = serializers.SerializerMethodField()

    class Meta:
        model = Complaint
        fields = "__all__"
        read_only_fields = ["user", "authority", "created_at", "updated_at"]

    def get_agreeVotes(self, obj):
        return obj.votes.filter(vote_type="agree").count() or 0

    def get_disagreeVotes(self, obj):
        return obj.votes.filter(vote_type="disagree").count() or 0

    def get_userVote(self, obj):
        request = self.context.get("request")
        
        if request and request.user.is_authenticated and isinstance(request.user, CustomUser):
            vote = obj.votes.filter(user=request.user).first()
            return vote.vote_type if vote else None
        return None
    
    def get_location(self, obj):
        parts = [obj.province, obj.district, obj.municipality, obj.ward]
        return ", ".join(filter(None, parts))


class ComplaintUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComplaintUpdate
        fields = ["id", "status", "progress", "response_text", "response_file", "created_at"]



class TopComplaintSerializer(serializers.ModelSerializer):
    agreeVotes = serializers.SerializerMethodField()
    disagreeVotes = serializers.SerializerMethodField()
    userVote = serializers.SerializerMethodField()

    class Meta:
        model = Complaint
        fields = ["id", "title", "description", "category", "status", "province", "district", "municipality", "ward",
                  "created_at", "agreeVotes", "disagreeVotes", "userVote"]

    def get_agreeVotes(self, obj):
        return obj.votes.filter(vote_type="agree").count()

    def get_disagreeVotes(self, obj):
        return obj.votes.filter(vote_type="disagree").count()

    def get_userVote(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            vote = obj.votes.filter(user=request.user).first()
            return vote.vote_type if vote else None
        return None