import React, {Component} from "react"
import './Atualizar.css'
import axios from "axios"
import Main from "../template/Main"
import { Button, Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'

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
        e.preventDefault()
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
            <div>
                <div className="div-root-atualizar">
                    <Form>
                        <Form.Label>E-mail do Solicitante</Form.Label>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="email"
                                name="email_solicitante"
                                value={this.state.pedido.email_solicitante}
                                onChange={e => this.setPedido({email_solicitante: e.target.value})}
                                placeholder="Digite o e-mail">
                            </Form.Control>
                        </Form.Group>

                        <Form.Label>Servidor: {this.state.pedido.id_servidor}</Form.Label>
                        <br/>

                        <Form.Label>Tipo de Solicitação</Form.Label>
                        <Form.Group className="mb-3">
                            <Form.Select 
                                    name="tipo"
                                    value={this.state.pedido.tipo}
                                    onChange={e => this.setPedido({tipo: e.target.value})}>
                                <option key="0" value="">Selecione...</option>
                                <option value="f">Férias Regulamentar</option>
                                <option value="fp">Férias Prêmio</option>
                                <option value="fc">Férias Crédito</option>
                                <option value="bh">Banco de Horas</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Label>Data Inicial</Form.Label>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="date"
                                name="data_inicial"
                                value={this.state.pedido.data_inicial}
                                onChange={e => this.setPedido({data_inicial: e.target.value})}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Label>Abono Pecuniário</Form.Label>
                        <Form.Group className="mb-3">
                            <Form.Check
                                inline
                                type="radio"
                                name="abono"
                                checked={this.state.pedido.abono}
                                onChange={() => this.setPedido({abono: true})}
                                label="Sim">
                            </Form.Check>
                            <Form.Check
                                inline
                                type="radio"
                                name="abono"
                                checked={!this.state.pedido.abono}
                                onChange={() => this.setPedido({abono: false})}
                                label="Não">
                            </Form.Check>
                        </Form.Group>                        

                        <Form.Label>50% do 13º salário</Form.Label>
                        <Form.Group className="mb-3">
                            <Form.Check
                                inline
                                type="radio"
                                name="decimo_terceiro"
                                checked={this.state.pedido.decimo_terceiro}
                                onChange={() => this.setPedido({decimo_terceiro: true})}
                                label="Sim">
                            </Form.Check>
                            <Form.Check
                                inline
                                type="radio"
                                name="decimo_terceiro"
                                checked={!this.state.pedido.decimo_terceiro}
                                onChange={() => this.setPedido({decimo_terceiro: false})}
                                label="Não">
                            </Form.Check>
                        </Form.Group>

                        <Form.Label>Dias Gozo</Form.Label>
                        <Form.Group className="mb-5">
                            <Form.Check
                                inline
                                type="radio"
                                name="dias_gozo"
                                checked={this.state.pedido.dias_gozo === 10}
                                onChange={() => this.setPedido({dias_gozo: 10})}
                                label="10">
                            </Form.Check>
                            <Form.Check
                                inline
                                type="radio"
                                name="dias_gozo"
                                checked={this.state.pedido.dias_gozo === 20}
                                onChange={() => this.setPedido({dias_gozo: 20})}
                                label="20">
                            </Form.Check>
                            <Form.Check
                                inline
                                type="radio"
                                name="dias_gozo"
                                checked={this.state.pedido.dias_gozo === 30}
                                onChange={() => this.setPedido({dias_gozo: 30})}
                                label="30">
                            </Form.Check>
                        </Form.Group>                        

                        <Form.Group className="mb-3">
                            <Button 
                                    variant="primary"
                                    onClick={e => this.salvar(e)}>
                                Salvar
                            </Button>{' '}
                            <Button 
                                    variant="secondary"
                                    onClick={e => this.cancelar(e)}>
                                Cancelar
                            </Button>
                        </Form.Group>

                    </Form>
                </div>
                <h4 id="textoResposta"></h4>
            </div>
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
