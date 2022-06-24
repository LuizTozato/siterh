import Pedidos from "./controllers/pedidos/pedidos.js"
import Pedido from "./controllers/pedidos/pedido.js"
import Credenciais from "./controllers/credenciais/token.js"

function setup(app) {

    app.get('/pedidos/pedido',            Pedidos.getPedidos)

    app.get('/pedidos/pedido/:id',        Pedido.getPedido)
    app.post('/pedidos/pedido',           Pedido.addPedido)
    app.put('/pedidos/pedido/:id',        Pedido.updatePedido)
    app.get('/pedidos/servidores',        Pedido.getServidores)
    app.delete('/pedidos/pedido/:id',     Pedido.deletePedido)

    app.put('/credenciais/token',         Credenciais.createToken)
    app.put('/credenciais/validateToken', Credenciais.validateToken)

}

export default { setup }
