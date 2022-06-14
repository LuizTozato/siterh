import db from "../../database/database.js"
import jwt from 'jsonwebtoken'

export default {

    createToken(req, res) {

        console.log("\nIniciando requisição de token...")
        console.log(req.body)

        const SECRET = 'Pakerwreah'

        const loginReq = req.body.email
        const senhaReq = req.body.senha

        let token = null

        //LER pedido específico
        db.get(`SELECT *
                FROM tb_credenciais
                WHERE login = ? AND senha = ?`,
            [
                loginReq, senhaReq
            ],
            function (err, result) {
                if (err) {
                    return console.log(err.message)
                } else {
                    if(!!result){
                        console.log("Usuário encontrado!")
                        token = jwt.sign({login: loginReq}, SECRET, {expiresIn: 1800})
                        res.send(token)

                    } else {
                        console.log("Usuário NÃO encontrado.....")
                        res.send(token)
                    }
                }
            }
        )
    
    }
}