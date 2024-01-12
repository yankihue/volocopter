import axios from "axios";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Flight, Count, FlightStatus, MoveAction } from "../types/flight";
import {
  statusMap,
  flightsByStatus,
  ButtonColorMapping,
  isFinalStatus,
  isFirstStatus,
  handleMoveFlight,
} from "../utils";
import AddMissionModal from "./AddMissionModal";
import DeleteMissionModal from "./DeleteMissionModal";
import DeleteIcon from "../assets/DeleteIcon";
import MoveLeftIcon from "../assets/MoveLeftIcon";
import MoveRightIcon from "../assets/MoveRightIcon";

function App() {
  const [flights, setFlights] = useState<Flight[]>();
  const [count, setCount] = useState<Count>({} as Count);
  const [showAddMissionModal, setShowAddMissionModal] = useState(false);
  const [showDeleteMissionModal, setShowDeleteMissionModal] = useState(false);
  const [flightToBeDeleted, setFlightToBeDeleted] = useState<number>();
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (flights?.length && !isUpdated) {
      return;
    }
    axios
      .get("http://localhost:8000/flights/")
      .then((response) => {
        if (mounted) {
          setFlights(response.data.flights);
          setCount(response.data.count); // Get the count by flight state data from backend, no client side calculation needed
        }
      })
      .catch((error) => {
        toast.error(`There was a problem fetching the flights. ${error} `);
      });
    return () => {
      // Cleanup
      mounted = false;
      setIsUpdated(false);
    };
  }, [isUpdated, flights]);

  return (
    <>
      <Toaster position="bottom-center" />
      <header className=" p-8 justify-between flex">
        <h1 className="text-lg sm:text-2xl md:text-4xl">
          {" "}
          Flight Mission Control Tool
        </h1>
        <button
          data-testid="AddMissionButton"
          className="uppercase font-extrabold bg-gray-300 p-3 rounded-lg"
          onClick={() => setShowAddMissionModal(true)}
        >
          Add Mission
        </button>
      </header>
      <main className="flex-row flex space-x-4">
        {/* Create columns for each possible flight status (dynamically) */}
        {Object.values(FlightStatus).map((status) => {
          return (
            <div
              className="bg-gray-100 rounded-lg flex flex-col w-1/3 p-6"
              key={status}
            >
              <h2 className="p-4 font-bold" data-testid={`Header ${status}`}>
                {status} ({Object.values(count)[statusMap(status)]})
              </h2>
              <div className="space-y-6">
                {flights &&
                  flightsByStatus(flights, status).map((flight) => {
                    return (
                      <div
                        key={flight.id}
                        className={`p-4 bg-white rounded-lg divide-y border border-${
                          ButtonColorMapping[flight.state]
                        }-500 border-l-8`}
                      >
                        <div className="justify-between flex-row flex">
                          <h3 className="font-semibold text-xl">
                            {flight.title}
                          </h3>
                          <div className="space-x-6">
                            {/* Go to the previous status button. Render only if current status is not the first status */}

                            {!isFirstStatus(flight.state) ? (
                              <button
                                data-testid={`MoveLeftButton${flight.id}`}
                                onClick={() => {
                                  handleMoveFlight(
                                    flight.id,
                                    flight.state,
                                    MoveAction.PREVIOUS,
                                    setIsUpdated
                                  );
                                }}
                              >
                                <MoveLeftIcon />
                              </button>
                            ) : null}
                            {/* Delete button */}
                            <button
                              data-testid={`DeleteButton${flight.id}`}
                              onClick={() => {
                                setShowDeleteMissionModal(true);
                                setFlightToBeDeleted(flight.id);
                              }}
                            >
                              <DeleteIcon />
                            </button>
                            {/* Progress status button. Render only if current status is not the final status */}
                            {!isFinalStatus(flight.state) ? (
                              <button
                                data-testid={`MoveRightButton${flight.id}`}
                                onClick={() => {
                                  handleMoveFlight(
                                    flight.id,
                                    flight.state,
                                    MoveAction.NEXT,
                                    setIsUpdated
                                  );
                                }}
                              >
                                <MoveRightIcon />
                              </button>
                            ) : null}
                          </div>
                        </div>
                        <p>{flight.description}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
        {
          <AddMissionModal
            showAddMissionModal={showAddMissionModal}
            setShowAddMissionModal={setShowAddMissionModal}
            setUpdated={setIsUpdated}
          />
        }
        {flightToBeDeleted && (
          <DeleteMissionModal
            showDeleteMissionModal={showDeleteMissionModal}
            setShowDeleteMissionModal={setShowDeleteMissionModal}
            setUpdated={setIsUpdated}
            flightId={flightToBeDeleted}
          />
        )}
      </main>
    </>
  );
}

export default App;
