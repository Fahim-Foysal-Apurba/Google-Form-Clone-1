import { useState } from "react";
import formLogo from './image/form.png';
import GetUsers from "./components/GetUsers";

const LocalPage = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here (e.g., API call)
    console.log('Logged in with', username, password);
    // Close the modal after submission
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div className="container-fluid">
          {/* Brand Logo */}
          <a className="navbar-brand text-white fs-2" style={{ fontFamily: "'Times New Roman'" }} href="#">
            <img src={formLogo} alt="logo" width="60" height="auto" className="d-inline-block align-text-top" />
            FFA Form
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
              <li className="nav-item">
                <a
                  className={`nav-link ${activeLink === 'home' ? 'active' : ''}`}
                  href="#"
                  onClick={() => handleLinkClick('home')}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${activeLink === 'about' ? 'active' : ''}`}
                  href="#"
                  onClick={() => handleLinkClick('about')}
                >
                  About
                </a>
              </li>
            </ul>

            {/* Search Form */}
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-light" type="submit">Search</button>
            </form>

            {/* Login & Register Buttons */}
            <div className="d-flex ms-lg-3">
              <button className="btn btn-outline-light me-2" data-bs-toggle="modal" data-bs-target="#loginModal">Login</button>
              <button className="btn btn-outline-light">Register</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Body */}
      <div className="container mt-5 pt-5 bg-light" style={{ minHeight: '100vh', paddingTop: '4rem' }}>
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
            {/* Form Card */}
            <div className="card shadow-lg rounded">
              <div className="card-header bg-primary text-white text-center">
                <h4>{activeLink === 'home' ? 'Home Form' : 'About Section'}</h4>
              </div>
              <div className="card-body">
                {activeLink === 'home' && (
                  <form>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Name</label>
                      <input type="text" className="form-control" id="name" placeholder="Enter your name" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="message" className="form-label">Message</label>
                      <textarea className="form-control" id="message" rows="3" placeholder="Enter your message"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Submit</button>
                  </form>
                )}
                {activeLink === 'about' && <GetUsers />}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">Login</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleLoginSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalPage;

