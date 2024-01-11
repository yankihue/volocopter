from flights.models import Flight
from rest_framework import serializers


class FlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flight
        fields = ["title", "description", "state"]
