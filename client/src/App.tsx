import "./App.css";
import { useEffect, useState } from "react";
import { Count, Flight, FlightStatus } from "./types/flight";
import axios from "axios";
import AddMissionModal from "./components/AddMissionModal";
import DeleteMissionModal from "./components/DeleteMissionModal";

import toast, { Toaster } from "react-hot-toast";
import { ButtonColorMapping, flightsByStatus, isFinalStatus } from "./utils";

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
  function statusMap(status: FlightStatus) {
    return Object.values(FlightStatus).indexOf(status);
  }
  function handleMoveFlight(id: number, currentState: FlightStatus) {
    const nextStateIndex =
      Object.values(FlightStatus).indexOf(currentState) + 1;

    const nextState = Object.values(FlightStatus)[nextStateIndex];
    return axios
      .patch(`http://127.0.0.1:8000/flights/${id}/`, {
        state: nextState,
      })
      .then(() => {
        setIsUpdated(true);
        toast.success(
          <div className="flex flex-col text-center">
            <h3 className="font-bold text-lg">
              Successfully moved mission to the next status
            </h3>
          </div>
        );
      });
  }

  return (
    <>
      <Toaster position="bottom-center" />
      <header className=" p-8 justify-between flex">
        <h1 className="text-4xl"> Flight Mission Control Tool</h1>
        <button
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
            <div className="bg-gray-100 rounded-lg flex flex-col w-1/3 p-6 m-6">
              <h2 className="p-4 font-bold">
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
                            {/* Delete button */}
                            <button
                              onClick={() => {
                                setShowDeleteMissionModal(true);
                                setFlightToBeDeleted(flight.id);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                              </svg>
                            </button>
                            {/* Move status button. Render only if current status is not the final status */}
                            {!isFinalStatus(flight.state) ? (
                              <button
                                onClick={() => {
                                  handleMoveFlight(flight.id, flight.state);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                                  />
                                </svg>
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
