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

$("#show-cart").on("change", ".item-count", function(event){
	var name = $(this).attr("data-name");
	var count = Number ( $(this).val() );
	shoppingCart.setCountForItem(name, count);
	displayCart();
});

function displayCart() {
	var cartArray = shoppingCart.listCart();
	var output = "";
	for (var i in cartArray) {
		output += `<li>
		${cartArray[i].name} 
		<input class="item-count" type="number" data-name="${cartArray[i].name}" value="${cartArray[i].unit}"> 
		x ${cartArray[i].price} = $${cartArray[i].total} 
		<button class="add-item" data-name="${cartArray[i].name}">+</button>
		<button class="subtract-item" data-name="${cartArray[i].name}">-</button> 
		<button class="delete-item" data-name="${cartArray[i].name}">X</button>
		</li>`
	}
	$("#show-cart").html(output);
	$("#total-items").html(shoppingCart.totalUnitInCart());
	$("#total-cart").html(shoppingCart.totalPriceInCart());
}

displayCart();

// console.log('Shopping Cart: cart');
// console.log(shoppingCart.cart);
// console.log('Global Cart:');
// console.log(this.cart);