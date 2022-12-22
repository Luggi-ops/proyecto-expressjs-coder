import express from 'express';
import { cart } from '../models/Cart.js';
import { productManager } from '../models/ProductManager.js';

export const routerCarts = express.Router();

routerCarts.get("/carts", async (req, res) => {
    try {
        const { limit } = req.query;
        const carts = await cart.getCarts();

        if(limit){
            const data = carts.slice(0, limit);
            res.json({
                ok: true,
                data: data,
                count: data.length
            })
        }else{
            res.json({
                ok: true,
                data: carts,
                count: carts.length
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

routerCarts.post("/carts", async(req, res) => {
    try {
        const { products } = req.body;
        
        if(!products){
            return res.json({
                ok: false,
                msg: "Fields products is required"
            })
        }

        for(let product of products){
            if(!product.hasOwnProperty("id")){
                return res.json({
                    ok: false,
                    msg: "product id is required in products"
                })
            }

            const productExist = productManager.getProductById(product.id)

            if(!productExist){
                return res.json({
                    ok: false,
                    msg: "product not found"
                })
            }

            if(!product.hasOwnProperty("quantity")){
                product.quantity = 1
            }
        }

        cart.addCart({products: products.map(p => {p.quantity, p.id})});

        res.json({
            ok: true,
            msg: "create cart"
        })

    } catch (error) {
        console.log("error", error)
        res.json({
            ok: false,
            msg: error
        })
    }
})

routerCarts.get("/carts/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const carts = await cart.getCartById(cid)
        res.json({
            ok: true,
            data: carts
        })
    } catch (error) {
        console.log("error", error)
        res.json({
            ok: false,
            msg: error
        })
    }
})

routerCarts.post("/carts/:cid/products/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;

        cart.addProduct(cid, pid)
        
        res.json({
            ok: true,
            msg: "product add to cart"
        })
    } catch (error) {
        console.log("error", error)
        res.json({
            ok: false,
            msg: error
        })
    }
})



export default routerCarts;