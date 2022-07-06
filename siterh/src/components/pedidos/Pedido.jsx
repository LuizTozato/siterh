import React, {useState, useEffect} from "react"
import './Pedido.css'
import axios from 'axios' //biblioteca http
import Main from "../template/Main"
import {Button, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const baseUrl = '/pedidos'

const Pedido = () => {

    const [id, setId]                                   = useState('')
    const [idServidor, setIdServidor]                   = useState('')
    const [nome, setNome]                               = useState('')
    const [emailSolicitante, setEmailSolicitante]       = useState('')
    const [tipo, setTipo]                               = useState('')
    const [dataInicial, setDataInicial]                 = useState('')
    const [diasGozo, setDiasGozo]                       = useState(0)
    const [decimoTerceiro, setDecimoTerceiro]           = useState(false)
    const [abono, setAbono]                             = useState(false)
    const [servidores, setServidores]                   = useState(null)


    // FUNCTIONS ============
    useEffect(() => {

        fetchServidores()

    }, [])

    useEffect(() => {
        if(servidores !== null && nome !== ''){
            setIdServidor( (servidores.find(obj => obj.nome === nome)).id_servidor )
        }
    }, [nome])

    function fetchServidores() {
        axios.get(baseUrl + "/servidores").then(response => {
            const servidores = response.data
            console.log(servidores)
            setServidores(servidores)
        })
    }

    function clear() {

        setId('')
        setIdServidor('')
        setNome('')
        setEmailSolicitante('')
        setTipo('')
        setDataInicial('')
        setDiasGozo(0)
        setDecimoTerceiro(false)
        setAbono(false)
        
    }

    function salvar(e) {
        e.preventDefault()

        const pedido = {
            id,
            id_servidor: idServidor,
            nome,
            email_solicitante: emailSolicitante,
            tipo,
            data_inicial: dataInicial,
            dias_gozo: diasGozo,
            decimo_terceiro: decimoTerceiro,
            abono
        
        }

        console.log(pedido)

        const validacao = sanearInput()

        if(validacao.boolean) {

            const url = `${baseUrl}/pedido`
    
            axios.post(url, pedido).then(response => {
                console.log(response)
                setTextoAviso("Pedido enviado com sucesso!", validacao.cor)
            })
        } else {
            setTextoAviso(validacao.texto, validacao.cor)
        }
    }

    function sanearInput() {
        let boolean = true
        let texto = ''
        let cor = "red"

        if(emailSolicitante === ''){
            boolean = false
            texto = "Digite o seu endereço de e-mail!"
        }
        else if(nome === ''){
            boolean = false
            texto = "Selecione o nome do servidor!"
        }
        else if(tipo === ''){
            boolean = false
            texto = "Selecione o tipo de solicitação!"
        }
        else if(dataInicial === ''){
            boolean = false
            texto = "Selecione a data inicial de férias!"
        }
        else if(diasGozo === 0){
            boolean = false
            texto = "Selecione o número de dias de férias que irá se ausentar!"
        }
        else {
            cor = "green"
        }

        return {boolean, texto, cor}
    }

    function setTextoAviso(texto, color = "black") {
        const textoHtml = document.getElementById("textoResposta")
        textoHtml.innerHTML = texto
        textoHtml.style.color = color
    }


    // JSX ================
    function renderForm() {
        //JSX que renderizará o formulário
        return (
            <div>
                <div className="div-root-pedido">
                    
                    <Form>
                        <Form.Label>Email do solicitante</Form.Label>
                        <Form.Group className="mb-3">
                            <Form.Control                             
                                type="email"
                                name="email_solicitante"
                                value={emailSolicitante}
                                onChange={e => setEmailSolicitante(e.target.value)}
                                placeholder="solicitante@email.com"/>
                        </Form.Group>

                        <Form.Label>Selecione o nome</Form.Label>
                        <Form.Group className="mb-3">
                            <Form.Select 
                                name="id_servidor"
                                value={nome}
                                onChange={e => setNome(e.target.value)}>
                                <option key="0" value="">{servidores ? "Selecione..." : "Carregando..."}</option>
                                {
                                    servidores?.map(({id, nome}) => <option key={id} value={id}>{nome}</option>)
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Label>Tipo de Solicitação</Form.Label>
                        <Form.Group className="mb-3">
                            <Form.Select name="tipo"
                                    value={tipo}
                                    onChange={e => setTipo(e.target.value)}>
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
                                value={dataInicial}
                                onChange={e => setDataInicial(e.target.value)}>
                            </Form.Control>
                        </Form.Group>

                        <Form.Label>Abono Pecuniário</Form.Label>
                        <Form.Group className="mb-3">
                            <Form.Check
                                inline
                                type="radio"
                                name="abono"
                                checked={abono}
                                onChange={() => setAbono(true)}
                                label="Sim">
                            </Form.Check>
                            <Form.Check
                                inline
                                type="radio"
                                name="abono"
                                checked={!abono}
                                onChange={() => setAbono(false)}
                                label="Não">
                            </Form.Check>
                        </Form.Group>

                        <Form.Label>50% do 13º salário</Form.Label>
                        <Form.Group className="mb-3">
                            <Form.Check
                                inline
                                type="radio"
                                name="decimo_terceiro"
                                checked={decimoTerceiro}
                                onChange={() => setDecimoTerceiro(true)}
                                label="Sim">
                            </Form.Check>
                            <Form.Check
                                inline
                                type="radio"
                                name="decimo_terceiro"
                                checked={!decimoTerceiro}
                                onChange={() => setDecimoTerceiro(false)}
                                label="Não">
                            </Form.Check>
                        </Form.Group>

                        <Form.Label>Dias Gozo</Form.Label>
                        <Form.Group className="mb-5">
                            <Form.Check
                                inline
                                type="radio"
                                name="dias_gozo"
                                checked={diasGozo === 10}
                                onChange={() => setDiasGozo(10)}
                                label="10">
                            </Form.Check>
                            <Form.Check
                                inline
                                type="radio"
                                name="dias_gozo"
                                checked={diasGozo === 20}
                                onChange={() => setDiasGozo(20)}
                                label="20">
                            </Form.Check>
                            <Form.Check
                                inline
                                type="radio"
                                name="dias_gozo"
                                checked={diasGozo === 30}
                                onChange={() => setDiasGozo(30)}
                                label="30">
                            </Form.Check>
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Button variant="primary" onClick={e => salvar(e)}>
                                Salvar
                            </Button>{' '}
                            <Button variant="secondary" onClick={e => clear(e)}>
                                Limpar
                            </Button>

                        </Form.Group>

                    </Form>
                </div>
                <h5 id="textoResposta"></h5>
            </div>
        )
    }

    return (
        <Main title="Agendar pedido">
            {renderForm()}
        </Main>
    )

}

export default Pedido