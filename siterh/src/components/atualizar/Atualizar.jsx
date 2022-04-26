import React, {Component} from "react"
import './Atualizar.css'
import axios from "axios"
import Main from "../template/Main"

const initialState = {
    pedido: {
        id_pedido: '',
        id_servidor: '',
        email_solicitante: '',
        tipo: '',
        data_inicial: '',
        data_final: '',
        dias_gozo: 0,
        abono: false,
        decimo_terceiro: false
    }
}

export default class Atualizar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ...initialState
        }

        this.state.pedido.id_pedido = props.params.id_pedido
    }

    componentDidMount(){
        axios.get('/pedidos/pedido/' + this.state.pedido.id_pedido).then(response => {
            this.setState({pedido: { ...response.data}})
            console.log(this.state)

            const diasGozo = this.getDaysBetween(this.state.pedido.data_inicial, this.state.pedido.data_final)
            this.setPedido({dias_gozo: diasGozo})
        })
    }

    getDaysBetween(startDate, finalDate) {
        let start_date = new Date(startDate)
        let final_date = new Date(finalDate)
        const days = (final_date.getTime() - start_date.getTime()) / (86400000)
        return days
    }

    setPedido(state) {
        this.setState({pedido: {...this.state.pedido, ...state}})
    }

    cancelar(e){
        window.location.href = "/listagem"
    }

    salvar(e) {
        e.preventDefault()

        const pedido = this.state.pedido
        const validacao = this.sanearInput()

        if(validacao.boolean) {

            const url = "/pedidos/pedido/" + this.state.pedido.id_pedido

            axios.put(url, pedido).then(response => {
                this.setTextoAviso("Pedido atualizado com sucesso!", validacao.cor)
            })
        } else {
            this.setTextoAviso(validacao.texto, validacao.cor)
        }

    }

    sanearInput() {
        let boolean = true
        let texto = ''
        let cor = "red"

        if(this.state.pedido.email_solicitante === ''){
            boolean = false
            texto = "Digite o seu endereço de e-mail!"
        }
        else if(this.state.pedido.tipo === ''){
            boolean = false
            texto = "Selecione o tipo de solicitação!"
        }
        else if(this.state.pedido.data_inicial === ''){
            boolean = false
            texto = "Selecione a data inicial de férias!"
        }
        else if(this.state.pedido.dias_gozo === 0){
            boolean = false
            texto = "Selecione o número de dias de férias que irá se ausentar!"
        }
        else {
            cor = "green"
        }

        console.log("Boolean saneamento: " + boolean)
        console.log("Texto saneamento: " + texto)
        return {boolean, texto, cor}
    }

    setTextoAviso(texto, color = "black") {
        const textoHtml = document.getElementById("textoResposta")
        textoHtml.innerHTML = texto
        textoHtml.style.color = color
    }

    //== JSX ==
    renderForm() {
        //JSX que renderizará o formulário
        return (
            <form className="form-atualizar">
                <div className="row">
                    <label>E-mail do Solicitante</label>
                    <input
                        type="email"
                        name="email_solicitante"
                        value={this.state.pedido.email_solicitante}
                        onChange={e => this.setPedido({email_solicitante: e.target.value})}
                        placeholder="Digite o e-mail">
                    </input>
                </div>
                <div className="row">
                    <label>Servidor: {this.state.pedido.id_servidor}</label>
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
                        onClick={e => this.cancelar(e)}>
                        Cancelar
                    </button>
                </div>

                <h4 id="textoResposta"></h4>
            </form>
        )
    }

    render() {
        return (
            <Main title="Edição dos Pedidos">
                {this.renderForm()}
            </Main>
        )
    }
}
