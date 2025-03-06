import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ id, name, email, role, mode, setMode }) => {
  const [userMode, setUserMode] = useState(mode);
  const navigate = useNavigate();
  const [user_name, setUserName] = useState(name);

  const handleSalesforceAuth = () => {
    const clientId = '3MVG9dAEux2v1sLvXd6k01hOFrye_dr8gzZFOUArLnSl072UAcfIPYcAOakrrBQydLfMdwPFCEqdR4kD4azYw'
    const redirectUri = 'https://ffa-form.netlify.app/callback'

    // Salesforce OAuth authorization URL
    const authUrl = `https://login.salesforce.com/services/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

    // Redirect the user to Salesforce for authentication
    window.location.href = authUrl;
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("https://google-form-clone-wck5.onrender.com/logout", {
        method: "POST",
        credentials: "include", // Important: ensures cookies are included
      });

      if (response.status === 200) {
        console.log("Logged out successfully");
        // Redirect the user to the login page (or any other page)
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const removeAdmin = async (id) => {
    await fetch(`https://google-form-clone-wck5.onrender.com/removeAdmin/${id}`, { method: "PUT" });
    handleLogout();
  };

  useEffect(() => {
    document.body.className = userMode ? "dark-mode" : "light-mode";
  }, [userMode]);

  const toggleMode = async (newMode) => {
    try {
      setUserMode(newMode);
      setMode(newMode);

      const endpoint = newMode
        ? `https://google-form-clone-wck5.onrender.com/updateModeDark/${id}`
        : `https://google-form-clone-wck5.onrender.com/updateModeLight/${id}`;

      const response = await fetch(endpoint, { method: "PUT" });

      if (!response.ok) {
        throw new Error("Failed to update mode");
      }

      const data = await response.json();
      console.log("Updated mode:", data);
      setUserMode(data.mode);
      setMode(data.mode);
    } catch (error) {
      console.error("Error updating mode:", error);
      setUserMode(!newMode); // Revert UI if API fails
      setMode(!newMode); // Revert AdminHome if API fails
    }
  };

  const updateName = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const body = { id: id, user_name: user_name };

    const response = await fetch("https://google-form-clone-wck5.onrender.com/updateName", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.json();
      setUserName(data.name);
      sessionStorage.setItem("userName", data.name);
    } else {
      console.error("Failed to update name");
    }
  };

  return (
    <div className="container mt-3">
      <div className="row container d-flex justify-content-center">
        <table
          className="table table-striped table-bordered table-hover d-flex justify-content-center "
          style={{ backgroundColor: "#f9ecf2" }}
        >
          <tbody>
            <tr style={{ backgroundColor: "#f9ecf2" }}>
              <td className="fw-bold">Name</td>
              <td>{user_name}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-outline-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                >
                  <i className="fas fa-edit"></i>
                </button>
              </td>
            </tr>
            <tr>
              <td className="fw-bold">Email</td>
              <td className="text-truncate" style={{ maxWidth: "350px" }}>
                {email}
              </td>
              <td>
                <i className="fas fa-eye"></i>
              </td>
            </tr>

            <tr>
              <td className="fw-bold">Role</td>
              <td>{role}</td>
              {role === "admin" && (
                <td>
                  <button
                    className="btn btn-outline-dark w-80"
                    onClick={() => removeAdmin(id)}
                  >
                    <i className="fas fa-user-minus"></i>
                  </button>
                </td>
              )}
              {role === "user" && <td>-</td>}
            </tr>
            <tr>
              <td className="fw-bold">Mode</td>
              <td>{userMode ? "dark" : "light"}</td>
              <td>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckChecked1"
                    checked={userMode}
                    onChange={() => toggleMode(!userMode)}
                  />
                  <label className="form-check-label" htmlFor="flexSwitchCheckChecked1"></label>
                </div>
              </td>
            </tr>
            <tr>
              <td className="fw-bold">Salesforce Link</td>
              <td>
                <button className="btn btn-outline" onClick={handleSalesforceAuth}>
                  Login with Salesforce
                </button>
              </td>
              <td>
                <i className="fas fa-eye"></i>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Edit Name Modal window */}
        <div
          className="modal fade"
          id="editModal"
          tabIndex="-1"
          aria-labelledby="editModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header" style={{ backgroundColor: "#C4B1AE" }}>
                <h5 className="modal-title" id="editModalLabel">
                  Update your Name
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form className="form-control" onSubmit={updateName}>
                  <input
                    type="text"
                    className="form-control"
                    value={user_name}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Edit your name"
                    required
                  />
                  <button
                    type="submit"
                    className="btn btn-outline-light"
                    data-bs-dismiss="modal"
                    style={{ backgroundColor: "#C4B1AE" }}
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
