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
	$("#total-cart").html(shoppingCart.totalPriceInCart());
}

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


// **********************************************************
// Shopping cart functions

var shoppingCart = {};

shoppingCart.cart = [];

shoppingCart.Item = function(name, price, unit) {
	this.name = name;
	this.price = price;
	this.unit = unit;
};
shoppingCart.addItemToCart = function(name, price, unit) {
	for (var i in cart) {
		if (cart[i].name === name) {
			cart[i].unit += unit;
			this.saveCart();
			return;
		}
	}
	var item = new this.Item(name, price, unit);
	cart.push(item);
	this.saveCart();
};
shoppingCart.removeUnitFromItem = function(name) {
	for (var i in cart) {
		if (cart[i].name === name) {
			cart[i].unit --;
			if (cart[i].unit === 0) {
				cart.splice(i, 1);
			}
			break;
		}
	}
	shoppingCart.saveCart();
};

shoppingCart.removeItemFromCart = function(name) {
	for (var i in cart) {
		if (cart[i].name === name) {
			cart.splice(i, 1);
			break;
		}
	}
	shoppingCart.saveCart();
};

shoppingCart.emptyCart = function() {
	cart = [];
	shoppingCart.saveCart();
};

shoppingCart.totalUnitInCart = function() {
	var totalCount = 0;
	for (var i in cart) {
		totalCount += cart[i].unit;
	}

	return totalCount;
};

shoppingCart.totalPriceInCart = function() {
	var totalPrice = 0;
	for (var i in cart) {
		totalPrice += cart[i].price * cart[i].unit;
	}
	return totalPrice.toFixed(2);
};

shoppingCart.listCart = function() {
	var cartCopy = [];
	for (var i in cart) {
		var item = cart[i];
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
	localStorage.setItem("shoppingCart", JSON.stringify(cart));
};

shoppingCart.loadCart = function() {
	cart = JSON.parse(localStorage.getItem("shoppingCart"));
};
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
shoppingCart.loadCart();
displayCart();
