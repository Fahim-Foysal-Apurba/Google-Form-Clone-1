import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Function to generate a random string for code verifier
const generateCodeVerifier = () => {
    const array = new Uint32Array(56 / 2);
    window.crypto.getRandomValues(array);
    return array.map((n) => n.toString(16).padStart(2, '0')).join('');
};

// Function to generate the code challenge from the verifier
const generateCodeChallenge = async (codeVerifier) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    const base64url = btoa(String.fromCharCode.apply(null, new Uint8Array(digest)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    return base64url;
};

const Profile = ({ id, name, email, role, mode, setMode }) => {
    const [userMode, setUserMode] = useState(mode);
    const [user_name, setUserName] = useState(name);
    const [isSalesforceModalOpen, setIsSalesforceModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
    const navigate = useNavigate();

    const handleSalesforceAuth = async () => {
        const clientId = '3MVG9dAEux2v1sLvXd6k01hOFrye_dr8gzZFOUArLnSl072UAcfIPYcAOakrrBQydLfMdwPFCEqdR4kD4azYw';
        const redirectUri = 'https://ffa-form.netlify.app/oauth/callback';
        
        // Generate code_verifier and code_challenge
        const codeVerifier = generateCodeVerifier();
        const codeChallenge = await generateCodeChallenge(codeVerifier);
        
        // Save the code_verifier in sessionStorage to use it later in the callback
        sessionStorage.setItem('code_verifier', codeVerifier);

        // Salesforce OAuth authorization URL with code_challenge
        const authUrl = `https://login.salesforce.com/services/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

        // Redirect the user to Salesforce for authentication
        window.location.href = authUrl;
    };

    const handleFormInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        // You can handle the form submission here (send data to Salesforce or your backend)
        console.log("Form Data:", formData);

        // Example: Send to your backend to create an Account and Contact in Salesforce
        try {
            const response = await fetch('https://your-backend-url/createSalesforceAccount', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            
            if (response.ok) {
                alert("Form submitted successfully!");
                setIsSalesforceModalOpen(false); // Close the modal after successful form submission
            } else {
                console.error("Failed to submit form to Salesforce.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
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
                                <button className="btn btn-outline" onClick={() => setIsSalesforceModalOpen(true)}>
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

                {/* Salesforce Modal */}
                <div
                    className={`modal fade ${isSalesforceModalOpen ? "show" : ""}`}
                    id="salesforceModal"
                    tabIndex="-1"
                    aria-labelledby="salesforceModalLabel"
                    aria-hidden="true"
                    style={{ display: isSalesforceModalOpen ? "block" : "none" }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header" style={{ backgroundColor: "#C4B1AE" }}>
                                <h5 className="modal-title" id="salesforceModalLabel">
                                    Salesforce Login
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setIsSalesforceModalOpen(false)}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleFormSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleFormInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleFormInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Phone</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleFormInputChange}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">
                                        Submit
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

