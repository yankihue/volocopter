import { Flight } from "../types/flight";

export default function flightsByStatus(flights: Flight[], query: string) {
  return flights.filter((flight) => flight.state == query);
}
