import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import GetUsers from "./components/GetUsers";
import LocalNavHeader from "./components/localNavHeader";
import TemplateCards from "./components/templateCards";
import Profile from "./components/profile";
import EditForm from "./components/editForm";

const AdminHome = () => {
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);

    const handleCopy = (formLink) => {
        navigator.clipboard.writeText(formLink).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset copied message after 2s
        });
    };

    const [forms, setForms] = useState([]);
    const [userForms, setUserforms] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation(); 
    const [activeLink, setActiveLink] = useState("home");

    const [mode, setMode] = useState(() => {
        const storedMode = sessionStorage.getItem("userMode");
        return storedMode ? JSON.parse(storedMode) : false;
    });

    const id = location.state?.id || sessionStorage.getItem("userId");
    const name = location.state?.name || sessionStorage.getItem("userName");
    const email = location.state?.email || sessionStorage.getItem("userEmail");
    const role = location.state?.role || sessionStorage.getItem("userRole");

    useEffect(() => {
        if (id) sessionStorage.setItem("userId", id);
        if (name) sessionStorage.setItem("userName", name);
        if (email) sessionStorage.setItem("userEmail", email);
        if (role) sessionStorage.setItem("userRole", role);
        sessionStorage.setItem("userMode", JSON.stringify(mode));
    }, [id, name, email, role, mode]);

    const containerBgClass = mode ? "bg-dark text-light" : "bg-light";
    const conCardClass = mode ? "bg-secondary text-light" : "bg-light";

    useEffect(() => {
        document.body.classList.remove("modal-open");
        document.querySelectorAll(".modal-backdrop").forEach((b) => b.remove());
        document.body.style.overflow = "auto"; // Enable scrolling
    }, []);

    // Fetch all forms
    const getForms = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`https://google-form-clone-wck5.onrender.com/getForms`);  // Ensure the API URL is correct
            const jsRes = await res.json();
            const formData = jsRes.sort((a, b) => b.id - a.id)
            setForms(formData);
            sessionStorage.setItem('forms', JSON.stringify(formData)); 

            const userFormsData = jsRes.filter((f) => f.user_id === id).sort((a, b) => b.id - a.id);
            setUserforms(userFormsData);
            sessionStorage.setItem('userForms', JSON.stringify(userFormsData)); // Store forms in sessionStorage
        } catch (error) {
            console.error("Error fetching forms:", error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        const storedForms = sessionStorage.getItem('userForms');
        if (storedForms) {
            setUserforms(JSON.parse(storedForms)); // Load forms from sessionStorage if available
        } else {
            getForms(); // Otherwise, fetch forms from API
        }
    }, [getForms]);

    return (
        <div className={`d-flex flex-column container-fluid mt-5 pt-5 ${containerBgClass}`} style={{ minHeight: "100vh" }}>
            {/* Header Navbar */}
            {role === "admin" && (
                <LocalNavHeader 
                    activeLink={activeLink} 
                    setActiveLink={setActiveLink} 
                    hidelogin={true} 
                    hideitem1={true} 
                    hideitem2={false} 
                    hideitem3={false} 
                    hidelogout={false} 
                />
            )}
            {role === "user" && (
                <LocalNavHeader 
                    activeLink={activeLink} 
                    setActiveLink={setActiveLink} 
                    hidelogin={true} 
                    hideitem1={true} 
                    hideitem2={true} 
                    hideitem3={false} 
                    hidelogout={false} 
                />
            )}

            {/* Main Body */}
            <div className="container-fluid px-3">
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-md-10">
                        {/* Form Card */}
                        <div className="card shadow-lg rounded">
                            <div className="card-header text-white text-center" style={{ backgroundColor: "#B0817A" }}>
                                <h4>
                                    {activeLink === "home" && "Templates"}
                                    {activeLink === "users" && "User Management"}
                                    {activeLink === "profile" && "Profile"}
                                </h4>
                            </div>
                            <div className={`card-body d-flex justify-content-center ${conCardClass}`}>
                                {activeLink === "home" && (
                                    <TemplateCards id={id} name={name} email={email} mode={mode} role={role} setMode={setMode} />
                                )}
                                {activeLink === "users" && (
                                    <GetUsers id={id} name={name} mode={mode} />
                                )}
                                {activeLink === "profile" && (
                                    <Profile id={id} name={name} email={email} role={role} mode={mode} setMode={setMode} />
                                )}
                            </div>
                        </div>

                        {/* User Forms */}
                        {activeLink === "profile" && (  
                            <div className="mt-2 card shadow-lg rounded">
                                <div className="card-header text-white text-center" style={{ backgroundColor: "#B0817A" }}>
                                    <h4>Your Forms</h4>
                                </div>
                                <div className={`card-body d-flex flex-wrap justify-content-center ${conCardClass}`}>
                                    {userForms.length > 0 ? (
                                        userForms.map((form) => (
                                            <div key={form.id} 
                                                className="card m-2 shadow border-0 rounded"
                                                style={{
                                                    width: "100%",
                                                    maxWidth: "250px",
                                                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = "scale(1.05)";
                                                    e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = "scale(1)";
                                                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                                                }}
                                            >
                                                <div className="card-body text-center">
                                                    <h5 className="card-title">{form.title}</h5>

                                                    {copied && <small className="text-success d-block mb-2">Link Copied!</small>}

                                                    <button className="btn btn-warning w-100" data-bs-toggle="modal" data-bs-target={`#editModal${form.id}`}>
                                                        Update Form
                                                    </button>

                                                    {/* EditForm Modal */}
                                                    <div className="modal fade" id={`editModal${form.id}`} tabIndex="-1" aria-labelledby={`editModalLabel${form.id}`} aria-hidden="true">
                                                        <div className="modal-dialog modal-xl">
                                                            <div className="modal-content">
                                                                <div className="modal-header bg-warning">
                                                                    <h5 className="modal-title w-100" id={`editModalLabel${form.id}`}>Edit Form</h5>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <EditForm form={form} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-muted">No forms available.</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Forms Table */}
                        {activeLink === 'home' && (
                            <div className="mt-2 card shadow-lg rounded">
                                <div className="card-header text-white text-center" style={{ backgroundColor: "#B0817A" }}>
                                    <h4>Forms</h4>
                                </div>
                                <div className={`card-body ${conCardClass}`}>
                                    <div className="table-responsive">  
                                        {loading ? (  
                                            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "250px" }}>
                                                <div className="spinner-border text-danger" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                        ) : forms.length === 0 ? (  
                                            <div className="text-center text-muted my-4">
                                                <h5>No forms found.</h5>
                                            </div>
                                        ) : (  
                                            <table className="table table-bordered table-striped table-hover">
                                                <thead className="table-warning text-center">
                                                    <tr>
                                                        <th>Title</th>
                                                        <th>Form Link</th>
                                                        <th>Copy Link</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {forms.map((f) => ( 
                                                        <tr key={f.id}>
                                                            <td className="text-truncate" style={{ maxWidth: "130px" }}>{f.title}</td>

                                                            {/* Navigate to Answer Page */}
                                                            <td>
                                                                <button 
                                                                    onClick={() => navigate(`/answerPage/${f.id}`)}  // Fix URL here
                                                                    className="btn btn-link"
                                                                >
                                                                    Go to Form
                                                                </button>
                                                            </td>

                                                            {/* Copy Link Button */}
                                                            <td>
                                                                <button 
                                                                    onClick={() => handleCopy(`https://ffa-form.netlify.app/answerPage/${f.id}`)} 
                                                                    className="btn btn-outline-primary"
                                                                >
                                                                    {copied ? "Copied!" : "Copy Link"}
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;










 










