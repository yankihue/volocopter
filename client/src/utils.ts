import axios from "axios";
import toast from "react-hot-toast";
import { FlightStatus, Flight, MoveAction } from "./types/flight";

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
export function isFirstStatus(status: FlightStatus) {
  //Return true if current status is the first possible one
  if (Object.values(FlightStatus).indexOf(status) === 0) {
    return true;
  }
  return false;
}

export function flightsByStatus(flights: Flight[], query: string) {
  return flights.filter((flight) => flight.state === query);
}
export const ButtonColorMapping = {
  "Pre-Flight":
    "p-4 bg-white rounded-lg divide-y border border-l-8 border-orange-500",
  "In-Flight":
    "p-4 bg-white rounded-lg divide-y border border-l-8 border-blue-500",
  "Post-Flight":
    "p-4 bg-white rounded-lg divide-y border border-l-8 border-green-500",
};
export function statusMap(status: FlightStatus) {
  return Object.values(FlightStatus).indexOf(status);
}
export function handleMoveFlight(
  id: number,
  currentState: FlightStatus,
  direction: MoveAction,
  setIsUpdated: (valu: boolean) => void
) {
  const nextStateIndex =
    direction === "next"
      ? Object.values(FlightStatus).indexOf(currentState) + 1
      : Object.values(FlightStatus).indexOf(currentState) - 1;

  const nextState = Object.values(FlightStatus)[nextStateIndex];
  return axios
    .patch(`http://127.0.0.1:8000/flights/${id}/`, {
      state: nextState,
    })
    .then(() => {
      setIsUpdated(true);
      toast.success("Successfully moved mission to the next status");
    });
}
