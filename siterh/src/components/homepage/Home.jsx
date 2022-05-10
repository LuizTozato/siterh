import React, { Component , useContext, useState } from "react";
import './Home.css'
import { AuthContext } from "../contexts/auth";
import Main from "../template/Main";
import axios from "axios";
import {Button, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


const Home = () => {

    const [login, setLogin] = useState("")
    const [senha, setSenha] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        await axios.put('/credenciais/token', {login, senha} ).then(resp => {
            const token = resp.data
            if(!!token){
                localStorage.setItem("token",token)
            } else {
                localStorage.clear()
            }
        })

    }


    //===== JSX =================
    function renderForm() {
        return(
            <div className="div-root-home">
                <h6 className="mb-4">Faça o login para começar!</h6>

                <Form className="ps-3 form">
                    <Form.Label>Login</Form.Label>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            name="login"
                            value={login}
                            onChange={e => setLogin(e.target.value)}
                            placeholder="Digite o seu login"/>
                    </Form.Group>

                    <Form.Label>Senha</Form.Label>
                    <Form.Group className="mb-5">
                        <Form.Control
                            type="password"
                            name="senha"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                            placeholder="Digite a sua senha."/>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                            <Button variant="primary" 
                                onClick={e => handleSubmit(e)}>
                                Entrar
                            </Button>
                    </Form.Group>

                </Form>
            </div>
        )
    }

    return (
        <Main title="Home!">
            <h1>Bem vindo à homepage!</h1>
            <hr/>
            {renderForm()}
        </Main>
    )    

}

export default Home