import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MainPage from "./components/MainPage";

describe("Main page tests", () => {
  beforeAll(() => {
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
  });

  it("renders page", async () => {
    render(<MainPage />);
    await waitFor(() => {
      expect(screen.getByText("Flight Mission Control Tool")).toBeVisible();
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
});
