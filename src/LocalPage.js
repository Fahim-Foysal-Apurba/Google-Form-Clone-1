import GetUsers from "./components/GetUsers";
import LoginPage from "./components/login";
import TemplateCards from "./components/templateCards";
import LocalNavHeader from "./components/localNavHeader";
import { useState } from "react";
import RegisterPage from "./components/register";


const LocalPage = () => {

  const [activeLink, setActiveLink] = useState('home'); 

  return (
<div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
  {/* Header Navbar */}
  <LocalNavHeader activeLink={activeLink} setActiveLink={setActiveLink} />

  {/* Main Body */}
  <div
    className="container mt-5 pt-5 bg-light col-12 col-md-10 col-lg-10"
    style={{ minHeight: "100vh", paddingTop: "4rem" }}
  >
    <div className="row justify-content-center">
      <div className="col-12 col-md-10">
        {/* Form Card */}
        <div className="card shadow-lg rounded">
          <div
            className="card-header text-white text-center"
            style={{ backgroundColor: "#B0817A" }}
          >
            <h4>{activeLink === "home" ? "Templates" : "About Section"}</h4>
          </div>
          <div className="card-body">
            {activeLink === "home" && <TemplateCards />}

            {activeLink === "about" && <GetUsers />}
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Login Modal */}
  <LoginPage />

  {/* Register Modal */}
  <RegisterPage />
</div>

  );
};

export default LocalPage;


