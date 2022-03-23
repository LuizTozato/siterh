import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'

import Logo from '../components/template/Logo'
import Nav from '../components/template/Nav'
import Routes from './Routes'
import Footer from '../components/template/Footer'

export default props => 
    <BrowserRouter>
        <div className="app">
            <Logo/>
            <Nav/>
            <Routes/>
            <Footer/>
        </div>
    </BrowserRouter>