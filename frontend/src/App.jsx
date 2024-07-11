import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div>
      <ToastContainer />
      <Navigation />
      <main className="my-3">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
