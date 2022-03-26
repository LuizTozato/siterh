export default {

    getPedidos(req, res) {
        console.log("Enviado por get: " + JSON.stringify(req.params))
        res.json({data: [], total: 0, pages: 0})
    }
}
