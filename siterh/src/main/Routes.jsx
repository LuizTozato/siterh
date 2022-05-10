import React, { useState } from "react"
import { Routes, Route, useParams } from "react-router-dom"

import Home from '../components/homepage/Home'
import Pedido from "../components/pedidos/Pedido"
import Listagem from "../components/listagem/Listagem"
import Atualizar from "../components/atualizar/Atualizar"
import { AuthContext } from "../components/contexts/auth"

const WithParams = ({Component, ...props}) => <Component params={useParams()} {...props}/>

export default () => {
    
    return(
        <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route exact path='/listagem' element={<Listagem/>}/>
                <Route exact path='/pedidos' element={<Pedido/>}/>
                <Route exact path='/atualizar/:id_pedido' element={<WithParams Component={Atualizar} />}/>
        </Routes>
    )
}