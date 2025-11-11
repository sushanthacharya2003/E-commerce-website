//Implement your code here to make it a functional shopping website

// fetching the api
async function getProducts() {
        const res = await fetch("https://dummyjson.com/products")
        const data = await res.json();
        // product details
        const products = data.products;
        products.forEach(p => {
          console.log(p.title);      // product title
          console.log(p.price);      // price
          console.log(p.rating);     // rating
          console.log(p.images[0]);  // first image
        });

        const productsContainer=document.querySelector(".products");
        products.forEach((p)=>{
            const div=document.createElement("div");
            div.classList.add("product");
            let imgIndex=0;
            div.innerHTML=`<div class="img_con">
            <button class="prevBtn">◀</button>
            <img src="${p.images[0]}" class="productImg" alt="productImage" width="80" >
            <button class="nextBtn">▶</button>
            </div>
            <h3>${p.title}</h3>
            <p>${p.price}</p>`
            // ✅ SLIDER LOGIC (per product)
            const imgTag = div.querySelector(".productImg");
            const prev = div.querySelector(".prevBtn");
            const next = div.querySelector(".nextBtn");

            prev.addEventListener("click", () => {
                imgIndex = (imgIndex - 1 + p.images.length) % p.images.length;
                imgTag.src = p.images[imgIndex];
            });

            next.addEventListener("click", () => {
                imgIndex = (imgIndex + 1) % p.images.length;
                imgTag.src = p.images[imgIndex];
            });

            productsContainer.appendChild(div);

        })
        return products;

    }

getProducts();

