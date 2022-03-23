import React from "react";
import './Header.css'

export default (props) => (
    <header className="header">
        <h1>{props.title}</h1>
    </header>
)