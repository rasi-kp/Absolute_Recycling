import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaTrash, FaBan, FaCheckCircle, FaRedo } from "react-icons/fa"; // Import reset icon
import { adduser, alluser, blockuser, deleteuser, resetpassword, unblockuser } from "../services/service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminMain = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetching();
  }, []);
  useEffect(() => {
    // Check if token exists in localStorage and if role is admin
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "admin") {
      navigate("/");
    }
  }, [navigate]);
  const fetching = async () => {
    try {
      const response = await alluser();
      setUsers(response.data);
    } catch (error) {
      if (error.response && error.response.data.error === "Failed to authenticate token") {
        // Clear the token and redirect to /AdmLogin
        localStorage.removeItem("token");
        navigate("/AdmLogin");
      } else {
        console.error("An error occurred:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please fill in all fields.");
      return; // Stop the function if email is missing
    }
    try {
      var response = await adduser({ email }); // Pass the email if needed
      if (response.message) {
        toast.success(response.message);
      }
      setEmail("");
      setError("");
      await fetching()
    } catch (error) {
      // toast.error(response.error);
      setError("Failed to add user. Please try again."); // Set error message for any errors
    }
  };


  // Remove user
  const handleRemoveUser = async (userEmail) => {
    const confirmBlock = window.confirm("Are you sure you want to Delete this user ?");
    if (!confirmBlock) return;
    const response = await deleteuser(userEmail);
    if (response.message) {
      toast.success(response.message)
    }
    setUsers(users.filter((user) => user.email !== userEmail));
  };

  // Toggle block/unblock
  const handleToggleBlockUser = async (userEmail, isBlocked) => {
    try {
      if (!isBlocked) {
        const confirmBlock = window.confirm("Are you sure you want to block this user?");
        if (!confirmBlock) return;
        const response = await blockuser(userEmail);
        if (response.message) {
          toast.success(response.message)
        }
      } else {
        const response = await unblockuser(userEmail);
        if (response.message) {
          toast.success(response.message)
        }

      }
      // Update the user's block status without re-fetching
      setUsers(
        users.map((user) =>
          user.email === userEmail ? { ...user, isBlocked: !isBlocked } : user
        )
      );
    } catch (error) {
      toast.error("Failed to toggle block status:", error.message);
    }
  };

  // Reset password for a user
  const handleResetPassword = async(userEmail) => {
    const confirmBlock = window.confirm("Are you sure Reset Password ?");
    if (!confirmBlock) return;
    const response = await resetpassword(userEmail);
    if (response.message) {
      toast.success(response.message)
    }
  };
  
  
  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <div className="container my-1 py-3">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="text-left fs-4">Add New User</h1>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            <FaSignOutAlt className="me-1" /> Logout
          </button>
        </div>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <label htmlFor="floatingInput">
                  Email ID:
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
              {error && <p className="text-danger">{error}</p>}
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-outline-dark btn-primary m-2"
                >
                  Add User
                </button>
              </div>
            </form>

            {users.length > 0 && (
              <div className="mt-4">
                <h5>Current Users:</h5>
                <ul className="list-group">
                  {users.map((user, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {user.email}
                      <div>
                        <button
                          className="btn btn-danger btn-sm me-2"
                          onClick={() => handleRemoveUser(user.email)}
                        >
                          <FaTrash /> {/* Delete icon */}
                        </button>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleToggleBlockUser(user.email, user.isBlocked)}
                        >
                          {user.isBlocked ? (
                            <FaCheckCircle /> // Unblock icon
                          ) : (
                            <FaBan /> // Block icon
                          )}
                        </button>
                        <button
                          className="btn btn-info btn-sm"
                          onClick={() => handleResetPassword(user.email)}
                        >
                          <FaRedo /> {/* Reset password icon */}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AdminMain;
