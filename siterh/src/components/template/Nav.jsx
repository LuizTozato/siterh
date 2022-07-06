import React from "react";
import './Nav.css'
import { Link } from "react-router-dom";

export default () => (
    <aside className="menu-area">
        <nav className="menu">
            <Link to='/' className="link-always-on">
                Início
            </Link>
            <Link to='/listagem' className="link-always-on">
                Listar
            </Link>
            <Link to='/pedidos' className="link-always-on">
                Agendar
            </Link>
            <Link to='/charts' className="link-always-on">
                Estatísticas
            </Link>
        </nav>
    </aside>
)