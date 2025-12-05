import "./App.css";
import Navbar from "./components/Navbar";
import { Button } from "./components/ui/button";
import { DotPattern } from "./components/ui/dot-pattern";
import { cn } from "./lib/utils";

function App() {
  return (
    <div>
      <DotPattern glow={true} cr={1.3} className="z-0" />
      <div className="z-10 max-w-7xl mx-auto">
        <Navbar />
      </div>
    </div>
  );
}

export default App;
