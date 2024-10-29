import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa"; // Import Font Awesome logout icon

const Home = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]); // Only run on initial mount

  return (
    <>
      <div className="container my-1 py-3">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="fs-4">Welcome</h1>
          {/* Logout Icon Button */}
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            <FaSignOutAlt className="me-1" /> Logout
          </button>
        </div>
        <hr />
        <div className="text-center">
          <NavLink to="/FormPage" className="btn btn-outline-dark btn-primary m-2">
            Schedule a Collection
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Home;
