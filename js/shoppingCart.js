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

shoppingCart.setCountForItem = function(name, count) {
	for (var i in this.cart) {
		if (this.cart[i].name === name) {
			this.cart[i].unit = count;
			break;		
		}
	}
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