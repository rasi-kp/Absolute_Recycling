import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { salesadd } from "../services/service";


const Form = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    dateOfCollection: "",
    clientName: "",
    clientNumber: "",
    location: "",
    googleMapLocation: "",
    timeOfCollection: "",
    typeOfMaterial: "",
    noOfPallets: "",
    typeOfTruck: "",
    manPowerRequired: "",
    tooOrGatePass: "",
  });
  const [error, setError] = useState("");

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = [
      "dateOfCollection",
      "clientName",
      "clientNumber",
      "location",
      "googleMapLocation",
      "timeOfCollection",
      "typeOfMaterial",
      "noOfPallets",
      "typeOfTruck",
      "manPowerRequired",
      "tooOrGatePass",
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        setError("Please fill in all required fields.");
        toast.error("Please fill in all required fields.");
        return;
      }
    }

    try {
      // Call the service to submit data
      const response = await salesadd(formData);
      if (response.message) {
        toast.success(response.message);
      }
      setTimeout(() => {
        navigate("/Home");
      }, 1500); // Redirect after 1.5 seconds
    } catch (err) {
      // Show error message
      const errorMessage = err.message || "An error occurred during submission.";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="container my-1 py-3">
        <h1 className="text-left fs-4">Collection Booking</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="my-1">
                <label htmlFor="dateOfCollection" className="form-label">
                  Date of Collection<span className="text-danger"> *</span>
                </label>
                <input
                  type="date"
                  className="form-control border border-primary p-2 rounded"
                  id="dateOfCollection"
                  value={formData.dateOfCollection}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="my-1">
                <label htmlFor="clientName" className="form-label">
                  Client Name<span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  className="form-control border border-primary p-2 rounded"
                  id="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="my-1">
                <label htmlFor="clientNumber" className="form-label">
                  Client's Number
                </label>
                <input
                  type="text"
                  className="form-control border border-primary p-2 rounded"
                  id="clientNumber"
                  placeholder="05********"
                  value={formData.clientNumber}
                  onChange={handleInputChange}
                  pattern="^\d{10}$"
                  title="Client number must be a 10-digit number."
                />
              </div>
              <div className="my-1">
                <label htmlFor="location" className="form-label">
                  Location<span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  className="form-control border border-primary p-2 rounded"
                  id="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="my-1">
                <label htmlFor="googleMapLocation" className="form-label">
                  Google Map Location
                </label>
                <input
                  type="text"
                  className="form-control border border-primary p-2 rounded"
                  id="googleMapLocation"
                  value={formData.googleMapLocation}
                  onChange={handleInputChange}
                />
              </div>
              <div className="my-1">
                <label htmlFor="timeOfCollection" className="form-label">
                  Time of Collection<span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  className="form-control border border-primary p-2 rounded"
                  id="timeOfCollection"
                  value={formData.timeOfCollection}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="my-1">
                <label htmlFor="typeOfMaterial" className="form-label">
                  Type of Material(Product Type)<span className="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  className="form-control border border-primary p-2 rounded"
                  id="typeOfMaterial"
                  value={formData.typeOfMaterial}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="my-1">
                <label htmlFor="noOfPallets" className="form-label">
                  No of Pallets<span className="text-danger"> *</span>
                </label>
                <input
                  type="number"
                  className="form-control border border-primary p-2 rounded"
                  id="noOfPallets"
                  value={formData.noOfPallets}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="my-1">
                <label htmlFor="typeOfTruck" className="form-label">
                  Type of Truck<span className="text-danger"> *</span>
                </label>
                <select
                  className="form-control border border-primary p-2 rounded"
                  id="typeOfTruck"
                  value={formData.typeOfTruck}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select truck type
                  </option>
                  <option value="1 Ton">1 Ton</option>
                  <option value="3 Ton">3 Ton</option>
                  <option value="10 Ton">10 Ton</option>
                  <option value="Trailer">Trailer</option>
                  <option value="Dumper">Dumper</option>
                </select>
              </div>
              <div className="my-1">
                <label htmlFor="manPowerRequired" className="form-label">
                  Man Power<span className="text-danger"> *</span>
                </label>
                <select
                  className="form-control border border-primary p-2 rounded"
                  id="manPowerRequired"
                  value={formData.manPowerRequired}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="my-1">
                <label htmlFor="tooOrGatePass" className="form-label">
                  TOO / GatePass<span className="text-danger"> *</span>
                </label>
                <select
                  className="form-control border border-primary p-2 rounded"
                  id="tooOrGatePass"
                  value={formData.tooOrGatePass}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="N/A">N/A</option>
                </select>
              </div>

              {error && <p className="text-danger">{error}</p>}

              <div className="text-center">
                <button type="submit" className="btn btn-outline-dark btn-primary m-2">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Form;
