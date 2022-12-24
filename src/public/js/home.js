

const container = document.getElementById("container");

const getProducts = async () => {
    try {
        const res = await fetch("http://localhost:8080/products")
        const { data } = await res.json();
        
        for(let product of data){
            const card = document.createElement("div");
            card.innerHTML = `
                    <div class="card">
                        <div class="card__img>
                            <img src="" alt=""/>
                        </div>
                        <div>
                            <p class="card__title">${product.title}</p>
                            <p class="card__description">${product.description}</p>
                            <p class="card__stock">Stock: ${product.stock}</p>
                        </div>
                        <div>
                            <p>$ ${product.price}</p>
                        </div>
                    </div>
                `
            container.appendChild(card)
        }
         
    } catch (error) {
        
    }
}
getProducts()