import { Router } from "express";
import { getProducts, saveProduct } from "../../services/productService.js"    

const viewRouter = Router()


viewRouter.get('/', async (req, res)=>{

    const { limit = 10, page = 1, sort = '', query = '' } = req.query;

    const filters = {};
    filters.category = query || "";

    const sortOptions = {}
    sort === 'asc' ? sortOptions.price = 1 : sortOptions.price = -1;
    
    const products = await getProducts({filters, page, limit, sortOptions})

    const haveProducts = products.length > 0 ? true : false

    res.render('home', {
        status: haveProducts,
        payload: products,
        totalPages: 20,
        prevPage: 3,
        nextPage: 5,
        page: 4,
        hasPrevPage: true,
        hasNextPage: true,
        prevLink: "",
        nextLink: ""
    })

    /* {
    status:success/error
    payload: Resultado de los productos solicitados
    totalPages: Total de páginas
    prevPage: Página anterior
    nextPage: Página siguiente
    page: Página actual
    hasPrevPage: Indicador para saber si la página previa existe
    hasNextPage: Indicador para saber si la página siguiente existe.
    prevLink: Link directo a la página previa (null si hasPrevPage=false)
    nextLink: Link directo a la página siguiente (null si hasNextPage=false)
    } */
    
})


viewRouter.get('/realtimeproducts', async (req, res) =>{

    const products = await getProducts()
    const io = req.io

    io.on('connection', socket => {

        console.log("se ha conectado un cliente")
        
        socket.emit('products', products)
        socket.on('newProduct', async data =>{

            try {
                await saveProduct(data)
                
            } catch (error) {
                console.log(error)
            }

            io.emit('products', await getProducts())
        })
    
        
    })

    res.render('realTimeProducts', {title: "Productos en tiempo real"})
})

viewRouter.get('/cart', async (req, res) =>{
    res.render('cart', {product: "camisa"})
})


export default viewRouter