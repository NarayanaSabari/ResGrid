import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

const DisasterInfoPage = () => {
  const [disasters, setDisasters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDisasters = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/disasters"); // Adjust the URL if needed
        const data = await response.json();
        setDisasters(data);
        console.log(data)
      } catch (error) {
        console.error("Error fetching disasters: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDisasters();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message while fetching data
  }

  return (
    <div className="container mx-auto p-8 bg-green-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-green-800 text-center">
        Disaster Information
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Resources</TableHead>
            <TableHead>Severity Level</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {disasters.map((disaster) => (
            <TableRow key={disaster.id}>
              <TableCell className="font-medium">{disaster.type}</TableCell>
              <TableCell>{disaster.description}</TableCell>
              <TableCell>{disaster.resources}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-white font-semibold ${
                    disaster.severityLevel === "High"
                      ? "bg-red-500"
                      : disaster.severityLevel === "Medium"
                      ? "bg-yellow-500"
                      : disaster.severityLevel === "Very High"
                      ? "bg-purple-600"
                      : "bg-green-500"
                  }`}
                >
                  {disaster.severityLevel}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DisasterInfoPage;
