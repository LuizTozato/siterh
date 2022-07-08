import React from "react";
import Main from "../template/Main";
import {Chart} from "react-google-charts"

const Charts = () => {

    const data = [
        ["Fabricante","Vendas"],
        ["Android", 10],
        ["IOS", 30],
        ["Linux", 25],
        ["Windows", 100],
        ["Mac", 6]
    ]

    return(
        <Main title="Dados e estatísticas">

            <div>Hellow world</div>
            <Chart 
                chartType="PieChart" 
                data={data} 
                width={"100%"} 
                height={"400px"}>
            </Chart>

        </Main>

    )

}

export default Charts