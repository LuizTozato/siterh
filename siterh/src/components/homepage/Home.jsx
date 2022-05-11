import React, { useContext, useState } from "react";
import './Home.css'
import { AuthContext } from "../contexts/auth";
import Main from "../template/Main";
import {Button, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


const Home = () => {

    const { authenticated, login } = useContext(AuthContext)

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        login(email, senha)

    }


    //===== JSX =================
    function renderForm() {
        return(
            <div className="div-root-home">
                <h6 className="mb-4">Faça o email para começar!</h6>
                <p>{String(authenticated)}</p>

                <Form className="ps-3 form">
                    <Form.Label>email</Form.Label>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="email"
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Digite o seu email"/>
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