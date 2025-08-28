import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RequestAccess from "./pages/RequestAccess";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/request-access" element={<RequestAccess />} />
      </Routes>
    </Router>
  );
}

export default App;
