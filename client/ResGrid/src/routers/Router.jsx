import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DisasterReportForm from "../components/DisasterReportForm"; 
import DisasterInfoPage from "../components/DisasterInfoPage";
import Home from "../components/HomePage"; 
import "../App.css"


function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route
          path="/allocate-resources/:incidentId"
          element={<ResourceAllocationPage />}
        /> */}
        <Route path="/report" element={<DisasterReportForm />} />
        <Route path="/disaster-info" element={<DisasterInfoPage />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default AppRouter;
