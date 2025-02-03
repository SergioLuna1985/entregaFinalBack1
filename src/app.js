import express from "express"
import handlebars from 'express-handlebars'
import {Server} from 'socket.io'
import routerApp from "./routes/routes.js"
import socketMiddleware from "./utils/socketMiddleware.js"
import { connectDB } from "./db/mongoDB.js"

const PORT = 8080
const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.engine('handlebars', handlebars.engine())
app.set('views','src/views')
app.set('view engine', 'handlebars')

const httpServer = app.listen(PORT, ()=>{
    console.log(`Escuchando en ${PORT}`)
})

connectDB()

const io = new Server(httpServer)

app.use(socketMiddleware(io))

app.use(routerApp)