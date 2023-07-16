const express = require('express')
const handlebars = require('express-handlebars')
const http = require('http')
const { Server } = require('socket.io')
const path = require('path')

const productsRouter = require('./routers/products.router.js')
const cartRouter = require('./routers/carts.router.js')
const homeRouter = require('./routers/home.router.js')

//esto no va aca
const { Router } = require('express')
const router = Router()

// Express and port
const app = express()
const PORT = process.env.PORT || 3001

//Http Server 
const server = http.createServer(app)

//Socket
const io = new Server(server)


//public
app.use(express.static(path.resolve(__dirname, "../src/public")))


//Views
app.engine('handlebars', handlebars.engine())
app.set('views', path.resolve(__dirname, "../src/views"))
app.set('view engine', 'handlebars')

/* MULTER */
//const filesRouter = require('../routers/files.router.js')

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
app.use(productsRouter)
app.use(cartRouter)
app.use(homeRouter)

/* MULTER */
//app.use(filesRouter)

//Web socket actions
let messages = []

io.on('connection', (socket) => {

    const ProductManager = require('./classes/ProductManager.js')
    const prManager = new ProductManager("../products.json")

    //Request Products
    socket.on("req-products", (data) => { 
        io.sockets.emit("res-products", { products: prManager.getProducts() })
    })

    //Cancel New Product
    socket.on("np-cancel",(data)=>{
        io.emit("clear-np-screen",{})
        io.sockets.emit("res-products",{ products: prManager.getProducts() })
    })

    //Add a New Product
    socket.on("add-product" , (data) => {
        prManager.addProduct(data)
        io.emit("clear-np-screen",{})
        io.sockets.emit("res-products",{ products: prManager.getProducts() })
    })
})

server.listen(PORT, (req, res) => {
    console.log("Server running on  port ", PORT)
})



