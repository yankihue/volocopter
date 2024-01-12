import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MainPage from "./components/MainPage";
import axios from "axios";
import { FlightStatus } from "./types/flight";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockFlights = [
  {
    id: "1",
    title: "Test Flight 1",
    description: "Description 1",
    state: FlightStatus.IN_FLIGHT,
  },
  {
    id: "2",
    title: "Test Flight 2",
    description: "Description 2",
    state: FlightStatus.POST_FLIGHT,
  },
];
const mockCount = {
  "Pre-Flight": 0,
  "In-Flight": 1,
  "Post-Flight": 1,
};

describe("Main page tests", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    mockedAxios.get.mockResolvedValue({
      data: { flights: mockFlights, count: mockCount },
      status: 200,
    });
    mockedAxios.patch.mockResolvedValue({
      status: 200,
    });
    mockedAxios.delete.mockResolvedValue({
      status: 200,
    });
  });

  it("renders page", async () => {
    render(<MainPage />);
    await waitFor(() => {
      expect(screen.getByText("Flight Mission Control Tool")).toBeVisible();
    });
  });
  it("displays flight cards with relevant information", async () => {
    render(<MainPage />);
    await waitFor(() => {
      expect(screen.getByText("Test Flight 1")).toBeVisible();

      expect(screen.getByText("Description 1")).toBeVisible();
      const flightCard = screen.getByText("Test Flight 2");

      expect(flightCard.parentElement?.parentElement).toHaveStyle(
        "border-color:"
      );
    });
  });
  it("opens the add mission modal and closes it when clicking cancel", async () => {
    render(<MainPage />);
    const createModalCancelButton = screen.queryByTestId("CancelCreateButton");
    expect(createModalCancelButton).not.toBeInTheDocument();
    act(() => {
      userEvent.click(screen.getByTestId("AddMissionButton"));
    });
    const createMissionContainer = screen.getByTestId("CreateMissionContainer");

    await waitFor(() => {
      expect(createMissionContainer).toBeVisible();
    });
    act(() => {
      userEvent.click(screen.getByRole("button", { name: "Cancel" }));
    });
    await waitFor(() => {
      expect(screen.queryByText("Add - Mission")).not.toBeInTheDocument();
    });
  });
  it("moves flights between states", async () => {
    render(<MainPage />);
    await waitFor(() => {
      const moveRightButton = screen.getByTestId("MoveRightButton1");
      expect(moveRightButton).toBeVisible();
    });
    act(() => {
      userEvent.click(screen.getByTestId("MoveRightButton1"));
    });
    await waitFor(() => {
      expect(mockedAxios.patch).toHaveBeenCalledWith(
        "http://127.0.0.1:8000/flights/1/",
        { state: "Post-Flight" }
      );
    });
  });
  it("deletes flights", async () => {
    render(<MainPage />);
    await waitFor(() => {
      const deleteButton = screen.getByTestId("DeleteButton1");
      expect(deleteButton).toBeVisible();
    });
    act(() => {
      userEvent.click(screen.getByTestId("DeleteButton1"));
    });
    await waitFor(() => {
      const confirmDeleteButton = screen.getByTestId("ConfirmDeleteButton1");
      expect(confirmDeleteButton).toBeVisible();
    });
    act(() => {
      userEvent.click(screen.getByTestId("ConfirmDeleteButton1"));
    });
    await waitFor(() => {
      expect(mockedAxios.delete).toHaveBeenCalledWith(
        "http://127.0.0.1:8000/flights/1"
      );
    });
  });
});
