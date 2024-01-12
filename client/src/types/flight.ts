export type Flight = {
  id: number;
  title: string;
  description: string;
  state: FlightStatus;
};
export enum FlightStatus {
  PRE_FLIGHT = "Pre-Flight",
  IN_FLIGHT = "In-Flight",
  POST_FLIGHT = "Post-Flight",
}
export type Count = {
  [FlightStatus.PRE_FLIGHT]: number;
  [FlightStatus.IN_FLIGHT]: number;
  [FlightStatus.POST_FLIGHT]: number;
};
export enum MoveAction {
  NEXT = "next",
  PREVIOUS = "previous",
}
