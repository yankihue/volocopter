import { FlightStatus, Flight } from "./types/flight";

export function isFinalStatus(status: FlightStatus) {
  //Return true if current status is the last possible one
  if (
    Object.values(FlightStatus).indexOf(status) + 1 >=
    Object.values(FlightStatus).length
  ) {
    return true;
  }
  return false;
}

export function flightsByStatus(flights: Flight[], query: string) {
  return flights.filter((flight) => flight.state === query);
}
export const ButtonColorMapping = {
  "Pre-Flight": "orange",
  "In-Flight": "blue",
  "Post-Flight": "green",
};
