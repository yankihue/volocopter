import { Toaster } from "react-hot-toast";
import MainPage from "./components/MainPage";

function App() {
  return (
    <>
      <Toaster position="bottom-center" />
      <MainPage />
    </>
  );
}

export default App;
