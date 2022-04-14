import Pedido from "./controllers/pedidos/pedido.js"
import Pedidos from "./controllers/pedidos/pedidos.js"

function setup(app) {
    // Pedido
    app.get('/pedidos/pedido/:id', Pedido.getPedido)
    app.get('/pedidos/pedido', Pedidos.getPedidos)
    app.post('/pedidos/pedido', Pedido.addPedido)
    app.put('/pedidos/pedido/:id', Pedido.updatePedido)
    app.get('/pedidos/servidores', Pedido.getServidores)
    app.delete('/pedidos/pedido/:id', Pedido.deletePedido)
}

export default { setup }
