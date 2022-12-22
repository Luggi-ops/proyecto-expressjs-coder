import fs from 'fs'

export class ProductManager {
    constructor(path){
        this.path = path;
        this.products = this.getAll(path);
    }

    getAll(path){
        try {
            return JSON.parse(fs.readFileSync(path))
        } catch (error) {
            console.log("error", error)
            return []
        }
    }

    addProduct(product){
        const exist = this.products.find(prod => prod.code === product.code);

        if(exist){
            throw 'Product exist!';
        }else{
            const uid = Date.now();
            this.products = [...this.products, {id: uid, status: true, ...product}]
            console.log("added product")
            this.saveData();
        }
    }

    saveData(){
        fs.writeFileSync(this.path, JSON.stringify(this.products))
    }

    getProducts(){
        return this.products;
    }

    getProductById(code){
        const findOne = this.products.find(prod => prod.code === code);

        if(findOne){
            return findOne;
        }else{
            throw 'Not found!';
        }
    }

    updateProduct(id, body){
        let product = this.products.find(prod => prod.code === id);

        if(!product){
            throw "Product not exist"
        }

        const productsUpdate = this.products.filter((product) => product.code !== id)
        product = {...product, ...body}
        this.products = [...productsUpdate, product]
        this.saveData();
        console.log("update product")
    }

    deleteProduct(id){
        const product = this.products.find(prod => prod.code === id);
        if(!product){
            throw "Product not exist"
        }
        const remove = this.products.filter((product) => product.code !== id)
        this.products = remove;
        this.saveData();
        console.log("removed product")
    }
}

export const productManager = new ProductManager("data/products.json");