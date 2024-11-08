import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertTriangle, MapPin } from "lucide-react";

// Disaster Detail Component
const DisasterDetail = () => {
  const { id } = useParams(); // Get the ID from the URL params
  const [disaster, setDisaster] = useState(null);

  useEffect(() => {
    fetch(`http://34.67.51.187/situation_monitoring/get_disasters`)
      .then((response) => response.json())
      .then((data) => {
        const foundDisaster = data.find((d) => d.id === id);
        setDisaster(foundDisaster);
      })
      .catch((error) =>
        console.error("Error fetching disaster details:", error)
      );
  }, [id]);

  if (!disaster) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => window.history.back()} // Go back to the dashboard
          className="text-blue-500 hover:text-blue-600"
        >
          ← Back to Dashboard
        </button>
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            disaster.severity === "High"
              ? "bg-red-100 text-red-800"
              : disaster.severity === "Medium"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-green-100 text-green-600"
          }`}
        >
          {disaster.severity} Severity
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                <span>
                  {disaster.type} - {disaster.location}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-medium">{disaster.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Affected People</p>
                    <p className="font-medium">{disaster.affectedPeople}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {disaster.image && (
            <Card>
              <CardHeader>
                <CardTitle>Disaster Image</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={disaster.image}
                  alt="Disaster"
                  className="w-full rounded"
                />
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span>{disaster.location}</span>
              </div>
              <div className="mt-4 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                {/* Placeholder for a map */}
                Map Placeholder
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DisasterDetail;
