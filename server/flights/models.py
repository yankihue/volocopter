from django.db import models


# Create your models here.
class Flight(models.Model):
    class FlightStatus(models.TextChoices):
        PRE_FLIGHT = "Pre-Flight"
        IN_FLIGHT = "In-Flight"
        POST_FLIGHT = "Post-Flight"

    title = models.CharField(max_length=50)
    description = models.TextField()
    state = models.CharField(
        max_length=20, choices=FlightStatus.choices, default=FlightStatus.PRE_FLIGHT
    )

    def __str__(self):
        return self.title
