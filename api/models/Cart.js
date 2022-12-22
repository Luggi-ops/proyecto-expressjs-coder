import fs from 'fs'

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
        const exist = this.carts.find(c => c.id === cart.id);

        if(exist){
            throw 'Cart id exist!';
        }else{
            const uid = Date.now();
            this.carts = [...this.cars, {id: uid,...cart}]
            console.log("cart created")
            this.saveData();
        }
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
            throw 'Not found!';
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
}

export const cart = new Cart("data/cart.json");