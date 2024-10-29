import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg py-2 sticky-top" id="grad1">
      <div className="container">
        <img className="navbar-logo" src="assets/abslogo2.png" alt="Absolute Recycling Logistics Logo" />
        <NavLink className="navbar-brand fw-bold fs-6 px-1" to="/">
            Absolute Recycling Logistics
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
