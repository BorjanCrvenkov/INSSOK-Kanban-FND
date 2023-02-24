import React from "react";
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <nav>
                <div>
                    <ul className="navbar-nav mr-auto">
                        <li>
                            <Link to={"/login"}>Log in</Link>
                        </li>
                        <li>
                            <Link to={"/register"}>Register</Link>
                        </li>
                        <li>
                            <Link to={"/workspaces"}>Workspaces</Link>
                        </li>
                        <li>
                            <Link to={"/boards"}>Boards</Link>
                        </li>
                        <li>
                            <Link to={"/columns"}>Columns</Link>
                        </li>
                        <li>
                            <Link to={"/users"}>Users</Link>
                        </li>
                        <li>
                            <Link to={"/me"}>My account</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
};

export default Header;