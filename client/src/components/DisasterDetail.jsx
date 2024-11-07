import { useParams } from "react-router-dom"; // To access dynamic params in the URL
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

import { AlertTriangle, MapPin } from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"; // Recharts for the graph

import disasterData from "../data/disasterData"; // Import the disaster data

// Disaster Detail Component
const DisasterDetail = () => {
  const { id } = useParams(); // Get the ID from the URL params
  const disaster = disasterData.find((d) => d.id === parseInt(id)); // Find disaster by ID

  if (!disaster) {
    return <div>Disaster not found!</div>; // Handle if no disaster is found
  }

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
                    <p className="font-medium">
                      {disaster.affectedPeople.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Severity Trend Graph */}
          <Card>
            <CardHeader>
              <CardTitle>Severity Trend</CardTitle>
              <CardDescription>24-hour monitoring data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={disaster.timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
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
                Map Placeholder
              </div>
            </CardContent>
          </Card>

          {/* Disaster Image */}
          {disaster.image && (
            <Card>
              <CardHeader>
                <CardTitle>Disaster Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <img
                    src={disaster.image}
                    alt={`${disaster.type} - ${disaster.location}`}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DisasterDetail;
