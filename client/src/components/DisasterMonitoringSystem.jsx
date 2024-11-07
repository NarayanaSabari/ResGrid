import { useState } from "react";

//

// Import the child components
import { MainDashboard } from "./MainDashboard"; // Assuming MainDashboard is in a separate file
import { DisasterDetail } from "./DisasterDetail"; // Assuming DisasterDetail is in a separate file

// Main App Component that uses both MainDashboard and DisasterDetail components
const DisasterMonitoringSystem = () => {
  const [selectedDisaster, setSelectedDisaster] = useState(null);

  // Sample data
  const disasterData = [
    {
      id: 1,
      type: "Flood",
      location: "Central Valley",
      severity: "High",
      affectedPeople: 15000,
      status: "Active",
      lastUpdate: "2 hours ago",
      trend: "increasing",
      evacuationStatus: "In Progress",
      timeSeriesData: [
        { time: "00:00", value: 30 },
        { time: "04:00", value: 45 },
        { time: "08:00", value: 75 },
        { time: "12:00", value: 85 },
        { time: "16:00", value: 65 },
        { time: "20:00", value: 55 },
      ],
      imageUrl: "/api/placeholder/800/400",
    },
    {
      id: 2,
      type: "Wildfire",
      location: "Northern Forest",
      severity: "Medium",
      affectedPeople: 5000,
      status: "Contained",
      lastUpdate: "30 mins ago",
      trend: "decreasing",
      evacuationStatus: "Complete",
      timeSeriesData: [
        { time: "00:00", value: 80 },
        { time: "04:00", value: 65 },
        { time: "08:00", value: 45 },
        { time: "12:00", value: 30 },
        { time: "16:00", value: 25 },
        { time: "20:00", value: 20 },
      ],
      imageUrl: "/api/placeholder/800/400",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {selectedDisaster ? (
        <DisasterDetail
          disaster={selectedDisaster}
          onBack={() => setSelectedDisaster(null)}
        />
      ) : (
        <MainDashboard
          disasterData={disasterData}
          onSelectDisaster={setSelectedDisaster}
        />
      )}
    </div>
  );
};

export default DisasterMonitoringSystem;
