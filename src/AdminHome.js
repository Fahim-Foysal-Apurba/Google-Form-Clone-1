import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GetUsers from "./components/GetUsers";
import LocalNavHeader from "./components/localNavHeader";
import TemplateCards from "./components/templateCards";
import Profile from "./components/profile";
import user_form from "./image/form_u.png";


const AdminHome = () => {
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);

    const handleCopy = (formLink) => {
        navigator.clipboard.writeText(formLink).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };


    const [forms, setForms] = useState([]);
    const [otherForms, setOtherForms] = useState([])
    const [userForms, setUserforms] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [activeLink, setActiveLink] = useState("home");

    const [mode, setMode] = useState(() => {
        const storedMode = sessionStorage.getItem("userMode");
        return storedMode ? JSON.parse(storedMode) : false;
    });

    const id = location.state?.id || sessionStorage.getItem("userId");
    const name= location.state?.name || sessionStorage.getItem("userName")
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
        document.body.style.overflow = "auto";
    }, []);

    const getForms = async (id) => {
        setLoading(true);
        try {
            const res = await fetch("https://google-form-clone-wck5.onrender.com/getForms");
            const jsRes = await res.json();
            setForms(jsRes.sort((a, b) => b.id - a.id));

            // Filter forms for the current user
            const usfr = jsRes.filter((u) => u.user_id === Number(id));
            setUserforms(usfr.sort((a, b) => b.id - a.id));

            const other = jsRes.filter((u) => u.user_id !== Number(id));
            setOtherForms(other.sort((a, b) => b.id - a.id));
        } catch (error) {
            console.error("Error fetching forms:", error);
        } finally {
            setLoading(false);
        }
    };





    const [isOpen, setIsOpen] = useState({}); 

    const toggleDropdown = (formId) => {
        setIsOpen((prevState) => ({
            ...prevState,
            [formId]: !prevState[formId], 
        }));
    };


    const deleteForm = async (formId) => {

        try{
            setLoading(true)

            const body = { formId, id };

            await fetch("https://google-form-clone-wck5.onrender.com/deleteForm", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            getForms(id)

        }catch(err){
            console.log(err)
            setLoading(false)
        }finally{
            setLoading(false)
        }

    };
    useEffect(() => {
        getForms(id);
    }, [id]);

    

    return (
        <div className={`d-flex flex-column container-fluid mt-5 pt-5 ${containerBgClass}`} style={{ minHeight: "100vh" }}>
            {role === "admin" && (
                <LocalNavHeader
                    activeLink={activeLink}
                    setActiveLink={setActiveLink}
                    hidelogin={true}
                    hideitem1={true}
                    hideitem2={false}
                    hideitem3={false}
                    hidelogout={false}
                    hideitemUser={false}
                    name={name}
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
                    hideitemUser={false}
                    name={name}
                />
            )}

            <div className="container-fluid px-3">
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-md-10">
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
                                    <TemplateCards id={id} name={name} email={email} mode={mode} role={role} setMode={setMode} getForms={getForms}/>
                                )}
                                {activeLink === "users" && <GetUsers id={id} name={name} mode={mode} />}
                                {activeLink === "profile" && (
                                    <Profile id={id} name={name} email={email} role={role} mode={mode} setMode={setMode}/>
                                )}
                            </div>
                        </div>

                        {activeLink === "profile" && (
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
                                                    maxWidth: "120px",
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
                                                <div className="dropdown">
                                                    <button className="btn d-flex" onClick={() => toggleDropdown(form.id)}>
                                                        <i className="fas fa-ellipsis-v"></i>
                                                    </button>

                                                    {isOpen[form.id] && (
                                                        <ul
                                                            className="dropdown-menu show"
                                                            style={{
                                                                display: "block",
                                                                position: "absolute",
                                                                minWidth: "50px",
                                                                backgroundColor: "#b0b0b0",
                                                                borderRadius: "5px",
                                                                padding: "5px",
                                                            }}
                                                        >
                                                            <li>
                                                                <button
                                                                    className="dropdown-item btn-outline text-danger bg-light"
                                                                    style={{ fontSize: "12px" }}
                                                                    onClick={() => deleteForm(form.id)}
                                                                >    

                                        {loading ? (
                                            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50px" }}>
                                                <div className="spinner-border text-danger" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                        ) : (                                 

                                                                    <i className="fas fa-trash"></i>)} Delete
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    )}
                                                </div>

                                                <button className="btn btn-outline">
                                                    <div className="card-body text-center">
                                                        <div className="text-truncate fw-bold" style={{ maxWidth: "350px", margin: "0 auto" }}>
                                                            {form.title}
                                                        </div>
                                                        <img
                                                            src={user_form}
                                                            alt="form"
                                                            style={{
                                                                width: "100%",
                                                                maxWidth: "100px",
                                                                maxHeight: "100px",
                                                                objectFit: "cover",
                                                            }}
                                                        />
                                                    </div>
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-muted">No forms available.</p>
                                    )}
                                </div>
                            </div>
                        )}


                         {role==='admin' && activeLink === "profile" && (
    <div className="mt-2 card shadow-lg rounded">
        <div className="card-header text-white text-center" style={{ backgroundColor: "#B0817A" }}>
            <h4>All other forms</h4>
        </div>
        <div className={`card-body d-flex flex-wrap justify-content-center ${conCardClass}`}>
            {otherForms.length > 0 ? (
                otherForms.map((form) => (
                    <div
                        key={form.id}
                        className="card m-2 shadow border-0 rounded"
                        style={{
                            width: "100%",
                            maxWidth: "120px",
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
                        <div className="dropdown">
                            <button className="btn d-flex" onClick={() => toggleDropdown(form.id)}>
                                <i className="fas fa-ellipsis-v"></i>
                            </button>

                            {isOpen[form.id] && (
                                <ul
                                    className="dropdown-menu show"
                                    style={{
                                        display: "block",
                                        position: "absolute",
                                        minWidth: "50px",
                                        backgroundColor: "#b0b0b0",
                                        borderRadius: "5px",
                                        padding: "5px",
                                    }}
                                >
                                    <li>
                                        <button
                                            className="dropdown-item btn-outline text-danger bg-light"
                                            style={{ fontSize: "12px" }}
                                            onClick={() => deleteForm(form.id)}
                                        >                                     

                                            <i className="fas fa-trash"></i> Delete
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>

                        <button className="btn btn-outline" >
                            <div className="card-body text-center">
                                <div className="text-truncate fw-bold" style={{ maxWidth: "350px", margin: "0 auto" }}>
                                    {form.title}
                                </div>
                                <img
                                    src={user_form}
                                    alt="form"
                                    style={{
                                        width: "100%",
                                        maxWidth: "100px",
                                        maxHeight: "100px",
                                        objectFit: "cover",
                                    }}
                                />
                            </div>
                            
                        </button>
                        
                    </div>
                    
                ))
            ) : (
                <p className="text-muted">No forms available.</p>
            )}
        </div>
    </div>
)}
                        



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
                                        ) : (
                                            <table className="table table-bordered table-striped table-hover">
                                                <thead className="ttext-center" style={{backgroundColor: "#f3b4a8"}}>
                                                    <tr>
                                                        <th>Title</th>
                                                        <th>Form Link</th>
                                                        <th>Copy Link</th>
                                                    </tr>
                                                </thead>
                                                <tbody style={{backgroundColor:"#f9ecf2"}}>
                                                    {forms.map((f) => (
                                                        <tr key={f.id}>
                                                            <td>{f.title}</td>
                                                            <td>
                                                                <button onClick={() => navigate(`/answerPage/${f.id}`)} className="btn btn-link">
                                                                    Go to Form
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button onClick={() => handleCopy(`https://ffa-form.netlify.app/answerPage/${f.id}`)} className="btn btn-outline-primary">
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

















 










