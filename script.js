
const products = [
  {
    name: "Hydrating Facial Serum",
    category: "Skincare",
    price: 1250,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600"
  },
  {
    name: "Rose Glow Face Cream",
    category: "Skincare",
    price: 1450,
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=600"
  },
  {
    name: "Luxury Lipstick",
    category: "Makeup",
    price: 950,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600"
  },
  {
    name: "Daily Skin Cleanser",
    category: "Skincare",
    price: 850,
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=600"
  },
  {
    name: "Soft Blush Palette",
    category: "Makeup",
    price: 1150,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600"
  },
  {
    name: "Self-Care Essentials",
    category: "Self-Care",
    price: 1650,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600"
  }
];

let cart = [];

const productContainer = document.getElementById("productContainer");
const cartCount = document.getElementById("cartCount");

// Display products
function displayProducts(items) {
  productContainer.innerHTML = "";

  if (items.length === 0) {
    productContainer.innerHTML = "<p>No products found.</p>";
    return;
  }

  items.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      <div class="product-info">
        <p>${product.category}</p>
        <h3>${product.name}</h3>
        <strong>৳${product.price.toLocaleString("en-BD")}</strong>
        <button class="add-button">Add to Cart</button>
      </div>
    `;

    card.querySelector(".add-button").addEventListener("click", () => {
      addToCart(product);
    });

    productContainer.appendChild(card);
  });
}

// Add products to cart
function addToCart(product) {
  const existingProduct = cart.find(item => item.name === product.name);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartCount();
  alert(`${product.name} added to your cart!`);
}

// Update cart number
function updateCartCount() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;
}

// Search products
const searchButton = document.getElementById("searchButton");
const searchBox = document.getElementById("searchBox");
const searchInput = document.getElementById("searchInput");

searchButton.addEventListener("click", () => {
  searchBox.classList.toggle("active");
  if (searchBox.classList.contains("active")) {
    searchInput.focus();
  }
});

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  );

  displayProducts(filteredProducts);
});

// Mobile menu
const menuButton = document.getElementById("menuButton");
const navigation = document.querySelector(".navigation");

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("active");
});

// Newsletter
const newsletterForm = document.getElementById("newsletterForm");

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  alert("Thank you for joining Love & Lumière! 💗");
  newsletterForm.reset();
});

// Cart button
document.getElementById("cartButton").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is currently empty.");
    return;
  }

  const cartDetails = cart.map(item =>
    `${item.name} x ${item.quantity} = ৳${(item.price * item.quantity).toLocaleString("en-BD")}`
  ).join("\n");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  alert(`YOUR SHOPPING CART\n\n${cartDetails}\n\nTotal: ৳${total.toLocaleString("en-BD")}`);
});

// Initial product display
displayProducts(products);
