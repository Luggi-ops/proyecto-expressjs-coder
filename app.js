import express from 'express'
import routerCarts from './api/carts/carts.js';
import routerProductManager from './api/products/products.js';


const app = express()
app.use(express.json())

app.use("/", routerProductManager)
app.use("/", routerCarts)

const PORT = 8080;


app.listen(PORT, () => {
    console.log(`Server UP running in http://localhost:${PORT}`)
})