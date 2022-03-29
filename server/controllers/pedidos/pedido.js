import db from "../../database/database.js"

export default {

    getPedido(req, res) {
        console.log("Enviado por get: " + JSON.stringify(req.params))
        res.send("🔥")
    },

    //Incluir novo
    addPedido(req, res) {
        console.log("Enviado por post ===========")
        console.log("Parâmetros:")
        console.log(req.params)
        console.log("Body:")
        console.log(req.body)
        if (setPedido(req.body))
            res.send("✅")
        else
            res.status(400).send("🔥")
    },

    //Alterar pedido existente
    updatePedido(req, res) {
        console.log("Enviado por put: " + JSON.stringify(req.params))
        res.send("🔥")
    },

    getServidores(req, res) {
        const servidores = [
            {id: 12345, nome: 'Luiz Felipe Neves Tozato'},
            {id: 12346, nome: 'Samanta Cássia Vertuan'},
            {id: 12347, nome: 'Franciele Baptista'}
        ]
        res.send(servidores)
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
