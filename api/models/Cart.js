import fs from 'fs'
import { productManager } from './ProductManager.js';

export class Cart {
    constructor(path){
        this.path = path;
        this.carts = this.getAll(path);
    }

    getAll(path){
        try {
            return JSON.parse(fs.readFileSync(path))
        } catch (error) {
            return []
        }
    }

    addCart(cart){
        const uid = Date.now();
        this.carts = [...this.carts, {id: uid,...cart}]
        console.log("cart created")
        this.saveData();
    }

    saveData(){
        fs.writeFileSync(this.path, JSON.stringify(this.carts))
    }

    getCarts(){
        return this.carts;
    }

    getCartById(id){
        const findOne = this.carts.find(c => c.id === id);

        if(findOne){
            return findOne;
        }else{
            throw 'Cart not found!';
        }
    }

    updateCart(id, body){
        let cart = this.carts.find(c => c.id === id);

        if(!cart){
            throw "cart not exist"
        }

        const cartsUpdate = this.carts.filter((c) => c.id !== id)
        cart = {...cart, ...body}
        this.carts = [...cartsUpdate, cart]
        this.saveData();
        console.log("update cart")
    }

    deleteCart(id){
        const cart = this.carts.find(c => c.id === id);
        if(!cart){
            throw "Cart not exist"
        }
        const remove = this.carts.filter((c) => c.id !== id)
        this.carts = remove;
        this.saveData();
        console.log("removed cart")
    }

    addProduct(cartId, productId){
        const index = this.carts.findIndex(c => c.id === Number(cartId));
        
        if(index === -1){
            throw "Cart not exist"
        }

        const indexProduct = this.carts[index].products.findIndex(p => p.id === productId)

        if(indexProduct === -1){
            const product = productManager.getProductById(productId)
            this.carts[index].products.push({id: product.code, quantity: 1})
        }else{
            this.carts[index].products[indexProduct].quantity += 1;
        }

        this.saveData();
    }
}

export const cart = new Cart("data/cart.json");