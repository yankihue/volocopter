import "./App.css";
import { useEffect, useState } from "react";
import { Count, Flight, FlightStatus } from "./types/flight";
import axios from "axios";
import AddMissionModal from "./components/AddMissionModal";
import DeleteMissionModal from "./components/DeleteMissionModal";
import { ButtonColorMapping } from "./utils/color";
import flightsByStatus from "./utils/filter";
import toast, { Toaster } from "react-hot-toast";

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
        toast.error(
          "There was a problem fetching the flights. Did you start the server?"
        );
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
  return (
    <>
      {" "}
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
                          <button
                            onClick={() => {
                              setShowDeleteMissionModal(true);
                              setFlightToBeDeleted(flight.id);
                            }}
                          >
                            x
                          </button>
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
