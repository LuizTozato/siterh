import db from "../../database/database.js"


export default {

    //LER TODOS os pedidos 
    getPedidos(req, res) {

        // 1ª requisição =====
        db.all(
            `SELECT p.abono,
                    p.data_final,
                    p.data_inicial,
                    p.decimo_terceiro,
                    p.email_solicitante,
                    p.id_pedido,
                    p.id_servidor,
                    p.tipo,
                    s.nome  
            FROM tb_pedido p
            JOIN tb_servidor s USING(id_servidor)
            ORDER BY id_servidor`,

            function (err, result) {
                if (err) {
                    console.log(err.message)
                } else {
                    res.send(result)
                }   
            }   
        )
    },

    getFilteredPagedPedidos(req, res) {

        console.log(req.params.busca)

        // 1ª requisição =====
        db.all(
            `SELECT p.abono,
                    p.data_final,
                    p.data_inicial,
                    p.decimo_terceiro,
                    p.email_solicitante,
                    p.id_pedido,
                    p.id_servidor,
                    p.tipo,
                    s.nome  
            FROM tb_pedido p
            JOIN tb_servidor s USING(id_servidor)
            WHERE s.nome LIKE '%${req.params.busca}%'
            OR p.email_solicitante LIKE '%${req.params.busca}%'
            ORDER BY id_servidor`,

            function (err, result) {
                if (err) {
                    console.log(err.message)
                } else {
                    console.log("\nEnviando resposta")
                    console.log(result)
                    res.send(result)
                }   
            }   
        )
    }    
}