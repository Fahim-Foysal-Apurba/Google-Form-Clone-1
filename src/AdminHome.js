import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import GetUsers from "./components/GetUsers";
import LocalNavHeader from "./components/localNavHeader";
import TemplateCards from "./components/templateCards";
import Profile from "./components/profile";
// import EditForm from "./components/editForm";

const AdminHome = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [forms, setForms] = useState([]);
  const [userForms, setUserForms] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("home");

  // Manage mode with sessionStorage
  const [mode, setMode] = useState(() => {
    const storedMode = sessionStorage.getItem("userMode");
    return storedMode ? JSON.parse(storedMode) : false;
  });

  // Get user data either from location state or sessionStorage
  const id = location.state?.id || sessionStorage.getItem("userId");
  const name = location.state?.name || sessionStorage.getItem("userName");
  const email = location.state?.email || sessionStorage.getItem("userEmail");
  const role = location.state?.role || sessionStorage.getItem("userRole");

  // Save user data to sessionStorage
  useEffect(() => {
    if (id) sessionStorage.setItem("userId", id);
    if (name) sessionStorage.setItem("userName", name);
    if (email) sessionStorage.setItem("userEmail", email);
    if (role) sessionStorage.setItem("userRole", role);
    sessionStorage.setItem("userMode", JSON.stringify(mode));
  }, [id, name, email, role, mode]);

  const containerBgClass = mode ? "bg-dark text-light" : "bg-light";
  const conCardClass = mode ? "bg-secondary text-light" : "bg-light";

  // Clean up any modal leftovers on mount
  useEffect(() => {
    document.body.classList.remove("modal-open");
    document.querySelectorAll(".modal-backdrop").forEach((b) => b.remove());
    document.body.style.overflow = "auto"; // Enable scrolling
  }, []);

  // Function to copy form link to clipboard
  const handleCopy = (formLink) => {
    navigator.clipboard.writeText(formLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  // Fetch forms and store them in localStorage for persistence
  const getForms = useCallback(async () => {
    if (!id) return; // Ensure user id is available before fetching
    setLoading(true);
    try {
      const res = await fetch(`https://google-form-clone-wck5.onrender.com/getForms`);
      const jsRes = await res.json();
      // Sort forms by descending id
      const formData = jsRes.sort((a, b) => b.id - a.id);
      setForms(formData);
      localStorage.setItem("allForms", JSON.stringify(formData)); // Persist all forms

      // Filter for the logged in user's forms and sort them
      const userFormsData = formData.filter((f) => f.user_id === id).sort((a, b) => b.id - a.id);
      setUserForms(userFormsData);
      localStorage.setItem("userForms", JSON.stringify(userFormsData)); // Persist user forms
    } catch (error) {
      console.error("Error fetching forms:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // On component mount, try loading forms from localStorage, then fetch if not available
  useEffect(() => {
    if (id) {
      const storedUserForms = localStorage.getItem("userForms");
      if (storedUserForms && storedUserForms !== "undefined") {
        setUserForms(JSON.parse(storedUserForms));
      } else {
        getForms();
      }
    }
  }, [getForms, id]);

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
                {activeLink === "home" && <TemplateCards id={id} name={name} email={email} mode={mode} role={role} setMode={setMode} />}
                {activeLink === "users" && <GetUsers id={id} name={name} mode={mode} />}
                {activeLink === "profile" && <Profile id={id} name={name} email={email} role={role} mode={mode} setMode={setMode} />}
              </div>
            </div>

            {/* Display User Forms on Profile Page */}
            {activeLink === "home" && (
              <div className="mt-2 card shadow-lg rounded">
                <div className="card-header text-white text-center" style={{ backgroundColor: "#B0817A" }}>
                  <h4>Your Forms</h4>
                </div>
                <div className={`card-body d-flex flex-wrap justify-content-center ${conCardClass}`}>
                  {userForms.length > 0 ? (
                    userForms.map((form) => (
                      <div
                        key={form.id}
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
                          <button className="btn btn-outline-light btn-warning me-0 me-sm-2 mb-2 mb-sm-0" data-bs-toggle="modal" data-bs-target="#editModal">
                            Update Form
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted">No forms available.</p>
                  )}
                </div>
              </div>
            )}

            {/* Uncomment below if you want to include the EditForm component */}
            {/* <EditForm /> */}

            {/* Forms Table for Templates (Home) */}
            {activeLink === "home" && (
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
                              <td className="text-truncate" style={{ maxWidth: "130px" }}>
                                {f.title}
                              </td>
                              <td>
                                <button onClick={() => navigate(`/answerPage/${f.id}`)} className="btn btn-link">
                                  Go to Form
                                </button>
                              </td>
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












 










