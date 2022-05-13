import React, { useContext } from "react"
import { Routes, Route, useParams, Navigate } from "react-router-dom"

import Home from '../components/homepage/Home'
import Pedido from "../components/pedidos/Pedido"
import Listagem from "../components/listagem/Listagem"
import Atualizar from "../components/atualizar/Atualizar"
import { AuthContext, AuthProvider } from "../components/contexts/auth"


export default () => {
    
    //Aqui vou definir o que é o Private para usar nas rotas privadas
    const Private = ({children}) => {
        
        const {authenticated, loading} = useContext(AuthContext)

        if(loading){
            return <div className="loading">Carregando</div>
        }

        if(!authenticated){
            return <Navigate to="/" />
        }

        return children

    }
    
    const WithParams = ({Component, ...props}) => <Component params={useParams()} {...props}/>

    return(
        <AuthProvider>
            <Routes>
                    <Route exact path='/' element={<Home/>}/>
                    <Route exact path='/listagem' element={<Private><Listagem/></Private>}/>
                    <Route exact path='/pedidos' element={<Private><Pedido/></Private>}/>
                    <Route exact path='/atualizar/:id_pedido' element={<Private><WithParams Component={Atualizar}/></Private>}/>
            </Routes>
        </AuthProvider>
    )
}