import React, {useContext} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const Navbar = () => {

    const history = useNavigate()
    const auth = useContext(AuthContext)

    const logoutHandler = event =>{ //изменяем на event, чтобы ссылка не обрабатывалась
        event.preventDefault()
        auth.logout()
        history('/')
    }

    return(<nav>
        <div className="nav-wrapper">
            <a href="/" className="brand-logo right">Web</a>
            <ul id="nav-mobile" className="left hide-on-med-and-down">
                <li><NavLink to="/home">Home</NavLink></li>
                <li><NavLink to="/bdindex">Components</NavLink></li>
                <li><a href="/" onClick={logoutHandler}>Logout</a></li>
            </ul>
        </div>
    </nav>)

}