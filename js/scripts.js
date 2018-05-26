$(".add-to-cart").click(function(event){
	event.preventDefault();
	var name = $(this).attr("data-name");
	var price = Number ($(this).attr("data-price"));

	shoppingCart.addItemToCart(name, price, 1);
	displayCart();
});

$("#clear-cart").click(function(event) {
	shoppingCart.emptyCart();
	displayCart();
});

$("#show-cart").on("click", ".delete-item", function(event) { // Clears Selected Item from cart
	var name = $(this).attr("data-name");
	shoppingCart.removeItemFromCart(name);
	displayCart();
});

$("#show-cart").on("click", ".subtract-item", function(event) { // Subtracts 1 unit from the selected item
	var name = $(this).attr("data-name");
	shoppingCart.removeUnitFromItem(name);
	displayCart();
});

$("#show-cart").on("click", ".add-item", function(event) { // Adds 1 unit to the selected item
	var name = $(this).attr("data-name");
	shoppingCart.addItemToCart(name, 0, 1);
	displayCart();
});

function displayCart() {
	var cartArray = shoppingCart.listCart();
	var output = "";
	for (var i in cartArray) {
		output += `<li>
		${cartArray[i].name} 
		${cartArray[i].unit} x ${cartArray[i].price} = $${cartArray[i].total} 
		<button class="add-item" data-name="${cartArray[i].name}">+</button>
		<button class="subtract-item" data-name="${cartArray[i].name}">-</button> 
		<button class="delete-item" data-name="${cartArray[i].name}">X</button>
		</li>`
	}
	$("#show-cart").html(output);
	$("#total-items").html(shoppingCart.totalUnitInCart());
	$("#total-cart").html(shoppingCart.totalPriceInCart());
}

// **********************************************************
// Shopping Cart Object/Functions

var shoppingCart = {};

shoppingCart.cart = [];

shoppingCart.Item = function(name, price, unit) {
	this.name = name;
	this.price = price;
	this.unit = unit;
};

shoppingCart.addItemToCart = function(name, price, unit) {
	for (var i in this.cart) {
		if (this.cart[i].name === name) {
			this.cart[i].unit += unit;
			this.saveCart();
			return;
		}
	}
	var item = new this.Item(name, price, unit);
	this.cart.push(item);
	this.saveCart();
};

shoppingCart.removeUnitFromItem = function(name) {
	for (var i in this.cart) {
		if (this.cart[i].name === name) {
			this.cart[i].unit --;
			if (this.cart[i].unit === 0) {
				this.cart.splice(i, 1);
			}
			break;
		}
	}
	this.saveCart();
};

shoppingCart.removeItemFromCart = function(name) {
	for (var i in this.cart) {
		if (this.cart[i].name === name) {
			this.cart.splice(i, 1);
			break;
		}
	}
	this.saveCart();
};

shoppingCart.emptyCart = function() {
	this.cart = [];
	this.saveCart();
};

shoppingCart.totalUnitInCart = function() {
	var totalCount = 0;
	for (var i in this.cart) {
		totalCount += this.cart[i].unit;
	}

	return totalCount;
};

shoppingCart.totalPriceInCart = function() {
	var totalPrice = 0;
	for (var i in this.cart) {
		totalPrice += this.cart[i].price * this.cart[i].unit;
	}
	return totalPrice.toFixed(2);
};

shoppingCart.listCart = function() {
	var cartCopy = [];
	for (var i in this.cart) {
		var item = this.cart[i];
		var itemCopy = {};
		for (var p in item) {
			itemCopy[p] = item[p];
		}
		itemCopy.total = (item.price * item.unit).toFixed(2);
		cartCopy.push(itemCopy);
	}	
	return cartCopy;
};

shoppingCart.saveCart = function() {
	localStorage.setItem("shoppingCart", JSON.stringify(this.cart));
};

shoppingCart.loadCart = function() {
	this.cart = JSON.parse(localStorage.getItem("shoppingCart"));
};

shoppingCart.loadCart();
displayCart();

console.log('Shopping Cart: cart');
console.log(shoppingCart.cart);
console.log('Global Cart:');
console.log(this.cart);

// cart : Array
// Item : object/class

// addItemToCart : Fucntion
// removeUnitFromItem : Function
// removeItemFromCart : Function
// emptyCart : Function
// totalUnitInCart : Function
// totalPriceInCart : Function
// listCart : Function
// saveCart : Function
// loadCart : Function