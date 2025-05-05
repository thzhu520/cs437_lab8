const PRODUCTS = [
  {
    name: "Elder Chocolate Truffles, 2oz",
    description: "The best of the best in chocolate truffles.",
    imageSrc: "https://placehold.co/200x200",
    price: 10,
    numInCart: 2,
  },
  {
    name: "Jelly Belly Jelly Beans, 100 count",
    description: "Not for planting.",
    imageSrc: "https://placehold.co/200x200",
    price: 5,
    numInCart: 1,
  },
  {
    name: "Kettle Chips, 8oz",
    description: "Delicious and unhealthy.",
    imageSrc: "https://placehold.co/200x200",
    price: 3,
    numInCart: 0,
  },
  {
    name: "Carrots, 2lb",
    description: "Delicious and healthy.",
    imageSrc: "https://placehold.co/200x200",
    price: 2,
    numInCart: 0,
  },
];

const productList = document.querySelector(".product-list");
const cartItems = document.querySelector(".cart-items");
const minPriceInput = document.querySelector("#minPrice");
const maxPriceInput = document.querySelector("#maxPrice");

function renderProductCard(product) {
  const article = document.createElement("article");
  article.innerHTML = `
    <img src="${product.imageSrc}" alt="${product.name}">
    <div class="product-details">
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p class="price">$${product.price}</p>
      <div>
        <button class="buy-button">Add to cart</button>
        <span class="num-in-cart">${product.numInCart > 0 ? `${product.numInCart} in cart` : ""}</span>
      </div>
    </div>
  `;

  article.querySelector(".buy-button").addEventListener("click", () => {
    product.numInCart++;
    rerenderAllProducts();
    rerenderCart();
  });

  return article;
}

function shouldProductBeVisible(product) {
  const min = Number.parseFloat(minPriceInput.value);
  const max = Number.parseFloat(maxPriceInput.value);

  if (!isNaN(min) && product.price < min) return false;
  if (!isNaN(max) && product.price > max) return false;

  return true;
}

function rerenderAllProducts() {
  productList.innerHTML = "<h2>Search results</h2>";
  for (const product of PRODUCTS) {
    if (shouldProductBeVisible(product)) {
      productList.appendChild(renderProductCard(product));
    }
  }
}

function rerenderCart() {
  cartItems.innerHTML = "";
  for (const product of PRODUCTS) {
    if (product.numInCart > 0) {
      const p = document.createElement("p");
      p.textContent = `${product.name} x${product.numInCart}`;

      const btn = document.createElement("button");
      btn.textContent = "Remove";
      btn.classList.add("remove-button");

      btn.addEventListener("click", () => {
        product.numInCart = 0;
        rerenderAllProducts();
        rerenderCart();
      });

      cartItems.appendChild(p);
      cartItems.appendChild(btn);
    }
  }
}

// Event listeners
minPriceInput.addEventListener("change", rerenderAllProducts);
maxPriceInput.addEventListener("change", rerenderAllProducts);

// Initial render
rerenderAllProducts();
rerenderCart();
