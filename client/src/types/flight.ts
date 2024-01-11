export type Flight = {
  title: string;
  description: string;
  state: FlightStatus;
};
export enum FlightStatus {
  PRE_FLIGHT = "Pre-flight",
  IN_FLIGHT = "In-flight",
  POST_FLIGHT = "Post-flight",
}
export type Count = {
  PRE_FLIGHT: number;
  IN_FLIGHT: number;
  POST_FLIGHT: number;
};
