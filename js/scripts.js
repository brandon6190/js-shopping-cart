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
			return;
		}
	}

	var item = new Item(name, price, unit);
	cart.push(item);
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
}

function removeItemFromCart(name) { // Removes chosen item from cart
	for (var i in cart) {
		if (cart[i].name === name) {
			cart.splice(i, 1);
			break;
		}
	}
}

function emptyCart() { // Removes all items from cart
	cart = [];
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


function listCart() { // array of Items
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





// saveCart()

// loadCart()

addItemToCart("Apple", 1.22, 1);
addItemToCart("Pear", 1.99, 3);
addItemToCart("Apple", 1.22, 2);
addItemToCart("Banana", .99, 2);
addItemToCart("Almond Milk", 4.99, 1);
addItemToCart("Honey", 8.99, 2);
addItemToCart("Bacon", 5.95, 2);
addItemToCart("Plush Toy", 7.99, 1);
addItemToCart("Apple", 1.22, 3);
addItemToCart("Pear", 1.99, 3);