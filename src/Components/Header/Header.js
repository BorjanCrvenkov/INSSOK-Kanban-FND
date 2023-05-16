import React from "react";
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    {localStorage.getItem('token') != null && <div className="navbar-nav ml-auto">
                        <Link to={"/workspaces"} className="nav-item nav-link">Workspaces</Link>
                        {localStorage.getItem('is_admin_role')
                        && <Link to={"/users"} className="nav-item nav-link">Users</Link>
                        }
                        {localStorage.getItem('is_admin_role')
                        && <Link to={"/roles"} className="nav-item nav-link">Roles</Link>
                        }
                    </div>}
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
                        {localStorage.getItem('token') != null
                        && <Link to={"/logout"} className="nav-item nav-link">Logout</Link>
                        }
                    </div>
                </div>
            </nav>
        </header>
    )
};

export default Header;
