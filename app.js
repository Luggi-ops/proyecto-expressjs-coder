import express from 'express'
import { pm } from './models/ProductManager.js';

const app = express()
app.use(express.json())

const PORT = 8080;

app.get("/products", async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await pm.getProducts();
        console.log("limit", limit)
        if(limit){
            const data = products.slice(0, limit);
            res.json({
                ok: true,
                data: data,
                count: data.length
            })
        }else{
            res.json({
                ok: true,
                data: products,
                count: products.length
            })
        }

    } catch (error) {
        console.log("error", error)
        res.json({
            ok: false,
            msg: error
        })
    }
})

app.get("/products/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        console.log("pid", pid)
        const product = await pm.getProductById(pid)
        res.json({
            ok: true,
            data: product
        })
    } catch (error) {
        console.log("error", error)
        res.json({
            ok: false,
            msg: error
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server UP running in http://localhost:${PORT}`)
})