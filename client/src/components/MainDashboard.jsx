import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  AlertTriangle,
  Users,
  Calendar,
  Activity,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const MainDashboard = () => {
  const [disasters, setDisasters] = useState([]);
  const [totalDisasters, setTotalDisasters] = useState(0);
  const [peopleAffected, setPeopleAffected] = useState(0);
  const [resourcesDeployed, setResourcesDeployed] = useState(85); // Example static value

  useEffect(() => {
    fetch("http://34.67.51.187/situation_monitoring/get_disasters")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setDisasters(data);
        setTotalDisasters(data.length);
        setPeopleAffected(
          data.reduce((total, d) => total + (d.affectedPeople || 0), 0)
        );
      })
      .catch((error) => console.error("Error fetching disasters:", error));
  }, []);

  const ongoingDisasters = disasters.filter(
    (d) => d.status === "Ongoing"
  ).length;
  const closedDisasters = disasters.filter((d) => d.status === "Closed").length;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Disaster Monitoring Dashboard</h1>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Disasters</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <AlertTriangle className="text-red-500 w-10 h-10" />
            <div>
              <h2 className="text-2xl font-bold">{totalDisasters}</h2>
              <p className="text-sm text-gray-500">+2 from last week</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>People Affected</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <Users className="text-blue-500 w-10 h-10" />
            <div>
              <h2 className="text-2xl font-bold">
                {peopleAffected.toLocaleString()}
              </h2>
              <p className="text-sm text-gray-500">Across all regions</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ongoing Disasters</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <Activity className="text-orange-500 w-10 h-10" />
            <div>
              <h2 className="text-2xl font-bold">{ongoingDisasters}</h2>
              <p className="text-sm text-gray-500">Currently active</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Closed Disasters</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <CheckCircle className="text-green-500 w-10 h-10" />
            <div>
              <h2 className="text-2xl font-bold">{closedDisasters}</h2>
              <p className="text-sm text-gray-500">Completed events</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Disaster Lists Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Ongoing Disasters List */}
        <div>
          <h2 className="text-xl font-bold">Ongoing Disasters</h2>
          <p className="text-sm text-gray-500">Current ongoing situations</p>

          <div className="grid grid-cols-1 gap-4 mt-4">
            {ongoingDisasters === 0 ? (
              <p className="text-gray-500">No ongoing disasters available.</p>
            ) : (
              disasters
                .filter((disaster) => disaster.status === "Ongoing")
                .map((disaster) => (
                  <Link to={`/disaster/${disaster.id}`} key={disaster.id}>
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center space-x-4">
                        <AlertTriangle
                          className={
                            disaster.severity === "High"
                              ? "text-red-500"
                              : disaster.severity === "Medium"
                              ? "text-yellow-500"
                              : "text-green-500"
                          }
                        />
                        <div>
                          <h3 className="font-medium">
                            {disaster.type || "Unknown Disaster"}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {disaster.location || "Unknown Location"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span
                          className={
                            disaster.trend === "increasing"
                              ? "text-red-500"
                              : "text-green-500"
                          }
                        >
                          {disaster.trend === "increasing"
                            ? "↗ increasing"
                            : "↘ decreasing"}
                        </span>
                        <span className="text-sm text-gray-500">
                          {disaster.lastUpdate || "N/A"} ago
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
            )}
          </div>
        </div>

        {/* Closed Disasters List */}
        <div>
          <h2 className="text-xl font-bold">Closed Disasters</h2>
          <p className="text-sm text-gray-500">Past disaster events</p>

          <div className="grid grid-cols-1 gap-4 mt-4">
            {closedDisasters === 0 ? (
              <p className="text-gray-500">No closed disasters available.</p>
            ) : (
              disasters
                .filter((disaster) => disaster.status === "Closed")
                .map((disaster) => (
                  <Link to={`/disaster/${disaster.id}`} key={disaster.id}>
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center space-x-4">
                        <AlertTriangle
                          className={
                            disaster.severity === "High"
                              ? "text-red-500"
                              : disaster.severity === "Medium"
                              ? "text-yellow-500"
                              : "text-green-500"
                          }
                        />
                        <div>
                          <h3 className="font-medium">
                            {disaster.type || "Unknown Disaster"}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {disaster.location || "Unknown Location"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-gray-500">Closed</span>
                        <span className="text-sm text-gray-500">
                          {disaster.lastUpdate || "N/A"} ago
                        </span>
                      </div>
                    </div>
                  </Link>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
