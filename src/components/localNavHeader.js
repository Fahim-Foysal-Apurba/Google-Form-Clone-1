import formLogo from '../image/form.png';

const LocalNavHeader = ({ activeLink, setActiveLink }) => {
    

    const handleLinkClick = (link) => {
      setActiveLink(link);
    };

    return ( 

           <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{backgroundColor: "#C4B1AE"}}>
                <div className="container-fluid">
                  {/* Brand Logo */}
                  <a
                    href="/"
                    className="navbar-brand text-white fs-2"
                    style={{ fontFamily: "'Times New Roman'" }}
                  >
                    <img
                      src={formLogo}
                      alt="logo"
                      width="60"
                      height="auto"
                      className="d-inline-block align-text-top"
                    />
                    <h2 className="ms-2 d-inline-block align-text-top p-2 me-5">FFA Form</h2>
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
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item ms-5">
                        <a
                          href="#home"
                          className={`nav-link ${activeLink === 'home' ? 'active' : ''}` }
                          style={{fontFamily: "'Times New Roman'", fontSize: 22}}
                          onClick={() => handleLinkClick('home')}
                        >
                          Home
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="#about"
                          className={`nav-link ${activeLink === 'about' ? 'active' : ''}`}
                          style={{fontFamily: "'Times New Roman'", fontSize: 22}}
                          onClick={() => handleLinkClick('about')}
                        >
                          About
                        </a>
                      </li>
                    </ul>
        
                    {/* Search Form */}
                    <form className="d-flex">
                      <input
                        className="form-control"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        style={{width: "800px"}}
                      />
                      <button className="btn btn-outline-light ms-2" style={{backgroundColor: "#9A635B"}} type="submit">
                        Search
                      </button>
                    </form>
        
                    {/* Login & Register Buttons */}
                    <div className="d-flex ms-lg-3">
                      <button
                        className="btn btn-outline-light me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#loginModal">
                        Login
                      </button>

                      <button className="btn btn-outline-light"
                      data-bs-toggle="modal"
                      data-bs-target="#registerModal">
                      Register</button>
                    </div>
                  </div>
                </div>
              </nav>


     );
}
 
export default LocalNavHeader;