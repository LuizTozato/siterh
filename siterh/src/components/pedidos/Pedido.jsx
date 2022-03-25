import React, {Component} from "react"
import './Pedido.css'
import axios from 'axios' //biblioteca http
import Main from "../template/Main"

const baseUrl = '/pedidos'

const initialState = {
    pedido: {
        id: '', id_servidor: '', emailDoSolicitante: '', ano: '', mes: '', diretoria: '', regional: '',
        local: '', cargo: '', codigo: '', tipo: '', nome: '', primeiroDia: '',
        ultimoDia: '', dias: '', decimoTerceiro: '', abono: ''
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

        axios[method](url, pedido ).then(response => {
            console.log(response)
        })
        
    }

    updateField(event) {
        const pedido = {...this.state.pedido} //clonando. Depois vou upá-lo
        pedido[event.target.name] = event.target.value
        this.setState({pedido})
    }

    // JSX ================
    renderForm() {
        //JSX que renderizará o formulário
        return (
            <form className="formulario">
                <label>E-mail do Solicitante</label>
                <input type="email"
                       name="emailDoSolicitante"
                       value={this.state.pedido.emailDoSolicitante}
                       onChange={e => this.updateField(e)}
                       placeholder="Digite o e-mail">
                </input>
                <br/>
                <label>Selecione o nome</label>
                <select name="id_servidor"
                        value={this.state.pedido.id_servidor}
                        onChange={e => this.updateField(e)}>
                    <option key="0" value="">{this.state.servidores ? "Selecione..." : "Carregando..."}</option>
                    {
                        this.state.servidores?.map(({id, nome}) => <option key={id} value={id}>{nome}</option>)
                    }
                </select>
                <br/>
                <label>Tipo de solicitação</label>
                <select name="tipo"
                        value={this.state.pedido.tipo}
                        onChange={e => this.updateField(e)}>
                    <option key="0" value="">Selecione...</option>
                    <option value="f">Férias Regulamentar</option>
                    <option value="fp">Férias Prêmio</option>
                    <option value="fc">Férias Crédito</option>
                    <option value="bh">Banco de Horas</option>
                </select>
                <br/>
                <label>Data Inicial</label>
                <input type="date"
                       name="primeiroDia"
                       value={this.state.pedido.primeiroDia}
                       onChange={e => this.updateField(e)}>
                </input>
                <br/>
                <label>Abono Pecuniário</label>
                <div className="radio"
                     name="abono"
                     value={this.state.pedido.abono}
                     onChange={e => this.updateField(e)}>
                    <input type="radio" name="abono" value="Sim"/>Sim
                    <input type="radio" name="abono" value="Não"/>Não
                </div>
                <br/>
                <label>Décimo Terceiro</label>
                <div className="radio"
                     name="decimoTerceiro"
                     value={this.state.pedido.decimoTerceiro}
                     onChange={e => this.updateField(e)}>
                    <input type="radio" name="decimoTerceiro" value="Sim"/>Sim
                    <input type="radio" name="decimoTerceiro" value="Não"/>Não
                </div>
                <br/>
                <label>Dias Gozo</label>
                <div className="radio"
                     name="dias"
                     value={this.state.pedido.dias}
                     onChange={e => this.updateField(e)}>
                    <input type="radio" name="diasGozo" value="10"/>10
                    <input type="radio" name="diasGozo" value="20"/>20
                    <input type="radio" name="diasGozo" value="30"/>30
                </div>
                <br/>
                <hr/>
                <br/>
                <div className="botoes">
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
