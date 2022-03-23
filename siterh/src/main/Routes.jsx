import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from '../components/homepage/Home'
import Pedido from "../components/pedidos/Pedido";

export default (props) => (
    <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/pedidos' element={<Pedido/>}/>
    </Routes>
)