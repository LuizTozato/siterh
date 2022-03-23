import express from "express"
import dotenv from "dotenv"
import cors from "cors";


dotenv.config();
const port = process.env.PORT

const app = express()

// allow cross-origin requests
app.use(cors())

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

app.get('/pedido/:id', async (req, res) => {
    console.log("Enviado por get: " + JSON.stringify(req.params))
    await sleep(1000)
    res.send({
        id: req.params.id,
        message: `Conteúdo do Pedido #${req.params.id}`, 
        timestamp: new Date().toLocaleString('en-GB')
    })
})

//Incluir novo
app.post('/pedido/:id', async (req, res) => {
    console.log("Enviado por post: " + JSON.stringify(req.params))
})

//Alterar pedido existente
app.put('/pedido/:id', async (req, res) => {
    console.log("Enviado por put: " + JSON.stringify(req.params))
})



app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
