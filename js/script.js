// This array holds the initial data for the products in our shopping application.
// Each product is an object with properties like id, name, price, etc.
const products = [
  {
    id: 1,
    name: "Shoe",
    price: 100,
    description: "This is a shoe",
    quantity: 0,
    isFavorite: false,
    imageUrl: "./assets/shoe.png",
  },
  {
    id: 2,
    name: "Socks",
    price: 20,
    description: "This is a socks",
    quantity: 0,
    isFavorite: false,
    imageUrl: "./assets/socks.png",
  },
  {
    id: 3,
    name: "Bag",
    price: 50,
    description: "This is a bag",
    quantity: 0,
    isFavorite: false,
    imageUrl: "./assets/bag.png",
  },
];

// Select the main container element from the DOM where the list of products will be rendered.
const productContainer = document.querySelector(".list-products");

// Select the span element from the DOM where the total price will be displayed.
const priceSpan = document.querySelector(".total");

/**
 * This function is responsible for rendering all products from the 'products' array into the DOM.
 * It clears the existing content, calculates the total price, and then creates and appends
 * a card for each product.
 */
function renderCartProducts() {
  // Clear the product container's inner HTML to prevent duplicating items on re-render.
  productContainer.innerHTML = "";

  // Calculate the total price of all items in the cart by summing up (price * quantity) for each product.
  // The result is then displayed in the 'priceSpan' element.
  priceSpan.textContent =
    products.reduce(
      (total, product) => total + product.price * product.quantity,
      0,
    ) + " $";

  // Loop through each product in the 'products' array to create its corresponding HTML card.
  for (let product of products) {
    // create a div for the product card
    const productCardContainer = document.createElement("div");

    // add card-body as a class to the product card
    productCardContainer.setAttribute("class", "card-body");

    // inject the card html code n the productCard container
    productCardContainer.innerHTML = `
         <div class="card" style="width: 18rem">
              <img src=${product?.imageUrl} class="card-img-top" alt=${product.name}/>
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <h4 class="unit-price">${product.price} $</h4>
                <div>
                  <i class="fas fa-plus-circle" data-id=${product.id}></i>
                  <span class="quantity">${product.quantity}</span>
                  <i class="fas fa-minus-circle" data-id=${product.id}></i>
                </div>
                <div>
                  <i class="fas fa-trash-alt" data-id=${product.id}></i>
                  <i class="fas fa-heart ${product.isFavorite ? "favorite" : ""}" data-id=${product.id}></i>
                </div>
              </div>
            </div>
        `;

    // Append the newly created product card to the main product container.
    productContainer.appendChild(productCardContainer);
  }
}

// When the window finishes loading, call renderCartProducts for the initial display.
window.onload = () => renderCartProducts();

// Add a single event listener to the parent container for all products.
// This uses the concept of event delegation to handle clicks on dynamic child elements.
productContainer.addEventListener("click", (event) => {
  // 'event.target' is the actual element that was clicked inside the container.
  const target = event.target;

  // Retrieve the 'data-id' attribute from the clicked element. This helps identify which product to act upon.
  const productId = target.dataset.id;

  // If the clicked element doesn't have a 'data-id', we don't need to do anything.
  if (!productId) return;

  // Find the specific product object in the 'products' array that matches the clicked product's ID.
  const product = products.find((product) => product.id == productId);

  // Check if the plus icon was clicked to increase the quantity.
  if (target.classList.contains("fa-plus-circle")) {
    product.quantity += 1;
  }

  // Check if the minus icon was clicked to decrease the quantity, but not below zero.
  if (target.classList.contains("fa-minus-circle")) {
    if (product.quantity > 0) {
      product.quantity -= 1;
    }
  }

  // Check if the trash icon was clicked to remove the product from the cart.
  if (target.classList.contains("fa-trash-alt")) {
    // Find the index of the product to be removed.
    const productIndex = products.findIndex(
      (product) => product.id == productId,
    );

    // If the product is found (index is not -1), remove it from the 'products' array.
    if (productIndex !== -1) {
      products.splice(productIndex, 1);
    }
  }

  // Check if the heart icon was clicked to toggle its favorite status.
  if (target.classList.contains("fa-heart")) {
    product.isFavorite = !product.isFavorite;
  }

  // After any change in the data (quantity, removal, favorite), re-render the entire product list to reflect the updates.
  renderCartProducts();
});
