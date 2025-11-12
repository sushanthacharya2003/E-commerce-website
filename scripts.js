let cart = [];

// fetching products from dummyjson API
async function getProducts() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  const products = data.products;

  const productsContainer = document.querySelector(".products");

  products.forEach((p) => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <div class="img_con">
        <button class="prevBtn">◀</button>
        <img src="${p.images[0]}" class="productImg" alt="productImage">
        <img src="${p.thumbnail}" class="productThumb" alt="productThumbnail" style="display:none">
        <button class="nextBtn">▶</button>
      </div>
      <h3>${p.title}</h3>
      <p>$${p.price}</p>
      <button class="addToCartBtn">Add to Cart</button>
    `;

    const prev = div.querySelector(".prevBtn");
    const next = div.querySelector(".nextBtn");
    const img = div.querySelector(".productImg");
    const thumb = div.querySelector(".productThumb");
    const addToCartBtn = div.querySelector(".addToCartBtn");

    prev.addEventListener("click", () => {
      img.style.opacity = "1";
      thumb.style.opacity = "0";
    });

    next.addEventListener("click", () => {
      img.style.opacity = "0";
      thumb.style.opacity = "1";
    });

    addToCartBtn.addEventListener("click", () => {
      addToCart(p);
    });

    productsContainer.appendChild(div);
  });

  return products;
}

// Add product to cart
function addToCart(product) {
  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  renderCart();
}

// Render cart
function renderCart() {
  const cartContainer = document.querySelector(".cart");
  cartContainer.innerHTML = "<h2>Your Cart</h2>";

  if (cart.length === 0) {
    cartContainer.innerHTML += "<p>Your cart is empty.</p>";
    return;
  }

  let gTotal = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    gTotal += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cartItem");
    cartItem.innerHTML = `
      <span>${item.title}</span>
      <span>Price: $${item.price}</span>
      <span>Qty: ${item.quantity}</span>
      <span>Total: $${itemTotal.toFixed(2)}</span>
      <div>
        <button class="addQty">+</button>
        <button class="removeQty">–</button>
      </div>
    `;

    // increase quantity
    cartItem.querySelector(".addQty").addEventListener("click", () => {
      item.quantity++;
      renderCart();
    });

    // decrease quantity
    cartItem.querySelector(".removeQty").addEventListener("click", () => {
      item.quantity--;
      if (item.quantity <= 0) {
        cart.splice(index, 1);
      }
      renderCart();
    });

    cartContainer.appendChild(cartItem);
  });

  // Show grand total at bottom
  const totalDiv = document.createElement("div");
  totalDiv.innerHTML = `<h3>Grand Total: $${gTotal.toFixed(2)}</h3>`;
  totalDiv.style.textAlign = "center";
  totalDiv.style.marginTop = "10px";
  cartContainer.appendChild(totalDiv);
}

// toggle cart visibility
const cartBtn = document.querySelector("#cartBtn");
cartBtn.addEventListener("click", () => {
  const cartContainer = document.getElementById("cart");
  cartContainer.classList.toggle("show");
  cartContainer.scrollIntoView({ behavior: "smooth" });
  if (cartContainer.classList.contains("show")) {
    renderCart();
  }
});

// Checkout button
const checkoutBtn = document.querySelector("#checkoutBtn");
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let gTotal = 0;
  cart.forEach((item) => {
    gTotal += item.price * item.quantity;
  });

  alert(`🛍️ Thank you for shopping with us!\nYour total is $${gTotal.toFixed(2)}`);
  cart = [];
  renderCart();
});

getProducts();

