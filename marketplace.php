<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Marketplace Clone</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        body {
            background-color: #f0f2f5;
            color: #1c1e21;
        }

        .header {
            background-color: #ffffff;
            padding: 12px 16px;
            border-bottom: 1px solid #dddfe2;
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .search-container {
            display: flex;
            gap: 10px;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
        }

        .search-box {
            flex: 1;
            padding: 10px 16px;
            border: 1px solid #dddfe2;
            border-radius: 20px;
            background-color: #f0f2f5;
            font-size: 15px;
        }

        .search-box:focus {
            outline: none;
            background-color: #ffffff;
            border-color: #1877f2;
        }

        .cart-button {
            background-color: #1877f2;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
        }

        .cart-button:hover {
            background-color: #166fe5;
        }

        .container {
            max-width: 1200px;
            margin: 20px auto;
            padding: 0 16px;
        }

        .marketplace-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .marketplace-title {
            font-size: 24px;
            font-weight: 700;
            color: #1c1e21;
        }

        .items-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 16px;
        }

        .item-card {
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s, box-shadow 0.2s;
            cursor: pointer;
        }

        .item-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .item-image {
            width: 100%;
            height: 200px;
            background-color: #f0f2f5;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #8a8d91;
            font-size: 14px;
        }

        .item-details {
            padding: 12px;
        }

        .item-price {
            font-size: 18px;
            font-weight: 700;
            color: #1c1e21;
            margin-bottom: 4px;
        }

        .item-title {
            font-size: 15px;
            color: #1c1e21;
            margin-bottom: 4px;
            line-height: 1.4;
        }

        .item-location {
            font-size: 13px;
            color: #65676b;
        }

        .add-to-cart-btn {
            width: 100%;
            padding: 8px;
            background-color: #1877f2;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 600;
            margin-top: 8px;
            transition: background-color 0.2s;
        }

        .add-to-cart-btn:hover {
            background-color: #166fe5;
        }

        .add-to-cart-btn.added {
            background-color: #42b72a;
        }

        .cart-sidebar {
            position: fixed;
            right: -400px;
            top: 0;
            width: 400px;
            height: 100vh;
            background-color: #ffffff;
            box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
            transition: right 0.3s ease;
            z-index: 1000;
            padding: 20px;
            overflow-y: auto;
        }

        .cart-sidebar.open {
            right: 0;
        }

        .cart-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 1px solid #dddfe2;
        }

        .cart-title {
            font-size: 20px;
            font-weight: 700;
        }

        .close-cart {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #65676b;
        }

        .cart-item {
            display: flex;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #f0f2f5;
        }

        .cart-item-image {
            width: 60px;
            height: 60px;
            background-color: #f0f2f5;
            border-radius: 4px;
            margin-right: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            color: #8a8d91;
        }

        .cart-item-details {
            flex: 1;
        }

        .cart-item-price {
            font-weight: 700;
            color: #1c1e21;
        }

        .cart-item-title {
            font-size: 14px;
            color: #1c1e21;
        }

        .remove-item {
            background: none;
            border: none;
            color: #65676b;
            cursor: pointer;
            padding: 4px;
        }

        .cart-total {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 2px solid #dddfe2;
            font-size: 18px;
            font-weight: 700;
            text-align: right;
        }

        .no-results {
            text-align: center;
            padding: 40px;
            color: #65676b;
            font-size: 16px;
        }

        @media (max-width: 768px) {
            .items-grid {
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            }
            
            .cart-sidebar {
                width: 100%;
                right: -100%;
            }
        }
    </style>
</head>
<body>
    <!-- Header with Search -->
    <header class="header">
        <div class="search-container">
            <input type="text" class="search-box" placeholder="Search for items..." id="searchInput">
            <button class="cart-button" id="cartButton">
                Cart (<span id="cartCount">0</span>)
            </button>
        </div>
    </header>

    <!-- Main Content -->
    <div class="container">
        <div class="marketplace-header">
            <h1 class="marketplace-title">Marketplace</h1>
        </div>
        
        <div class="items-grid" id="itemsGrid">
            <!-- Items will be dynamically inserted here -->
        </div>
    </div>

    <!-- Cart Sidebar -->
    <div class="cart-sidebar" id="cartSidebar">
        <div class="cart-header">
            <h2 class="cart-title">Your Cart</h2>
            <button class="close-cart" id="closeCart">&times;</button>
        </div>
        <div id="cartItems">
            <!-- Cart items will be dynamically inserted here -->
        </div>
        <div class="cart-total">
            Total: $<span id="cartTotal">0</span>
        </div>
    </div>

    <script>
        // Sample data based on your screenshot
        const itemsData = [
            { id: 1, price: "$200", title: "Room for rent", location: "Brisbane, QLD", image: "room1" },
            { id: 2, price: "$150", title: "Room for rent - female only", location: "Brisbane, QLD", image: "room2" },
            { id: 3, price: "$1,500", title: "2006 BMW", location: "Brisbane, QLD", locationExtra: "23% km", image: "car" },
            { id: 4, price: "$150", title: "iPhone 12 pro for parts", location: "Brisbane, QLD", image: "iphone" },
            { id: 5, price: "$280", title: "Canon 50 mark 2 full frame", location: "Brisbane, QLD", image: "camera" },
            { id: 6, price: "$180", title: "Room for rent", location: "Brisbane, QLD", image: "room3" },
            { id: 7, price: "$195,000", title: "2022 Chevrolet corvette", location: "", image: "corvette" },
            { id: 8, price: "$20", title: "Dissh Pink Floral Wrap Top size 8", location: "", image: "clothing" },
            { id: 9, price: "$50", title: "Instax mini 12", location: "", image: "camera2" },
            { id: 10, price: "$33,333,333", title: "For sale by private negotiation", location: "", image: "luxury" },
            { id: 11, price: "$50", title: "Samsung 3-in-1 wireless charger", location: "", image: "charger" },
            { id: 12, price: "$20", title: "Dubai Chocolate 230g | Belgium Chocolate", location: "", image: "chocolate" }
        ];

        let cart = [];
        let filteredItems = [...itemsData];

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            renderItems(filteredItems);
            updateCart();

            // Search functionality
            document.getElementById('searchInput').addEventListener('input', function(e) {
                const searchTerm = e.target.value.toLowerCase();
                filteredItems = itemsData.filter(item => 
                    item.title.toLowerCase().includes(searchTerm) ||
                    item.location.toLowerCase().includes(searchTerm) ||
                    item.price.toLowerCase().includes(searchTerm)
                );
                renderItems(filteredItems);
            });

            // Cart toggle
            document.getElementById('cartButton').addEventListener('click', function() {
                document.getElementById('cartSidebar').classList.add('open');
            });

            document.getElementById('closeCart').addEventListener('click', function() {
                document.getElementById('cartSidebar').classList.remove('open');
            });
        });

        // Render items to the grid
        function renderItems(items) {
            const itemsGrid = document.getElementById('itemsGrid');
            
            if (items.length === 0) {
                itemsGrid.innerHTML = '<div class="no-results">No items found matching your search.</div>';
                return;
            }

            itemsGrid.innerHTML = items.map(item => `
                <div class="item-card">
                    <div class="item-image">${item.image}</div>
                    <div class="item-details">
                        <div class="item-price">${item.price}</div>
                        <div class="item-title">${item.title}</div>
                        <div class="item-location">${item.location} ${item.locationExtra || ''}</div>
                        <button class="add-to-cart-btn" onclick="addToCart(${item.id})" 
                                data-item-id="${item.id}">
                            Add to Cart
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // Add item to cart
        function addToCart(itemId) {
            const item = itemsData.find(i => i.id === itemId);
            const existingItem = cart.find(cartItem => cartItem.id === itemId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    ...item,
                    quantity: 1
                });
            }

            updateCart();
            
            // Update button state
            const button = document.querySelector(`[data-item-id="${itemId}"]`);
            button.textContent = 'Added to Cart';
            button.classList.add('added');
            
            setTimeout(() => {
                button.textContent = 'Add to Cart';
                button.classList.remove('added');
            }, 2000);
        }

        // Remove item from cart
        function removeFromCart(itemId) {
            cart = cart.filter(item => item.id !== itemId);
            updateCart();
        }

        // Update cart UI
        function updateCart() {
            const cartItems = document.getElementById('cartItems');
            const cartCount = document.getElementById('cartCount');
            const cartTotal = document.getElementById('cartTotal');

            // Update cart count
            cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);

            // Update cart items
            if (cart.length === 0) {
                cartItems.innerHTML = '<div class="no-results">Your cart is empty</div>';
                cartTotal.textContent = '0';
                return;
            }

            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image">${item.image}</div>
                    <div class="cart-item-details">
                        <div class="cart-item-price">${item.price}</div>
                        <div class="cart-item-title">${item.title}</div>
                        <div>Quantity: ${item.quantity}</div>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">✕</button>
                </div>
            `).join('');

            // Calculate total (remove $ and commas, then convert to number)
            const total = cart.reduce((sum, item) => {
                const price = parseFloat(item.price.replace(/[$,]/g, ''));
                return sum + (price * item.quantity);
            }, 0);

            cartTotal.textContent = total.toLocaleString();
        }
    </script>
</body>
</html>