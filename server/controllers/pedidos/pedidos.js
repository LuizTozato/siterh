import db from "../../database/database.js"


export default {

    //LER TODOS os pedidos 
    getPedidos(req, res) {

        const busca = req.params.busca

        if(busca !== 'ignore'){
            //busca com filtro aqui
            db.all(
                `SELECT COUNT(p.id_pedido) AS total
                FROM tb_pedido p
                JOIN tb_servidor s USING(id_servidor)
                WHERE s.nome LIKE ?
                OR p.email_solicitante LIKE ?
                ORDER BY id_servidor`,
                [
                    `%${req.params.busca}%`,
                    `%${req.params.busca}%`,
                ],
    
                function (err, result) {
                    if (err) {
                        console.log(err.message)
                    } else {
                        const total = result[0].total
    
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
                            WHERE s.nome LIKE ?
                            OR p.email_solicitante LIKE ?
                            ORDER BY id_servidor
                            LIMIT 5 OFFSET ?`,
                            [
                                `%${req.params.busca}%`,
                                `%${req.params.busca}%`,
                                req.params.offset
                            ],
                
                            function (err, result) {
                                if (err) {
                                    console.log(err.message)
                                } else {
                                    console.log("\nEnviando resposta com filtro")
                                    console.log({result,total})
                                    res.send({result,total})
                                }   
                            }   
                        )
    
                    }   
                }   
            )
        } else {
            //busca sem filtro aqui
            db.all(
                `SELECT COUNT(id_pedido) AS total
                FROM tb_pedido`,
    
                function (err, result) {
                    if (err) {
                        console.log(err.message)
                    } else {
                        
                        const total = result[0].total
                        
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
                            ORDER BY p.id_pedido
                            LIMIT 5 OFFSET ?`,
                            [
                                req.params.offset
                            ],
                            function (err, result) {
                                if (err) {
                                    console.log(err.message)
                                } else {
                                    console.log("\nEnviando resposta sem filtro")
                                    console.log({result,total})
                                    res.send({result,total})
                                }   
                            }   
                        )
                    }   
                }   
            )
        }
    }

}