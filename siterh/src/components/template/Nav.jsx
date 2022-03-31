import React from "react";
import './Nav.css'
import { Link } from "react-router-dom";

export default () => (
    <aside className="menu-area">
        <nav className="menu">
            <Link to='/'>
                Início
            </Link>
            <Link to='/pedidos'>
                Agendar
            </Link>
            <Link to='/listagem'>
                Listar
            </Link>
        </nav>
    </aside>
)