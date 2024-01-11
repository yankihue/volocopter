import "./App.css";
import { useEffect, useState } from "react";
import { Flight } from "./types/flight";
import axios from "axios";
function App() {
  const [flights, setFlights] = useState<Flight[]>();

  useEffect(() => {
    axios
      .get("http://localhost:8000/flights/")
      .then((response) => {
        setFlights(response.data);
        console.log(flights);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <h1 className="text-4xl ">Flight Mission Control Tool</h1>
    </>
  );
}

export default App;
