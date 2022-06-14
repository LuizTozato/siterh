import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import './Home.css'
import { AuthContext } from "../contexts/auth";
import Main from "../template/Main";
import {Button, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const md5 = require('md5')

const Home = () => {

    const { authenticated, login } = useContext(AuthContext)

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        login(md5(email), md5(senha))
    }

    function keyPress(tecla){

        if(tecla === "Enter"){

            login(md5(email), md5(senha)).then(

                function(value){
                    console.log("value(sucess): " + value)
                    setTextoAviso("Autenticação concluída!","green")
                    //setTimeout(()=>{console.log("DELAY 1S")},1000)
                    navigate("/listagem")
                    
                },

                function(error){
                    console.log("error: " + error)
                    setTextoAviso("E-mail ou Senha incorretos...","red")
                }
            )
        
        } else {
            setTextoAviso("")
        }
    }

    function setTextoAviso(texto, color = "black") {
        const textoHtml = document.getElementById("textoAlerta")
        textoHtml.innerHTML = texto
        textoHtml.style.color = color
    }


    //===== JSX =================
    function renderForm() {
        return(
            <div className="div-root-home">
                <h6 className="mb-4">Faça o email para começar!</h6>
                <p>Autenticador: {String(authenticated)}</p>

                <Form className="ps-3 form">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="email"
                            name="email"
                            value={email}
                            onKeyDown={(eventoClique) => keyPress(eventoClique.key) }
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Digite o seu email"/>
                    </Form.Group>

                    <Form.Label>Senha</Form.Label>
                    <Form.Group className="mb-5">
                        <Form.Control
                            type="password"
                            name="senha"
                            value={senha}
                            onKeyDown={(eventoClique) => keyPress(eventoClique.key) }
                            onChange={e => setSenha(e.target.value)}
                            placeholder="Digite a sua senha."/>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                            <Button variant="primary" 
                                onClick={e => handleSubmit(e)}>
                                Entrar
                            </Button>
                    </Form.Group>

                    <p id="textoAlerta"></p>

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