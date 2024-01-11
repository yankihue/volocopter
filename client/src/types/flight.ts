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
