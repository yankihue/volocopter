from flights.models import Flight
from flights.serializers import FlightSerializer
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.mixins import CreateModelMixin, ListModelMixin
from rest_framework import generics


class APIRoot(generics.GenericAPIView):
    """API entry point."""

    def get(self, request, format=None):
        return Response(
            {
                "flights": reverse("flights", request=request, format=format),
            }
        )


# Create your views here.
class FlightsList(ListModelMixin, CreateModelMixin, generics.GenericAPIView):
    """
    List all flights or create a new one.
    """

    queryset = Flight.objects.all()
    serializer_class = FlightSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


# Create your views here.
class FlightDetails(generics.RetrieveUpdateDestroyAPIView):
    """
    List all flights or create a new one.
    """

    queryset = Flight.objects.all()
    serializer_class = FlightSerializer
