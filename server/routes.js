import Pedido from "./controllers/pedidos/pedido.js"

function setup(app) {
    // Pedido
    app.get('/pedidos/pedido/:id', Pedido.getPedido)
    app.post('/pedidos/pedido', Pedido.addPedido)
    app.put('/pedidos/pedido/:id', Pedido.updatePedido)
    app.get('/pedidos/servidores', Pedido.getServidores)
}

export default { setup }
