import formLogo from '../image/form.png'; 
import { useNavigate } from 'react-router-dom';


const LocalNavHeader = ({ activeLink, setActiveLink, hideitem1, hideitem2, hideitem3, hidelogin, hidelogout, hideitemUser, name }) => {
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

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return ( 
        <div className="row">
            <nav
                className="navbar navbar-expand-lg navbar-dark fixed-top"
                style={{ backgroundColor:" #C4B1AE" }}
            >
                <div className="container-fluid">
                    {/* Brand Logo */}
                    <a
                        href="/"
                        className="navbar-brand text-white fs-2 d-flex align-items-center"
                        style={{ fontFamily: "'Times New Roman'" }}
                    >
                        <img
                            src={formLogo}
                            alt="logo"
                            width="60"
                            height="auto"
                            className="d-inline-block align-text-top"
                        />
                        <h2 className="ms-2 d-inline-block align-text-top p-2">FFA Form</h2>
                    </a>

                    {/* Navbar Toggler for Mobile */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarContent"
                        aria-controls="navbarContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Collapsible Navbar Content */}
                    <div className="collapse navbar-collapse" id="navbarContent">
                        {/* Navigation Links */}
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-column flex-lg-row">
                            <li className="nav-item">
                                <a
                                    href="#home"
                                    className={`nav-link ${activeLink === "home" ? "active bg-warning rounded-3" : ""}`}
                                    style={{ fontFamily: "'Times New Roman'", fontSize: 22 }}
                                    onClick={() => handleLinkClick("home")}
                                >
                                    Home
                                </a>
                            </li>
                            {!hideitem1 && (
                                <li className="nav-item">
                                    <a
                                        href="#about"
                                        className={`nav-link ${activeLink === "about" ? "active bg-warning rounded-3" : ""}`}
                                        style={{ fontFamily: "'Times New Roman'", fontSize: 22 }}
                                        onClick={() => handleLinkClick("about")}
                                    >
                                        About
                                    </a>
                                </li>
                            )}
                            {!hideitem2 && (
                                <li className="nav-item">             
                                    <a
                                        href="#users"
                                        className={`nav-link ${activeLink === "users" ? "active bg-warning rounded-3" : ""}`}
                                        style={{ fontFamily: "'Times New Roman'", fontSize: 22 }}
                                        onClick={() => handleLinkClick("users")}
                                    >
                                        Users
                                    </a>
                                </li>
                            )}

                            {!hideitem3 && (
                              
                              <li className="nav-item">             
                              <a
                                  href="#users"
                                  className={`nav-link ${activeLink === "profile" ? "active bg-warning rounded-3" : ""}`}
                                  style={{ fontFamily: "'Times New Roman'", fontSize: 22 }}
                                  onClick={() => handleLinkClick("profile")}
                              >
                                  Profile
                              </a>
                          </li>
            
                            )}
                            
                        </ul>

                        {/* Search Form */}
                        <form className="d-flex flex-column w-100 mx-3 flex-sm-row mt-lg-0">
                            <input
                                className="form-control w-100"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                            />
                            <button
                                className="btn btn-outline-light ms-sm-2 mt-2 mt-sm-0 me-lg-5"
                                style={{ backgroundColor: "#9A635B" }}
                                type="submit"
                            >
                                Search
                            </button>
                        </form>

                        {/* Login & Register Buttons */}
                        {!hidelogin && (
                            <div className="d-flex flex-column flex-sm-row align-items-center mt-3 mt-lg-0">
                                <button
                                    className="btn btn-link me-0 me-sm-1 mb-2 mb-sm-0"
                                    data-bs-toggle="modal"
                                    data-bs-target="#loginModal"
                                >
                                    Login
                                </button>

                                <button
                                    className="btn btn-link"
                                    data-bs-toggle="modal"
                                    data-bs-target="#registerModal"
                                >
                                    Register
                                </button>
                            </div>
                        )}

                        {!hideitemUser && ( <div className="d-flex flex-column align-items-center fw-bold">
                                    <i className="fas fa-user-circle fa-2x mb-2"></i> 
                                    <span>{name ? name.split(' ')[0]: "Guest"}</span>
                                  </div>)}

                        {!hidelogout && (

                           <button
                           className="btn btn-link btn-sm ms-3" 
                           onClick={handleLogout}
                           >
                           <i className="fa-solid fa-right-from-bracket" style={{fontSize: "30px" }}></i>
                           logout
                           </button>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
 
export default LocalNavHeader;


