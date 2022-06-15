import db from "../../database/database.js"
import jwt from 'jsonwebtoken'
import md5 from 'md5'

export default {

    createToken(req, res) {

        console.log("\nIniciando requisição de token...")

        const SECRET = 'Pakerwreah'

        const emailReq = md5(req.body.email)
        const senhaReq = md5(req.body.senha)

        let token = null

        //LER pedido específico
        db.get(`SELECT *
                FROM tb_credenciais
                WHERE login = ? AND senha = ?`,
            [
                emailReq, senhaReq
            ],
            function (err, result) {
                if (err) {
                    return console.log(err.message)
                } else {
                    if(!!result){
                        console.log("Usuário encontrado!")
                        token = jwt.sign({login: emailReq}, SECRET, {expiresIn: 600}) //válido por 10min
                        res.send(token)

                    } else {
                        console.log("Usuário NÃO encontrado.....")
                        res.send(token)
                    }
                }
            }
        )
    },

    validateToken(req, res){
        
        const recoveredToken = req.body.recoveredToken

        const SECRET = 'Pakerwreah'

        let validador = null

        try{
            jwt.verify(recoveredToken, SECRET)
            validador = true
        } catch (err){
            validador = false
        }

        res.send(validador)
            
    }

}