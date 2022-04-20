import React, {Component} from "react";
import './Home.css'
import Main from "../template/Main";

const initialState = {
    credenciais: {
        login: '',
        senha: ''
    }
}

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ...initialState
        }
    }


    //===== JSX =================
    renderForm() {
        return(
            <form className="form-home">
                <p>Faça o login para começar!</p>

                <div className="row-home">
                    <label>Login</label>
                    <input
                        type="text"
                        placeholder="Digite o seu login...">
                    </input>
                </div>
                <div className="row-home">
                    <label>Senha</label>
                    <input
                        type="text"
                        placeholder="Digite o seu login...">
                    </input>
                </div>
                <button className="button-entrar">
                    Entrar
                </button>
            </form>
        )
    }

    render() {
        return (
            <Main title="Home!">
                <h1>Bem vindo à homepage!</h1>
                <hr/>
                {this.renderForm()}
            </Main>
        )
    }


}