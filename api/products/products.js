import express from 'express';
import { productManager } from '../models/ProductManager.js';

export const routerProductManager = express.Router();

routerProductManager.get("/products", async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts();

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

routerProductManager.post("/products", async(req, res) => {
    try {
        const { title, description, code, price, stock, category } = req.body;

        if(!title || !description || !price || !code || !stock || !category){
            res.json({
                ok: false,
                msg: "Fields title, descriptionm, code, price, stock, category are required"
            })
        }

        productManager.addProduct(req.body);

        res.json({
            ok: true,
            msg: "added product"
        })

    } catch (error) {
        console.log("error", error)
        res.json({
            ok: false,
            msg: error
        })
    }
})

routerProductManager.get("/products/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.getProductById(pid)
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

routerProductManager.put("/products/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        
        productManager.updateProduct(pid, req.body)
        
        res.json({
            ok: true,
            msg: "update product"
        })
    } catch (error) {
        console.log("error", error)
        res.json({
            ok: false,
            msg: error
        })
    }
})

routerProductManager.delete("/products/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        
        productManager.deleteProduct(pid)
        
        res.json({
            ok: true,
            msg: "delete product"
        })
    } catch (error) {
        console.log("error", error)
        res.json({
            ok: false,
            msg: error
        })
    }
})

export default routerProductManager;