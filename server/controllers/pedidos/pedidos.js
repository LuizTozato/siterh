import db from "../../database/database.js"

export default {

    //LER TODOS os pedidos 
    getPedidos(req, res) {

        db.all(
            `SELECT * FROM tb_pedido ORDER BY id_pedido`,
            function (err, result) {
                if (err) {
                    return console.log(err.message);
                } else {
                    res.send(result)
                }   
            }   
        )
    }

}
