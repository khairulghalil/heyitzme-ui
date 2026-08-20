import { Routes, Route } from "react-router-dom";
import Profiles from "./features/profiles";
import Home from "./features/home";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/:username" element={<Profiles />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
