//Implement your code here to make it a functional shopping website

// fetching the api
async function getProducts() {
        const res = await fetch("https://dummyjson.com/products")
        const data = await res.json();
        // product details
        const products = data.products;
        products.forEach(p => {
          console.log(p.images[0]);  // first image
          console.log(p.title);      // product title
          console.log(p.price);      // price
          console.log(p.rating);     // rating
        });

        const productsContainer=document.querySelector(".products");
        products.forEach((p)=>{
            const div=document.createElement("div");
            div.classList.add("product");
            div.innerHTML=`<div class="img_con">
            <button class="prevBtn">◀</button>
            <img src="${p.images[0]}" class="productImg" alt="productImage" width="80%" height="100%" >
            <img src="${p.thumbnail}" class="productThumb" alt="productThumbnail" width="80%" height="100%" style="display:none" >
            <button class="nextBtn">▶</button>
            </div>
            <h3>${p.title}</h3>
            <p>${p.price}</p>`

            console.log(p.images);
            console.log("Thumb:", p.thumbnail);

            const prev = div.querySelector(".prevBtn");
            const next = div.querySelector(".nextBtn");
            const img = div.querySelector(".productImg");
            const thumb = div.querySelector(".productThumb");

            prev.addEventListener("click", () => {
                img.style.display = "block";
                thumb.style.display = "none";
            });

            next.addEventListener("click", () => {
                img.style.display = "none";
                thumb.style.display = "block";
            });

            productsContainer.appendChild(div);

        })
        return products;

    }

getProducts();

