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
    }
}