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
	
	elem.classList.remove("order-dropdown-active");
}