import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, [navigate]); // Only run on initial mount

  const handleSubmit = async (e) => {
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
      const response = await login(loginData);
    
      if (response.token) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", "user");
    
        // Show success message if the token is present
        toast.success("Login successful!");
    
        // Conditional redirection based on `firstLogin`
        setTimeout(() => {
          if (response.firstLogin) {
            toast.info("Please change your password.");
            navigate("/Password");
          } else {
            navigate("/home");
          }
        }, 1000); // Redirect after 1 second
      }
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
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="fs-4">User Login</h1>
          {/* Admin Login button */}
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate("/AdmLogin")}
          >
            Admin Login
          </button>
        </div>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <label htmlFor="floatingInput">
                  UserName
                  <span className="text-danger">*</span> {/* Red Star */}
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
                  <span className="text-danger">*</span> {/* Red Star */}
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

export default UserLogin;
