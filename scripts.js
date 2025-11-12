//Implement your code here to make it a functional shopping website

let cart=[]
// fetching the api
async function getProducts() {
        const res = await fetch("https://dummyjson.com/products")
        const data = await res.json();
        // product details for the purpose of checking
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
            <p>${p.price}</p>
            <button class="addToCartBtn" style="margin: 2rem 6rem"> Add to cart</button>
            `

            console.log("Image",p.images);
            console.log("Thumb:", p.thumbnail);

            const prev = div.querySelector(".prevBtn");
            const next = div.querySelector(".nextBtn");
            const img = div.querySelector(".productImg");
            const thumb = div.querySelector(".productThumb");
            const addToCartBtn=div.querySelector(".addToCartBtn");

            prev.addEventListener("click", () => {
                img.style.opacity = "1";
                thumb.style.opacity = "0";
            });

            next.addEventListener("click", () => {
                img.style.opacity = "0";
                thumb.style.opacity = "1";
            });
            addToCartBtn.addEventListener("click",()=>{
                cart.push(p);
                if (document.getElementById("cart").classList.contains("show")) {
                    renderCart();
                  }
            });

            productsContainer.appendChild(div);

        });

        return products;

    }
    // only add ONE listener, outside the loop
    const cartBtn = document.querySelector("#cartBtn");
    cartBtn.addEventListener("click", () => {
      const cartContainer = document.getElementById("cart");
      cartContainer.classList.toggle("show");   // uses your CSS .cart.show
      if (cartContainer.classList.contains("show")) {
        renderCart(); // render when the cart is shown
      }
    });

    function renderCart(){
        const cartContainer=document.querySelector(".cart");
        if (cart.length === 0) {
            cartContainer.innerHTML += "<p>Your cart is empty.</p>";
            return;
          }
        cart.forEach((item,index)=>{
            const cartItem=document.createElement("div");
            cartItem.classList.add("cartItem");
            cartItem.innerHTML = `
              <span>${item.title}</span>
              <span>$${item.price}</span>
              <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartContainer.appendChild(cartItem);
        })
    }

getProducts();

