window.onload = function()
{
	let elem = document.getElementById("order-menu-content");

	document.onclick = (event) => {
        
        if(event.target.id != "order-menu-content" && event.target.id != "dropbth")
        {
            if(elem.classList.length > 1)
                elem.classList.remove("order-dropdown-active");
        }
    };
};