import formLogo from '../image/form.png'; 
import { useNavigate } from 'react-router-dom';

const LocalNavHeader = ({ activeLink, setActiveLink, hideitem1, hideitem2, hideitem3, hidelogin, hidelogout }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:5000/logout', {
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
                style={{ backgroundColor: "#C4B1AE" }}
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
                                    className={`nav-link ${activeLink === "home" ? "active" : ""}`}
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
                                        className={`nav-link ${activeLink === "about" ? "active" : ""}`}
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
                                        className={`nav-link ${activeLink === "users" ? "active" : ""}`}
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
                                  className={`nav-link ${activeLink === "profile" ? "active" : ""}`}
                                  style={{ fontFamily: "'Times New Roman'", fontSize: 22 }}
                                  onClick={() => handleLinkClick("profile")}
                              >
                                  Profile
                              </a>
                          </li>
            
                            )}
                            
                        </ul>

                        {/* Search Form */}
                        <form className="d-flex w-75 flex-column flex-sm-row mt-lg-0">
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
                                    className="btn btn-outline-light me-0 me-sm-2 mb-2 mb-sm-0"
                                    data-bs-toggle="modal"
                                    data-bs-target="#loginModal"
                                >
                                    Login
                                </button>

                                <button
                                    className="btn btn-outline-light"
                                    data-bs-toggle="modal"
                                    data-bs-target="#registerModal"
                                >
                                    Register
                                </button>
                            </div>
                        )}

                        {/* Logout Button */}
                        {!hidelogout && (
                            <button
                                className="btn btn-outline-light"
                                // Removed data-bs-toggle and data-bs-target to avoid Bootstrap modal issues
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
 
export default LocalNavHeader;


