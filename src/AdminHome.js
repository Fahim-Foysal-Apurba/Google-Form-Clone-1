import { useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import GetUsers from "./components/GetUsers";
import LocalNavHeader from "./components/localNavHeader";
import TemplateCards from "./components/templateCards";
import Profile from "./components/profile";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {

    const navigate =useNavigate()

    const [copied, setCopied] = useState(false);
    const handleCopy = (formLink) => {
      navigator.clipboard.writeText(formLink).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied message after 2s
      });
    };

    const [forms, setForms] =useState([])
    const [loading, setLoading] = useState(false);
    const location = useLocation(); 
    const [activeLink, setActiveLink] = useState("home");

    const [mode, setMode] = useState(() => {
        const storedMode = sessionStorage.getItem("userMode");
        return storedMode ? JSON.parse(storedMode) : false;
    });
    const id = location.state?.id || sessionStorage.getItem("userId")
    const name = location.state?.name || sessionStorage.getItem("userName")  
    const email = location.state?.email || sessionStorage.getItem("userEmail")
    const role = location.state?.role || sessionStorage.getItem("userRole")

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
            const res = await fetch(`ffa-form.netlify.app/getForms`);
            const jsRes = await res.json();
            setForms(jsRes);
        } catch (error) {
            console.error("Error fetching forms:", error);
        } finally {
            setLoading(false); 
        }
    }, []);

    useEffect(()=>{getForms();}, [getForms]);

    return (
        <div className={`d-flex flex-column container-fluid mt-5 pt-5 ${containerBgClass}`} style={{ minHeight: "100vh" }}>
            {/* Header Navbar */}
            { role==="admin" && <LocalNavHeader activeLink={activeLink} setActiveLink={setActiveLink} hidelogin={true} hideitem1={true} hideitem2={false} hideitem3={false} hidelogout={false} />}
            { role==="user" && <LocalNavHeader activeLink={activeLink} setActiveLink={setActiveLink} hidelogin={true} hideitem1={true} hideitem2={true} hideitem3={false} hidelogout={false} />}

            {/* Main Body */}
            <div className="container-fluid px-3">
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-md-10">
                        {/* Form Card */}
                        <div className="card shadow-lg rounded">
                            <div className="card-header text-white text-center" style={{ backgroundColor: "#B0817A" }}>
                                <h4>{activeLink === "home" && "Templates"}</h4>
                                <h4>{activeLink === "users" && "User Management"}</h4>
                                <h4>{activeLink === "profile" && "Profile"}</h4>
                            </div>
                            <div className={`card-body d-flex justify-content-center ${conCardClass}`}>
                                {activeLink === "home" && <TemplateCards id={id} name={name} email={email} mode={mode} role={role} setMode={setMode} />}
                                {activeLink === "users" && <GetUsers id={id} name={name}  mode={mode}/>}
                                {activeLink === "profile" && <Profile id={id} name={name} email={email} role={role} mode={mode} setMode={setMode} />}
                            </div>
                        </div>
                        <div className="mt-2 card shadow-lg rounded">
                            <div className="card-header text-white text-center" style={{ backgroundColor: "#B0817A" }}>
                                <h4>Forms</h4>
                            </div>
                            <div className="card-body">
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
                                            <thead className="table-dark text-center">
                                                <tr>
                                                    <th>Title</th>
                                                    <th>Link of forms</th>
                                                    <th>Copy Link</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {forms.map((f) => ( 
                                                    <tr key={f.id}>
                                                        <td className="text-truncate" style={{ maxWidth: "130px" }}>{f.title}</td>
                                                        <td> <button onClick={()=>navigate(`/answerPage/${f.id}`)}>{`https://ffa-form.netlify.app/answerPage/${f.id}`}</button></td>
                                                        <td>      <button onClick={()=>handleCopy(`https://ffa-form.netlify.app/answerPage/${f.id}`)}>
                                       {copied ? "Copied!" : "Copy Link"}
                                      </button></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;










