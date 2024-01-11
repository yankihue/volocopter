import "./App.css";
import { useEffect, useState } from "react";
import { Count, Flight, FlightStatus } from "./types/flight";
import axios from "axios";
import AddMissionModal from "./components/AddMissionModal";
import DeleteMissionModal from "./components/DeleteMissionModal";

function App() {
  const [flights, setFlights] = useState<Flight[]>();
  const [count, setCount] = useState<Count>({} as Count);
  const [showAddMissionModal, setShowAddMissionModal] = useState(false);
  const [flightToBeDeleted, setFlightToBeDeleted] = useState<number>();
  type DeletionModalProps = {
    flightId: number;
  };
  function flightsByStatus(flights: Flight[], query: string) {
    return flights.filter((flight) => flight.state == query);
  }

  const ButtonColorMapping = {
    "Pre-Flight": "orange",
    "In-Flight": "blue",
    "Post-Flight": "green",
  };
  useEffect(() => {
    axios
      .get("http://localhost:8000/flights/")
      .then((response) => {
        setFlights(response.data.flights);
        setCount(response.data.count);
        console.log(count);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
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
                {status} ({count[status]})
              </h2>
              {flights &&
                flightsByStatus(flights, status).map((flight) => {
                  return (
                    <div
                      key={flight.id}
                      className={`p-4 bg-white rounded-lg border border-${
                        ButtonColorMapping[flight.state]
                      }-500 border-l-8 my-2`}
                    >
                      <div className="justify-between flex-row flex">
                        {" "}
                        <h3 className="font-semibold text-xl">
                          {flight.title}
                        </h3>
                        <button onClick={() => setFlightToBeDeleted(flight.id)}>
                          x
                        </button>
                      </div>
                      <div>-</div>
                      <p>{flight.description}</p>
                    </div>
                  );
                })}
            </div>
          );
        })}
        {showAddMissionModal && <AddMissionModal></AddMissionModal>}
        {flightToBeDeleted && (
          <DeleteMissionModal flightId={flightToBeDeleted} />
        )}
      </main>
    </>
  );
}

export default App;
