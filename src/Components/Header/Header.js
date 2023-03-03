import React from "react";
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ml-auto">
                        <Link to={"/workspaces"} className="nav-item nav-link">Workspaces</Link>
                        <Link to={"/boards"} className="nav-item nav-link">Boards</Link>
                        <Link to={"/columns"} className="nav-item nav-link">Columns</Link>
                        <Link to={"/tasks"} className="nav-item nav-link">Tasks</Link>
                        <Link to={"/users"} className="nav-item nav-link">Users</Link>
                        <Link to={"/comments"} className="nav-item nav-link">Comments</Link>
                    </div>
                    <div className="navbar-nav ms-auto">
                        {localStorage.getItem('token') == null
                        && <Link to={"/login"} className="nav-item nav-link">Log in</Link>
                        }
                        {localStorage.getItem('token') == null
                        &&
                        <Link to={"/register"} className="nav-item nav-link">Register</Link>
                        }
                        {localStorage.getItem('token') != null
                        && <Link to={"/me"} className="nav-item nav-link">My account</Link>
                        }

                    </div>
                </div>
            </nav>
        </header>
    )
};

export default Header;
