//Implement your code here to make it a functional shopping website
    async function getProducts() {
        const res = await fetch("https://dummyjson.com/products")
        const data = await data.json;
        return data.products;
    }

const id=1;
const product=document.querySelector(".products");
function displayProducts(){
    const products=await getProducts();
    products.id.forEach(element => {

    });
}

