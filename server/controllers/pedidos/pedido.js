import db from "../../database/database.js"

export default {

    //LER pedido específico
    getPedido(req, res) {

        db.get(`SELECT *
                FROM tb_pedido
                WHERE id_pedido = ?`,
            [
                req.params.id
            ],
            function (err, result) {
                if (err) {
                    return console.log(err.message)
                } else {
                    result? console.log("Single order found.") :  console.log("Busca retornou mas falhou")
                    res.send(result)
                }
            }
        )
    },

    //CRIAR pedido
    addPedido(req, res) {
        if (setPedido(req.body))
            res.send("✅")
        else
            res.status(400).send("🔥")
    },

    //ALTERAR pedido existente
    updatePedido(req, res) {
        if (updatePedido(req.body))
            res.send("✅")
        else
            res.status(400).send("🔥")
    },

    //EXCLUIR pedido
    deletePedido(req, res) {

        db.run(`DELETE FROM tb_pedido
                    WHERE id_pedido = ?`,
            [
                req.params.id
            ],
            function (err) {
                if (err) {
                    return console.log(err.message);
                } 
                
                res.send("✅")
                console.log(`A row has been deleted with rowid: ${req.params.id}`);
            }
        )

        return true
    },

    //Servidores que podem ser escolhidos nos pedidos
    getServidores(req, res) {
        
        db.all(
            `SELECT * FROM tb_servidor ORDER BY id_servidor`,
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

/**
 * @param {string} date
 * @param {int} days
 * @returns {string} yyyy-mm-dd
 */
function addDays(date, days) {
    let final_date = new Date(date)
    final_date.setDate(final_date.getDate() + days)
    return final_date.toISOString().split('T')[0]
}

function setPedido(data) {

    db.run(`INSERT INTO tb_pedido(id_servidor,
                                  email_solicitante,
                                  tipo,
                                  data_inicial,
                                  data_final,
                                  decimo_terceiro,
                                  abono)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            data.id_servidor,
            data.email_solicitante,
            data.tipo,
            data.data_inicial,
            addDays(data.data_inicial, data.dias_gozo),
            data.decimo_terceiro,
            data.abono
        ],
        function (err) {
            if (err) {
                return console.log(err.message);
            }
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.lastID}`);
        }
    )

    return true
}

function updatePedido(data) {

    db.run(`UPDATE tb_pedido SET 
                                  email_solicitante = ?,
                                  tipo = ?,
                                  data_inicial = ?,
                                  data_final = ?,
                                  decimo_terceiro = ?,
                                  abono = ?
            WHERE id_pedido = ?`,
        [
            data.email_solicitante,
            data.tipo,
            data.data_inicial,
            addDays(data.data_inicial, data.dias_gozo),
            data.decimo_terceiro,
            data.abono,
            data.id_pedido
        ],
        function (err) {
            if (err) {
                return console.log(err.message);
            }
            console.log(`A row has been updated with rowid ${data.id_pedido}`);
        }
    )

    return true
}