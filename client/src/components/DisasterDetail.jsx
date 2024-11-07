import React from "react";

// Import ShadCN UI components
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { MapPin, AlertTriangle } from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Disaster Detail Component
export const DisasterDetail = ({ disaster, onBack }) => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="text-blue-500 hover:text-blue-600">
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
              <CardDescription>
                Last updated: {disaster.lastUpdate}
              </CardDescription>
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
                  <div>
                    <p className="text-sm text-gray-500">Evacuation Status</p>
                    <p className="font-medium">{disaster.evacuationStatus}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Trend</p>
                    <p className="font-medium capitalize">{disaster.trend}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

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

          <Card>
            <CardHeader>
              <CardTitle>Disaster Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <img
                  src={disaster.imageUrl}
                  alt={`${disaster.type} in ${disaster.location}`}
                  className="max-w-full h-auto rounded-lg"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <button className="w-full p-2 text-white bg-red-500 rounded-lg hover:bg-red-600">
                  Trigger Emergency Alert
                </button>
                <button className="w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                  Deploy Resources
                </button>
                <button className="w-full p-2 text-white bg-green-500 rounded-lg hover:bg-green-600">
                  Update Status
                </button>
              </div>
            </CardContent>
          </Card>

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
        </div>
      </div>
    </div>
  );
};
