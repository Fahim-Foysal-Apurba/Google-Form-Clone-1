import GetUsers from "./components/GetUsers";
import LoginPage from "./components/login";
import TemplateCards from "./components/templateCards";
import LocalNavHeader from "./components/localNavHeader";
import { useState } from "react";
import RegisterPage from "./components/register";


const LocalPage = () => {

  const [activeLink, setActiveLink] = useState('home'); 

  return (
    <div>
      {
        /*Header Navbar*/ 
        <LocalNavHeader  activeLink={activeLink} setActiveLink={setActiveLink} />
      }

      {/* Main Body */}
      <div
        className="container mt-5 pt-5 bg-light"
        style={{ minHeight: '100vh', minWidth: "200vh", paddingTop: '4rem' }}
      >
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            {/* Form Card */}
            <div className="card shadow-lg rounded">
              <div className="card-header text-white text-center" style={{backgroundColor: "#B0817A"}}>
                <h4>{activeLink === 'home' ? 'Templates' : 'About Section'}</h4>
              </div>
              <div className="card-body">
                {activeLink === 'home' && <TemplateCards />}
                 
                {activeLink === 'about' && <GetUsers />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */
         <LoginPage/>
      }
      {/*register*/
        <RegisterPage />
      }
    </div>
  );
};

export default LocalPage;


