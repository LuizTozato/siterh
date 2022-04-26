import React, {Component} from "react"
import './Listagem.css'
import axios from "axios"
import Main from "../template/Main"
import Dialog from "../template/Dialog"

const initialState = {
    list: [],
    dialog: null
}

export default class Listagem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ...initialState
        }
    }

    componentDidMount() {
        axios.get('/pedidos/pedido').then(resp => {
            this.setState({list: resp.data})
        })
    }

    openDialog(message, callback, config) {
        this.setState({dialog: Dialog(message, callback, config)})
    }

    closeDialog() {
        this.setState({dialog: null})
    }

    editarClickEvent(id_pedido) {
        window.location.href = "/atualizar/" + id_pedido
    }

    deleteClickEvent(id_pedido) {
        this.openDialog("Está certo da exclusão?", (confirmado) => {
            this.closeDialog()
            if (confirmado) {
                this.confirmaExclusao(id_pedido)
            }
        }, {confirm: true})
    }

    confirmaExclusao(id_pedido) {
        axios.delete('/pedidos/pedido/' + id_pedido)
            .then(() => {
                this.setState({list: this.state.list.filter(p => p.id_pedido !== id_pedido)})
            })
            .catch(() => {
                this.openDialog("Erro ao excluir pedido!", () => this.closeDialog())
            })
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
        return this.state.list.map(pedido => {
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
                        <button onClick={() => this.editarClickEvent(pedido.id_pedido)}>Editar</button>
                        <button onClick={() => this.deleteClickEvent(pedido.id_pedido)}>Excluir</button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main title="Listagem dos Pedidos">
                {this.renderTable()}
                {this.state.dialog}
            </Main>
        )
    }

}
