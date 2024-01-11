import "./App.css";
import { useEffect, useState } from "react";
import { Count, Flight, FlightStatus } from "./types/flight";
import axios from "axios";
function App() {
  const [flights, setFlights] = useState<Flight[]>();
  const [count, setCount] = useState<Count>({
    PRE_FLIGHT: 0,
    IN_FLIGHT: 0,
    POST_FLIGHT: 0,
  });
  useEffect(() => {
    axios
      .get("http://localhost:8000/flights/")
      .then((response) => {
        setFlights(response.data.flights);
        setCount(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <header className="text-4xl p-8">Flight Mission Control Tool</header>
      <main className="flex-row flex space-x-4">
        {Object.keys(FlightStatus).map((status) => {
          return (
            <div className="bg-gray-200 rounded-lg flex flex-col w-1/3">
              <h3 className="p-4 font-bold">Flight ({count["PRE_FLIGHT"]})</h3>
            </div>
          );
        })}
      </main>
    </>
  );
}

export default App;
