import React, { useContext } from "react";
import './Header.css'
import {Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthContext } from "../contexts/auth";

export default (props) => {

    const {logout} = useContext(AuthContext)

    const handleLogout = () => {
        logout()
    }

    return (
        <header className="header">
            <h1>{props.title}</h1>
            <Button variant="warning" className="button-logout" onClick={handleLogout}>Logout</Button>
        </header>
    )
}