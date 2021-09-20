function order_menu_onclick() 
{
	let elem = document.getElementById("order-menu-content");
	
	if(elem.classList.length == 1)
		elem.classList.add("order-dropdown-active");
	else
		elem.classList.remove("order-dropdown-active");
}

function order_menu_select_option(option)
{
	let elem = document.getElementById("order-menu-content");
	
	updateProductCard(option.textContent);

	elem.classList.remove("order-dropdown-active");
}

function order_menu_select_mobile_option(option)
{
	updateProductCard(option.textContent);
}