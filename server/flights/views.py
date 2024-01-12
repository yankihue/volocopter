from flights.models import Flight
from flights.serializers import FlightSerializer
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.mixins import CreateModelMixin, ListModelMixin
from rest_framework import generics
from rest_framework.decorators import action
from django.db.models import Q, Count


class APIRoot(generics.GenericAPIView):
    """API entry point."""

    def get(self, request, format=None):
        return Response(
            {
                "flights": reverse("flights", request=request, format=format),
            }
        )


# Create your views here.
class FlightsList(CreateModelMixin, generics.GenericAPIView):
    """
    List all flights or create a new one.
    """

    queryset = Flight.objects.all()
    serializer_class = FlightSerializer

    # Return to the number of flights grouped by state
    def get_flights_count(self):
        flights_count = {}
        for state in Flight.FlightStatus:
            flights_count[state.name] = Flight.objects.filter(state=state).count()
        return flights_count

    def get(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = FlightSerializer(queryset, many=True)
        return Response(
            {"flights": serializer.data} | {"count": self.get_flights_count()}
        )

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


# Create your views here.
class FlightDetails(generics.RetrieveUpdateDestroyAPIView):
    """
    Create, read, update or delete a flight.
    """

    queryset = Flight.objects.all()
    serializer_class = FlightSerializer
