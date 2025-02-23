import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ id, name, email, role, mode, setMode }) => {
    const [userMode, setUserMode] = useState(mode);
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const response = await fetch('https://google-form-clone-wck5.onrender.com/logout', {
                method: 'POST',
                credentials: 'include',  // Important: ensures cookies are included
            });

            if (response.status === 200) {
                console.log('Logged out successfully');
                // Redirect the user to the login page (or any other page)
                navigate('/');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const removeAdmin = async (id) => {
        await fetch(`https://google-form-clone-wck5.onrender.com/removeAdmin/${id}`, { method: 'PUT' });
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

    return (
        <div className="container mt-3">
            <div className="row container d-flex justify-content-center">
                

                            <table className="table table-striped table-bordered table-hover ">
                                <tbody>
                                    <tr style={{ backgroundColor: "#B2D8D8" }}>
                                        <td className="fw-bold">Name</td>
                                        <td>{name}</td>
                                        <td></td>
                                    </tr>
                                    <tr style={{ backgroundColor: "#F4D03F" }}>
                                        <td className="fw-bold">Email</td>
                                        <td>{email}</td>
                                        <td></td>
                    
                                    </tr>
                                    
                                    <tr style={{ backgroundColor: "#F1948A" }}>
                                        <td className="fw-bold">Role</td>
                                        <td>{role}</td>
                                        {role === "admin" && (<td><button className="btn btn-outline-dark w-80" onClick={()=>removeAdmin(id)} >remove</button></td>)}
                                        {role === "user" && (<td>-</td>)}
                                    </tr>
                                    <tr style={{ backgroundColor: "#D5DBDB" }}>
                                        <td className="fw-bold">Mode</td>
                                        <td>{userMode ? "Dark" : "Light"}</td>
                                        <td>
                                            {userMode ? (
                                                <button className="btn btn-outline-light w-80" onClick={() => toggleMode(false)}>
                                                    Light Mode
                                                </button>
                                            ) : (
                                                <button className="btn btn-outline-dark w-80" onClick={() => toggleMode(true)}>
                                                    Dark 
                                                </button>
                                            )}
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                   
               
          
        </div>
    );
};

export default Profile;





