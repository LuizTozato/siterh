import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import routes from "./routes.js"

dotenv.config();
const port = process.env.PORT

const app = express()

// allow cross-origin requests
app.use(cors())

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

routes.setup(app)