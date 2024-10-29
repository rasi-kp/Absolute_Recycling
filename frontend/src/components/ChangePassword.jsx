import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { changepassword, resetpassword } from "../services/service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!password || !confirmPassword) {
      setError("Please fill in all fields.");
      toast.error("Please fill in all fields.")
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      toast.error("Passwords do not match.")
      return;
    }
    try {
      const response = await changepassword(password);
      if (response.message) {
        toast.success(response.message)
      }
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container my-1 py-3">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="fs-4">Change Password</h1>
        </div>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <label htmlFor="newPassword">
                  New Password
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  className="form-control border border-primary p-2 rounded"
                  id="newPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="my-3">
                <label htmlFor="confirmPassword">
                  Confirm Password
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  className="form-control border border-primary p-2 rounded"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-danger">{error}</p>}
              <div className="text-center">
                <button type="submit" className="btn btn-outline-dark btn-primary m-2">
                  Change Password
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

export default ChangePassword;
