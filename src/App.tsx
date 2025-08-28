import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RequestAccess from "./pages/RequestAccess";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/request-access" element={<RequestAccess />} />
    </Routes>
  );
}

export default App;
