from rest_framework import serializers
from complaints.models import Complaint

class VotedComplaintSerializer(serializers.ModelSerializer):
    location = serializers.SerializerMethodField()

    class Meta:
        model = Complaint
        fields = [
            "id",
            "title",
            "description",
            "status",
            "category",
            "created_at",
            "province",
            "district",
            "municipality",
            "ward",
            "location",  
        ]

    def get_location(self, obj):
        parts = [obj.province, obj.district, obj.municipality, obj.ward]
        return ", ".join(filter(None, parts))
