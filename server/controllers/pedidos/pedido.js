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
        res.send("🔥🔥")
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
