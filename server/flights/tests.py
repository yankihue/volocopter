from collections import OrderedDict
from rest_framework.test import APIRequestFactory


from django.test import TestCase

from flights.models import Flight

# Create your tests here.
# Using the standard RequestFactory API to create a form POST request
factory = APIRequestFactory()

request = factory.patch("/flights/1/", {"state": "Post-Flight"})


class DefaultTest(TestCase):
    def setUp(self):
        pass

    def test_X(self):
        self.assertEqual(3, 3)


class FlightsTest(TestCase):
    def setUp(self):
        Flight.objects.create(title="Flight 1", description="Flight 1 description.")

    def test_list(self):
        # List read endpoint test
        response = self.client.get("/flights/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.data,
            {
                "flights": [
                    {
                        "id": 1,
                        "title": "Flight 1",
                        "description": "Flight 1 description.",
                        "state": "Pre-Flight",
                    },
                ],
                "count": {"PRE_FLIGHT": 1, "IN_FLIGHT": 0, "POST_FLIGHT": 0},
            },
        )
        self.assertEqual(Flight.objects.count(), 1)

    def test_change_status(self):
        # Test patching status of a flight
        response = self.client.patch(
            "/flights/1/", {"state": "Post-Flight"}, content_type="application/json"
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.data,
            {
                "id": 1,
                "title": "Flight 1",
                "description": "Flight 1 description.",
                "state": "Post-Flight",
            },
        )
        self.assertEqual(Flight.objects.get(id=1).state, "Post-Flight")

    def test_delete_flight(self):
        # Test deleting a flight
        response = self.client.delete(
            "/flights/1/",
        )
        print(response.data)
        self.assertEqual(response.status_code, 204)
        with self.assertRaises(Flight.DoesNotExist):  # make sure it is deleted
            Flight.objects.get(id=1),
