import React, {Component, useState} from "react"
import './Listagem.css'
import axios from "axios"
import Main from "../template/Main"
import dialog from "../template/Display"

const initialState = {
    list: [],
    confirmando: false,
    id_pedido: 0
}

export default class Listagem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ...initialState
        }

        this.confirmaExclusao = this.confirmaExclusao.bind(this)
    }

    componentDidMount() {
        axios.get('/pedidos/pedido').then(resp => {
            this.setState({ list: resp.data })
        })
        
    }

    editarClickEvent(event){
        let id_pedido = event.target.parentNode.parentNode.children[0].innerHTML
        console.log(id_pedido) 
        console.log(typeof(id_pedido)) //sempre armazenado como string. precisa parsear
 
        localStorage.setItem("id_pedido", id_pedido)
        
        window.location.href = "/atualizar"

    }

    deleteClickEvent(event) {
        this.setState({confirmando: true})
        this.setState({id_pedido: event.target.parentNode.parentNode.children[0].innerHTML})
    }

    confirmaExclusao(escolha) {
        if(escolha){
            axios.delete('/pedidos/pedido/' + this.state.id_pedido).then(response => {
                window.location.reload()
            })
        }

        this.setState({confirmando: false})
    }

    renderTable() {
        return (
            <table className="tabelaPedidos">
                <thead>
                    <tr>
                        <th>id_pedido</th>
                        <th>id_servidor</th>
                        <th>email_solicitante</th>
                        <th>tipo</th>
                        <th>data_inicial</th>
                        <th>data_final</th>
                        <th>abono</th>
                        <th>decimo_terceiro</th>
                        <th>ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map( pedido => {
            return (
                <tr key={pedido.id_pedido} id="id_servidor">
                    <td>{pedido.id_pedido}</td>
                    <td>{pedido.id_servidor}</td>
                    <td>{pedido.email_solicitante}</td>
                    <td>{pedido.tipo}</td>
                    <td>{pedido.data_inicial}</td>
                    <td>{pedido.data_final}</td>
                    <td>{pedido.abono}</td>
                    <td>{pedido.decimo_terceiro}</td>
                    <td>
                        <button onClick={e => this.editarClickEvent(e)}>Editar</button>
                        <button onClick={e => this.deleteClickEvent(e)}>Excluir</button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main title="Listagem dos Pedidos">
                {this.renderTable()}
                {this.state.confirmando && dialog("Está certo da exclusão?",this.confirmaExclusao)}
            </Main>
        )
    }

}