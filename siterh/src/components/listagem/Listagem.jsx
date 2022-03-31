import React, {Component} from "react"
import './Listagem.css'
import axios from "axios"
import Main from "../template/Main"


export default class Listagem extends Component {


    renderTable() {
        return (
            <div>Listagem</div>
        )
    }

    render() {
        return (
            <Main title="Listagem dos Pedidos">
                {this.renderTable()}
            </Main>
        )
    }

}