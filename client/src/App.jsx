import "./App.css";
import Navbar from "./components/Navbar";
import { Button } from "./components/ui/button";
import { DotPattern } from "./components/ui/dot-pattern";
import Homepage from "./pages/Homepage";
import {Routes,Route, useParams, useLoaderData, useLocation} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const location = useLocation();
  console.log(location);
  

  return (
    <div className="min-h-screen">
      {location.pathname == "/sign-in" || location.pathname == "/sign-up" ? <></> : <Navbar /> }
      {/* <Navbar /> */}
      <Routes>
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
    
  );
}

export default App;
