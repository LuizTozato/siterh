import React from "react"
import { Routes, Route } from "react-router-dom"

import Home from '../components/homepage/Home'
import Pedido from "../components/pedidos/Pedido"
import Listagem from "../components/listagem/Listagem"
import Atualizar from "../components/atualizar/Atualizar"

export default (props) => (
    <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/listagem' element={<Listagem/>}/>
        <Route exact path='/pedidos' element={<Pedido/>}/>
        <Route exact path='/atualizar' element={<Atualizar/>}/>
    </Routes>
)