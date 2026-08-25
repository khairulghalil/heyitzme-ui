import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./features/home";
import Profiles from "./features/profiles";
import ProfileBuilder from "./features/profile-builder";
import { ScrollToTop } from "./components";
import "./App.css";

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:username" element={<Profiles />} />
        <Route path="/edit" element={<Navigate to="/" replace />} />
        <Route
          path="/edit/:username"
          element={<ProfileBuilder type="edit" />}
        />
      </Routes>
    </>
  );
}

export default App;
