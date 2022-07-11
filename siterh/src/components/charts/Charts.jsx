import React, {useState, useEffect} from "react"
import axios from "axios"
import Main from "../template/Main"
import {Chart} from "react-google-charts"

const Charts = () => {

    const [data, setData] = useState([])
    const [busca, setBusca] = useState('')
    const [totalPedidos, setTotalPedidos] = useState(0)

    //Functions ======
    useEffect(() => { 
        buscarPedidosChart(busca)
    },[busca]) // []-> executar 1 única vez

    const options = {
        chart: {
          title: "Número de marcações de férias por mês",
          subtitle: "Período de 2022"
        }
      }

    function buscarPedidosChart(busca = 'ignore'){
        
        if(busca === ''){
            busca = 'ignore'
        }
        
        console.log('/pedidos/pedidoschart/' + busca )

        axios.get('/pedidos/pedidoschart/' + busca ).then(resp => {
            
            const pedidosOriginais = resp.data.result
            const totalDePedidos = resp.data.total
            
            console.log(pedidosOriginais)
            console.log(totalDePedidos)

            let contabilidadeDePedidos = [
                ["Mês", "Somatório"],
                ["Janeiro", 0],
                ["Fevereiro", 0],
                ["Março", 0],
                ["Abril", 0],
                ["Maio", 0],
                ["Junho", 0],
                ["Julho", 0],
                ["Agosto", 0],
                ["Setembro", 0],
                ["Outubro", 0],
                ["Novembro", 0],
                ["Dezembro", 0]
            ]

            pedidosOriginais.forEach((pedido) => {
                const mes = Number.parseInt(pedido.data_inicial.split('-')[1])
                contabilidadeDePedidos[mes][1]++
            })

            setData(contabilidadeDePedidos)
            setTotalPedidos(totalDePedidos)
        })

    }

    return(
        <Main title="Dados e estatísticas">

            <Chart 
                chartType="Bar" 
                data={data} 
                width={"100%"} 
                height={"400px"}
                options={options}>
            </Chart>
            <div>Total de Pedidos: {totalPedidos}</div>

        </Main>

    )

}

export default Charts