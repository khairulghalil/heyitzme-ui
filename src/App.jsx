import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./features/home";
import Profiles from "./features/profiles";
import ProfileBuilder from "./features/profile-builder";
import ProfileSettings from "./features/profile-settings";
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
        <Route path="/settings" element={<Navigate to="/" replace />} />
        <Route path="/settings/:username" element={<ProfileSettings />} />
        <Route
          path="/edit/:username"
          element={<ProfileBuilder type="edit" />}
        />
      </Routes>
    </>
  );
}

export default App;
