import React, {Component} from "react"
import './Pedido.css'
import axios from 'axios' //biblioteca http
import Main from "../template/Main"

const baseUrl = '/pedido'

const initialState = {
    pedido: { id: '', emailDoSolicitante:'', ano: '', mes:'', diretoria:'', regional:'',
        local:'', cargo:'', codigo:'', tipo:'', nome: '', primeiroDia: '', 
        ultimoDia:'', dias:'', decimoTerceiro:'', abono:''},
    listPedidos: [],
    content: ''
}

export default class Pedido extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ...initialState
        }
    }

    // FUNCTIONS ============
    /*
    componentDidMount() {
        this.fetchContent().then(response => {
            const {id, message, timestamp} = response.data
            this.setState({content: `${message} - ${timestamp}`})
            this.setState({pedido: {id: id}})
        })
    }

    fetchContent() {
        const randomID = Math.floor(Math.random() * 100)
        return axios.get(baseUrl +"/"+ randomID)
    }
    */

    clear() {
        this.setState({...initialState})
    }

    salvar(e) {
        e.preventDefault()

        const pedido = this.state.pedido
        
        const method = pedido.id ? 'put' : 'post'
        const url = pedido.id ? `${baseUrl}/${pedido.id}` : baseUrl

        console.log("pedido: ")
        console.log(pedido)
        console.log("metodo: " + method)
        console.log("url: " + url)

        //axios[method](url, pedido)
    }

    updateField(event) {
        const pedido = {...this.state.pedido} //clonando. Depois vou upá-lo
        pedido[event.target.name] = event.target.value
        this.setState({pedido})
    }

    montarPedido(){
        /*
        this.setState({
            id : '',
            emailDoSolicitante : '', //OK
            ano : '',
            mes : '',
            diretoria : '', 
            regional : '',
            local : '', 
            cargo : '',
            codigo : '',
            tipo : '',
            nome : '',
            primeiroDia : '', 
            ultimoDia : '',
            dias : '',
            decimoTerceiro : '',
            abono : '',
        })
        */        
    }

    // JSX ================
    renderForm() {
        //JSX que renderizará o formulário
        return (
            <form className="formulario">
                <h4>{this.state.content}</h4>
                <hr/><br/>
                <br/>
                <label>E-mail do Solicitante</label>
                <input type="email" 
                    name="emailDoSolicitante"
                    value={this.state.pedido.emailDoSolicitante}
                    onChange={e=>this.updateField(e)}
                    placeholder="Digite o e-mail">
                </input>
                <br/>
                <label>Selecione o nome</label>
                <select name="nome"
                    value={this.state.pedido.nome}
                    onChange={e=>this.updateField(e)}>
                    <option value="Luiz Felipe Neves Tozato">Luiz Felipe Neves Tozato</option>
                    <option value="Samanta Cássia Vertuan">Samanta Cássia Vertuan</option>
                    <option value="Franciele Baptista">Franciele Baptista</option>
                </select>
                <br/>
                <label>Tipo de solicitação</label>
                <select name="tipo"
                    value={this.state.pedido.tipo}
                    onChange={e=>this.updateField(e)}>
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
                    onChange={e=>this.updateField(e)}>
                </input>
                <br/>
                <label>Abono Pecuniário</label>
                <div className="radio"
                    name="abono"
                    value={this.state.pedido.abono}
                    onChange={e=>this.updateField(e)}>
                    <input type="radio" name="abono" value="Sim"/>Sim
                    <input type="radio" name="abono" value="Não"/>Não
                </div>
                <br/>
                <label>Décimo Terceiro</label>
                <div className="radio"
                    name="decimoTerceiro"
                    value={this.state.pedido.decimoTerceiro}
                    onChange={e=>this.updateField(e)}>                    
                    <input type="radio" name="decimoTerceiro" value="Sim"/>Sim
                    <input type="radio" name="decimoTerceiro" value="Não"/>Não
                </div>
                <br/>
                <label>Dias Gozo</label>
                <div className="radio"
                    name="dias"
                    value={this.state.pedido.dias}
                    onChange={e=>this.updateField(e)}>                     
                    <input type="radio" name="diasGozo" value="10"/>10
                    <input type="radio" name="diasGozo" value="20"/>20
                    <input type="radio" name="diasGozo" value="30"/>30
                </div>
                <br/><hr/><br/>
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
