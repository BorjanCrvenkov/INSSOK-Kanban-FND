import React from "react";
import {Link} from 'react-router-dom';

const Header = () => {
    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-light" style={{ background: "linear-gradient(to right, #994ECC, #3E187A)" }}>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            {localStorage.getItem('token') != null && (
              <div className="navbar-nav ml-auto">
                <Link to={"/workspaces"} className="nav-item nav-link" style={{ color: '#ffffff' }}>Workspaces</Link>
                {localStorage.getItem('is_admin_role') && (
                  <Link to={"/users"} className="nav-item nav-link" style={{ color: '#ffffff' }}>Users</Link>
                )}
                {localStorage.getItem('is_admin_role') && (
                  <Link to={"/roles"} className="nav-item nav-link" style={{ color: '#ffffff' }}>Roles</Link>
                )}
              </div>
            )}
            <div className="navbar-nav ms-auto">
              {localStorage.getItem('token') == null && (
                <Link to={"/login"} className="nav-item nav-link" style={{ color: '#ffffff' }}>Log in</Link>
              )}
              {localStorage.getItem('token') == null && (
                <Link to={"/register"} className="nav-item nav-link" style={{ color: '#ffffff' }}>Register</Link>
              )}
              {localStorage.getItem('token') != null && (
                <Link to={"/me"} className="nav-item nav-link" style={{ color: '#ffffff' }}>My account</Link>
              )}
              {localStorage.getItem('token') != null && (
                <Link to={"/logout"} className="nav-item nav-link" style={{ color: '#ffffff' }}>Logout</Link>
              )}
            </div>
          </div>
        </nav>
        <br></br>
      </header>

    );
  };
  

export default Header;
