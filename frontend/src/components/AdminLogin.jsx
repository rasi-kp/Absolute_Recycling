import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminlogin } from "../services/service";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role=="admin") {
      navigate("/AdmMain");
    }
  }, [navigate]);
  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");
    // Simple validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      toast.error("Please fill in all field")
      return;
    }
    try {
      const loginData = { email, password };
      const response = await adminlogin(loginData);
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", "admin");
      }
      // Show success toast and redirect to /home
      toast.success("Login successfull!");
      setTimeout(() => {
        navigate("/AdmMain");
      }, 1500); // Redirect after 1.5 seconds
    } catch (err) {
      // Show error message
      const errorMessage = err.message || "An error occurred during login.";
      toast.error(errorMessage);
    }
  };

  return (
    <>
    <ToastContainer />
      <div className="container my-1 py-3">
        <h1 className="text-left fs-4">Admin Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <label htmlFor="floatingInput">
                  UserName
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  className="form-control border border-primary p-2 rounded"
                  id="floatingInput"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="my-3">
                <label htmlFor="floatingPassword">
                  Password
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="password"
                  className="form-control border border-primary p-2 rounded"
                  id="floatingPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-danger">{error}</p>}
              <div className="text-center">
                <button type="submit" className="btn btn-outline-dark btn-primary m-2">
                  <i className="fa fa-sign-in-alt mr-1"></i> Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
