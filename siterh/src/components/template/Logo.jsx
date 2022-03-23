import React from "react";
import './Logo.css'
import { Link } from "react-router-dom";
import logo from '../../assets/imgs/logo.jpg'

export default () => (
    <aside>
        <Link to="/" className="logo">
            <img src={logo} alt="logo"/>
        </Link>
    </aside>
)