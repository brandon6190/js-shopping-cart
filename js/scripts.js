var cart = [];

var Item = function(name, price, count) {
	this.name = name;
	this.price = price;
	this.count = count;
};

function addItemToCart(name, price, count) {
	for (var i in cart) {
		if (cart[i].name === name) {
			cart[i].count += count;
			return;
		}
	}
	var item = new Item(name, price, count);
	cart.push(item);
}

addItemToCart("Apple", 1.22, 1);
addItemToCart("Pear", 1.99, 3);
addItemToCart("Apple", 1.22, 2);
addItemToCart("Apple", 1.22, 2);


function removeItemFromCart(name) { // Removes one item
	for (var i in cart) {
		if (cart[i].name === name) {
			cart[i].count --;
			if (cart[i].count === 0) {
				cart.splice(i, 1);
			}
			break;
		}
	}
}
console.log(cart);

console.log(cart[0].count);

console.log(cart);

// removeItemFromCartAll(name) // Removes all items name

// clearCart()

// countCart() -> return total count

// totalCart() -> return total cost

// listCart() -> array of Item

// saveCart()

// loadCart()