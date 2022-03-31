import db from "../../database/database.js"

export default {

    getPedidos(req, res) {

        db.all(
            `SELECT * FROM tb_pedido`,
            function (err, result) {
                if (err) {
                    return console.log(err.message);
                } else {
                    res.send(result)
                    //res.json({data: table , total: 0, pages: 0})
                }
            }
        )
    }
}
