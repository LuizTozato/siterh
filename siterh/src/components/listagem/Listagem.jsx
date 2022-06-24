import React, {useState, useEffect} from "react"
import './Listagem.css'
import axios from "axios"
import Main from "../template/Main"
import Dialog from "../template/Dialog"
import { Button, Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import {debounce} from 'loadsh'


const Listagem = () => {

    const [list, setList] = useState([])
    const [dialog, setDialog] = useState(null)
    const [busca, setBusca] = useState('')
    const [primeiraLinha, setPrimeiraLinha] = useState(0)
    const [ultimaLinha, setUltimaLinha] = useState(5)

    const listFiltrada = list.filter((pedido) => 
        String(pedido.id_servidor).includes(busca)
    )

    const listaFiltradaPaginada = listFiltrada.slice(primeiraLinha,ultimaLinha)

    //Functions ======
    useEffect(() => { //similar ao componentDidMount
        axios.get('/pedidos/pedido').then(resp => {
            setList(resp.data)
        })
    },[]) // []-> executar 1 única vez
    
    function openDialog(message, callback, config) {
        setDialog(Dialog(message, callback, config))
    }

    function closeDialog() {
        setDialog(null)
    }

    function editarClickEvent(id_pedido) {
        window.location.href = "/atualizar/" + id_pedido
    }

    function deleteClickEvent(id_pedido) {
        openDialog("Está certo da exclusão?", (confirmado) => {
            closeDialog()
            if (confirmado) {
                confirmaExclusao(id_pedido)
            }
        }, {confirm: true})
    }

    function confirmaExclusao(id_pedido) {
        axios.delete('/pedidos/pedido/' + id_pedido)
            .then(() => {
                setList( list.filter(p => p.id_pedido !== id_pedido) )
            })
            .catch(() => {
                openDialog("Erro ao excluir pedido!", () => this.closeDialog())
            })
    }

    function retornarFormatoCorretoDeData(date){
        const array = date.split("-")
        return array[2]+ '/' + array[1] + '/' + array[0]
    }

    //const debouncedSearch = debounce( (criterio) => {setBusca(criterio)}, 300)

    function handleFilter(e){
        
        //debouncedSearch(e.target.value)
        setBusca(e.target.value)
        setPrimeiraLinha(0)
        setUltimaLinha(5)
    }

    function handlePaginationAnterior(){
        if(primeiraLinha !== 0){
            setPrimeiraLinha(primeiraLinha - 5)
            setUltimaLinha(ultimaLinha - 5)
        }
    }

    function handlePaginationProxima(){
        if(primeiraLinha + 5 < listFiltrada.length){
            setPrimeiraLinha(primeiraLinha + 5)
            setUltimaLinha(ultimaLinha + 5)
        }
    }

    //===== JSX =================
    function renderFilterInput(){
        return (
            <div className="div-root-filter">
                <Form className="ps-1 formListagem">
                    <h5 className="text-filter">Filtro:</h5>
                    <Form.Control
                        type="text"
                        value={busca}
                        onChange={handleFilter}
                        placeholder="Digite o id do servidor..."/>
                </Form>
                <hr></hr>
                <h6 className="mb-0 text-filter">Total de itens: {listFiltrada.length}. Exibindo de: {primeiraLinha+1} até {ultimaLinha}</h6>
            </div>
        )
    }
    
    function renderTable() {
        return (
            <table className="tabelaPedidos">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Email do Solicitante</th>
                        <th>Tipo</th>
                        <th>Data Inicial</th>
                        <th>Data Final</th>
                        <th>Abono</th>
                        <th>13º</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        )
    }

    function renderRows() {
        return listaFiltradaPaginada.map(pedido => 
            
            <tr key={pedido.id_pedido} id="id_servidor">
                <td>{pedido.id_pedido}</td>
                <td>{pedido.nome}</td>
                <td>{pedido.email_solicitante}</td>
                <td>{pedido.tipo}</td>
                <td>{retornarFormatoCorretoDeData(pedido.data_inicial)}</td>
                <td>{retornarFormatoCorretoDeData(pedido.data_final)}</td>
                <td>{pedido.abono?"SIM":"NÃO"}</td>
                <td>{pedido.decimo_terceiro?"SIM":"NÃO"}</td>
                <td>
                    <Button onClick={() => editarClickEvent(pedido.id_pedido)}>Editar</Button>
                    <Button variant="secondary" onClick={() => deleteClickEvent(pedido.id_pedido)}>Excluir</Button>
                </td>
            </tr>
            
        )
    }

    function renderPagination(){
        return(
            <div className="paginacao">
                <h5 className="mb-0 text-filter">Paginação:</h5>
                <Button variant="light" onClick={handlePaginationAnterior}>Anterior</Button>
                <Button variant="dark" onClick={handlePaginationProxima}>Próxima</Button>
            </div>
        )
    }
    
    return (
        <Main title="Listagem dos Pedidos">
            {renderFilterInput()}
            {renderTable()}
            {renderPagination()}
            {dialog}
        </Main>
    )
    

}

export default Listagem