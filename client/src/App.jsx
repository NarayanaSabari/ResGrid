import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainDashboard from "./components/MainDashboard";
import DisasterDetail from "./components/DisasterDetail";
import disasterData from "./data/disasterData"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<MainDashboard disasterData={disasterData} />}
        />
        <Route path="/disaster/:id" element={<DisasterDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
