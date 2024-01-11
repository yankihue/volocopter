import "./App.css";
import { useEffect, useState } from "react";
import { Count, Flight, FlightStatus } from "./types/flight";
import axios from "axios";
function App() {
  const [flights, setFlights] = useState<Flight[]>();
  const [count, setCount] = useState<Count>({} as Count);

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
      <header className="text-4xl p-8">Flight Mission Control Tool</header>
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
                      key={flight.title}
                      className={`p-4 bg-white rounded-lg border border-${
                        ButtonColorMapping[flight.state]
                      }-500 border-l-8 my-2`}
                    >
                      <h3 className="font-semibold text-xl">{flight.title}</h3>
                      <div>-</div>
                      <p>{flight.description}</p>
                    </div>
                  );
                })}
            </div>
          );
        })}
      </main>
    </>
  );
}

export default App;
