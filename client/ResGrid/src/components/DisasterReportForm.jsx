import { useState } from "react";
import { AlertTriangle, MapPin, Send } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const DisasterReportForm = () => {
  const [formData, setFormData] = useState({
    disasterType: "",
    description: "",
    location: "",
    peopleAffected: "",
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      disasterType: "",
      description: "",
      location: "",
      peopleAffected: "",
    });
    alert("Report submitted successfully!");

    // Redirect to DisasterInfoPage after form submission
    navigate("/disaster-info");
  };

  return (
    <div className="bg-green-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="p-8 w-full">
            <div className="flex items-center justify-center w-20 h-20 bg-red-100 text-red-500 rounded-full mx-auto mb-6 transform hover:scale-110 transition-transform duration-300">
              <AlertTriangle size={40} />
            </div>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
              Emergency Report
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <label
                  htmlFor="disasterType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Type of Emergency
                </label>
                <select
                  id="disasterType"
                  name="disasterType"
                  value={formData.disasterType}
                  onChange={handleChange}
                  required
                  className="block w-full py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                >
                  <option value="">Select emergency type</option>
                  <option value="flood">Flood</option>
                  <option value="earthquake">Earthquake</option>
                  <option value="wildfire">Wildfire</option>
                  <option value="hurricane">Hurricane</option>
                  <option value="landslide">Landslide</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="group">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Situation Details
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="block w-full py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                  placeholder="Provide a detailed description of the emergency..."
                ></textarea>
              </div>

              <div className="group">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="block w-full pl-10 py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                    placeholder="Enter the affected area"
                  />
                </div>
              </div>

              <div className="group">
                <label
                  htmlFor="peopleAffected"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Estimated Number of People Affected
                </label>
                <input
                  type="number"
                  id="peopleAffected"
                  name="peopleAffected"
                  value={formData.peopleAffected}
                  onChange={handleChange}
                  className="block w-full py-3 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                  placeholder="Enter an estimate"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Submit Emergency Report
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisasterReportForm;
