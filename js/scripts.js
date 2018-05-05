var cart = [];

var Item = function(name, price, unit) {
	this.name = name;
	this.price = price;
	this.unit = unit;
};

function addItemToCart(name, price, unit) {
	for (var i in cart) {
		if (cart[i].name === name) {
			cart[i].unit += unit;
			cart[i].price += price;
			return;
		}
	}

	var item = new Item(name, price, unit);
	cart.push(item);
	saveCart();
}

function removeUnitFromItem(name) { // Removes one unit from chosen item
	for (var i in cart) {
		if (cart[i].name === name) {
			cart[i].unit --;
			if (cart[i].unit === 0) {
				cart.splice(i, 1);
			}
			break;
		}
	}
	saveCart();
}

function removeItemFromCart(name) { // Removes chosen item from cart
	for (var i in cart) {
		if (cart[i].name === name) {
			cart.splice(i, 1);
			break;
		}
	}
	saveCart();
}

function emptyCart() { // Removes all items from cart
	cart = [];
	saveCart();
}

function totalUnitInCart() { // Returns the total amount of units in the cart 
	var totalCount = 0;
	for (var i in cart) {
		totalCount += cart[i].unit;
	}

	return totalCount;
}

function totalPriceInCart() { // Returns the total amount of the price in the cart
	var totalPrice = 0;
	for (var i in cart) {
		totalPrice += cart[i].price;
	}
	return totalPrice;
}


function listCart() { // Returns cart as an array
	var cartCopy = [];
	for (var i in cart) {
		var item = cart[i];
		var itemCopy = {};
		for (var p in item) {
			itemCopy[p] = item[p];
		}
		cartCopy.push(itemCopy);
	}	
	return cartCopy;
}


function saveCart() { // Saves Cart into the files local storage
	localStorage.setItem("shoppingCart", JSON.stringify(cart));
}


function loadCart() { // Loads the shopping cart from the files local storage
	cart = JSON.parse(localStorage.getItem("shoppingCart"));
}
