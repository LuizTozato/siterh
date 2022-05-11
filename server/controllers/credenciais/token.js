export default {

    createToken(req, res) {

        console.log("requisição de token")
        console.log(req.body)

        const loginReq = req.body.email
        const senhaReq = req.body.senha

        let token = null

        if(loginReq === "master@gmail.com" && senhaReq === "master"){
            token = "a1d2v3n6j9u7765yn2nc5g4j8ui96j2"
        }

        res.send(token)

    }
}