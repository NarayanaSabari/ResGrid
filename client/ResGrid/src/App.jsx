import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DisasterReportForm from "./components/DisasterReportForm";
import DisasterInfoPage from "./components/DisasterInfoPage";
import Home from "./components/HomePage";// Import your Disaster Info Page
import "./App.css";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<DisasterReportForm />} />
        <Route path="/disaster-info" element={<DisasterInfoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
