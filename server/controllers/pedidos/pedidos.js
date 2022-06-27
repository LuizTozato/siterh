import db from "../../database/database.js"


export default {

    //LER TODOS os pedidos 
    async getPedidos(req, res) {

        // 1ª requisição =====
        db.all(
            `SELECT * FROM tb_servidor ORDER BY id_servidor`,
            function (err, result) {
                if (err) {
                    return console.log(err.message)
                } else {
                    
                    const servidores = result

                    // 2ª requisição =====
                    db.all(
                        `SELECT * FROM tb_pedido ORDER BY id_pedido`,
                        function (err, result) {
                            if (err) {
                                return console.log(err.message)
                            } else {
                                
                                let pedidos = result
                                
                                pedidos.forEach(pedido => {
                                    
                                    const servidor = servidores.find(servidor => servidor.id_servidor === pedido.id_servidor)
                                    pedido.nome = servidor.nome
                                })

                                res.send(pedidos)
                            }   
                        }   
                    )

                    // FIM 2ª requisição =====

                }   
            }   
        )

        // FIM 1ª requisição =====
    }
}