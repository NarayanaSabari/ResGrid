import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertTriangle, MapPin } from "lucide-react";

// Main Dashboard Component
const MainDashboard = ({ disasterData }) => {
  // Summary Stats
  const totalDisasters = disasterData.length;
  const activeDisasters = disasterData.filter((d) => d.status === "Ongoing");
  const activeCount = activeDisasters.length;
  const resolvedCount = disasterData.filter(
    (d) => d.status === "Resolved"
  ).length;
  const totalAffectedPeople = disasterData.reduce(
    (acc, disaster) => acc + disaster.affectedPeople,
    0
  );

  // Recent Updates (Mocked data for now)
  const recentUpdates = [
    {
      id: 1,
      message:
        "Flood in New Orleans escalated to high severity. Immediate evacuation required.",
    },
    {
      id: 2,
      message: "Earthquake in Tokyo resolved. Rescue operations complete.",
    },
    {
      id: 3,
      message:
        "Wildfire in California spreading towards residential areas. Emergency response teams deployed.",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Disaster Monitoring Dashboard</h1>
      </div>

      {/* Top Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Disasters</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{totalDisasters}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Disasters</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{activeCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resolved Disasters</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{resolvedCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Affected People</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">
              {totalAffectedPeople.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active and All Disasters Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Disasters */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Active Disasters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeDisasters.length > 0 ? (
                activeDisasters.map((disaster) => (
                  <Link
                    to={`/disaster/${disaster.id}`}
                    key={disaster.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
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
                        <h3 className="font-medium">{disaster.type}</h3>
                        <p className="text-sm text-gray-500">
                          {disaster.location}
                        </p>
                        <p className="font-medium text-blue-600">
                          {disaster.affectedPeople.toLocaleString()} People
                          Affected
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p>No active disasters at the moment.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* All Disasters */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>All Disasters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {disasterData.length > 0 ? (
                disasterData.map((disaster) => (
                  <Link
                    to={`/disaster/${disaster.id}`}
                    key={disaster.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
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
                        <h3 className="font-medium">{disaster.type}</h3>
                        <p className="text-sm text-gray-500">
                          {disaster.location}
                        </p>
                        <p className="font-medium text-blue-600">
                          {disaster.affectedPeople.toLocaleString()} People
                          Affected
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p>No disasters available.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Map Visualization Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Disaster Map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] bg-gray-200 rounded-lg flex items-center justify-center">
              {/* Placeholder for map */}
              <MapPin className="text-gray-400" />
              <span className="text-gray-500">
                Map Placeholder (with disaster locations)
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts & Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentUpdates.map((update) => (
                <li key={update.id} className="text-sm text-gray-700">
                  {update.message}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

MainDashboard.propTypes = {
  disasterData: PropTypes.array.isRequired,
};

export default MainDashboard;
