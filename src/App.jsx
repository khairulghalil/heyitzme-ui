import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./features/home";
import Profiles from "./features/profiles";
import GenerateCard from "./features/generate";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/:username" element={<Profiles />} />
      <Route path="/" element={<Home />} />
      <Route path="/edit" element={<Navigate to="/" replace />} />
      <Route path="/edit/:username" element={<GenerateCard type="edit" />} />
    </Routes>
  );
}

export default App;
