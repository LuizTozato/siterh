import React, {Component} from "react"
import './Pedido.css'
import axios from 'axios' //biblioteca http
import Main from "../template/Main"

const baseUrl = '/pedidos'

const initialState = {
    pedido: {
        id: '',
        id_servidor: '',
        email_solicitante: '',
        tipo: '',
        data_inicial: '',
        dias_gozo: 0,
        decimo_terceiro: false,
        abono: false
    },
    listPedidos: [],
    servidores: null
}

export default class Pedido extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ...initialState
        }
    }

    // FUNCTIONS ============

    componentDidMount() {
        this.fetchServidores()
    }

    fetchServidores() {
        axios.get(baseUrl + "/servidores").then(response => {
            const servidores = response.data
            console.log(servidores)
            this.setState({servidores})
        })
    }

    clear() {
        this.setState({...initialState})
    }

    salvar(e) {
        e.preventDefault()

        const pedido = this.state.pedido

        const method = pedido.id ? 'put' : 'post'
        const url = pedido.id ? `${baseUrl}/pedido/${pedido.id}` : `${baseUrl}/pedido`

        console.log("pedido: ")
        console.log(pedido)
        console.log("metodo: " + method)
        console.log("url: " + url)

        axios[method](url, pedido).then(response => {
            console.log(response)
        })

    }

    setPedido(state) {
        this.setState({pedido: {...this.state.pedido, ...state}})
    }

    // JSX ================
    renderForm() {
        //JSX que renderizará o formulário
        return (
            <form className="form">
                <div className="row">
                    <label>E-mail do Solicitante</label>
                    <input type="email"
                           name="email_solicitante"
                           value={this.state.pedido.email_solicitante}
                           onChange={e => this.setPedido({email_solicitante: e.target.value})}
                           placeholder="Digite o e-mail">
                    </input>
                </div>
                <div className="row">
                    <label>Selecione o nome</label>
                    <select name="id_servidor"
                            value={this.state.pedido.id_servidor}
                            onChange={e => this.setPedido({id_servidor: e.target.value})}>
                        <option key="0" value="">{this.state.servidores ? "Selecione..." : "Carregando..."}</option>
                        {
                            this.state.servidores?.map(({id, nome}) => <option key={id} value={id}>{nome}</option>)
                        }
                    </select>
                </div>
                <div className="row">
                    <label>Tipo de solicitação</label>
                    <select name="tipo"
                            value={this.state.pedido.tipo}
                            onChange={e => this.setPedido({tipo: e.target.value})}>
                        <option key="0" value="">Selecione...</option>
                        <option value="f">Férias Regulamentar</option>
                        <option value="fp">Férias Prêmio</option>
                        <option value="fc">Férias Crédito</option>
                        <option value="bh">Banco de Horas</option>
                    </select>
                </div>
                <div className="row">
                    <label>Data Inicial</label>
                    <input type="date"
                           name="data_inicial"
                           value={this.state.pedido.data_inicial}
                           onChange={e => this.setPedido({data_inicial: e.target.value})}>
                    </input>
                </div>
                <div className="row">
                    <label>Abono Pecuniário</label>
                    <div className="radio_group">
                        <label>
                            <input type="radio"
                                   name="abono"
                                   checked={this.state.pedido.abono}
                                   onChange={() => this.setPedido({abono: true})}
                            /> Sim
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="abono"
                                checked={!this.state.pedido.abono}
                                onChange={() => this.setPedido({abono: false})}
                            /> Não
                        </label>
                    </div>
                </div>
                <div className="row">
                    <label>Décimo Terceiro</label>
                    <div className="radio_group">
                        <label>
                            <input type="radio"
                                   name="decimo_terceiro"
                                   checked={this.state.pedido.decimo_terceiro}
                                   onChange={() => this.setPedido({decimo_terceiro: true})}
                            /> Sim
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="decimo_terceiro"
                                checked={!this.state.pedido.decimo_terceiro}
                                onChange={() => this.setPedido({decimo_terceiro: false})}
                            /> Não
                        </label>
                    </div>
                </div>
                <div className="row">
                    <label>Dias Gozo</label>
                    <div className="radio_group">
                        <label>
                            <input type="radio"
                                   name="dias_gozo"
                                   checked={this.state.pedido.dias_gozo === 10}
                                   onChange={() => this.setPedido({dias_gozo: 10})}
                            /> 10
                        </label>
                        <label>
                            <input type="radio"
                                   name="dias_gozo"
                                   checked={this.state.pedido.dias_gozo === 20}
                                   onChange={() => this.setPedido({dias_gozo: 20})}
                            /> 20
                        </label>
                        <label>
                            <input type="radio"
                                   name="dias_gozo"
                                   checked={this.state.pedido.dias_gozo === 30}
                                   onChange={() => this.setPedido({dias_gozo: 30})}
                            /> 30
                        </label>
                    </div>
                </div>
                <hr/>
                <div className="buttons">
                    <button
                        onClick={e => this.salvar(e)}>
                        Salvar
                    </button>
                    <button
                        onClick={e => this.clear(e)}>
                        Limpar
                    </button>
                </div>
            </form>
        )
    }

    render() {
        return (
            <Main title="Detalhes do Pedido!">
                {this.renderForm()}
            </Main>
        )
    }
}
