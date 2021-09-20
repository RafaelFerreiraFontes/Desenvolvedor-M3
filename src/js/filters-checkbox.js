function productsShowing()
{
	for(let i = 0;i < products_card.length; i++)
	{	
				if(products_filted_id.length > 0 && products_filted_id.includes(products_card[i].id))
					products_card[i].style.display = "flex";
				else if(products_filted_id.length == 0)
					products_card[i].style.display = "flex";
	}
}

function show_all_colors()
{
	let colors_hidden = document.getElementById("filter_color_hidden");
	let color_text_show = document.getElementById("filter_color_text_show");
	let color_text_less = document.getElementById("filter_color_text_hidden");

	color_text_show.style.display = "none";

	color_text_less.style.display = "flex";
	
	colors_hidden.style.display = "block";
}

function show_less_colors()
{
	let colors_hidden = document.getElementById("filter_color_hidden");
	let color_text_show = document.getElementById("filter_color_text_show");
	let color_text_less = document.getElementById("filter_color_text_hidden");

	color_text_show.style.display = "flex";
	
	color_text_less.style.display = "none";

	colors_hidden.style.display = "none";
}

function checkbox_color(color)
{
	let checkboxs = document.getElementsByClassName("checkfilter-color");
	let checkBoxChecked;

	for (let i = 0; i < checkboxs.length; i++) 
	{
		let checkName = checkboxs[i].getAttribute("name");

		if(checkName.split('-')[1] != color)
		{
			checkboxs[i].checked = false;
		}
		else
		{
			if(checkboxs[i].checked)
				checkBoxChecked = checkboxs[i];
		}
	}

	if(checkBoxChecked == undefined)
		return;

	if(checkBoxChecked.checked)
	{
		(async () => {
			let products_filter_id = [];

			(await products).forEach(product => {

				if(product.color.includes(color))
				{
					products_filter_id.push(`product-card-${product.id}`);
					
					products_filted_id.push(`product-card-${product.id}`);
				}
			});

			products_card.forEach(element => {
				if(!products_filter_id.includes(element.id))
					element.style.display = "none";
			});

		})();
		
	
	}
	else
	{
		(async () => {

			(await products).forEach(product => {

				if(product.color.includes(color))
				{
					let index = products_filted_id.indexOf(`product-card-${product.id}`);

					if(index > -1)
						products_filted_id.splice(index, 1);
				}
			});

			productsShowing()
			
			limitCountProductShowing();
		})();
	}

}

function checkbox_range(value)
{
	let checkboxs = document.getElementsByClassName("checkfilter-range-price");
	let checkBoxChecked;

	for (let i = 0; i < checkboxs.length; i++) 
	{	
		let checkName = checkboxs[i].getAttribute("name");

		if(checkName.split('-')[1] != value)
		{
			checkboxs[i].checked = false;
		}
		else
		{
			if(checkboxs[i].checked)
				checkBoxChecked = checkboxs[i];
		}
	}

	if(checkBoxChecked == undefined)
		return;

	let range_min = 0;
	let range_max = 0;

	if(value == "range0")
	{
		range_min = 501.00;
		range_max = Number.MAX_VALUE;
	}
	else if(value == "range1")
	{
		range_min = 0;
		range_max = 50.00;
	}
	else if(value == "range2")
	{
		range_min = 51.00;
		range_max = 150.00;
	}
	else if(value == "range3")
	{
		range_min = 151.00;
		range_max = 300.00;
	}
	else if(value == "range4")
	{
		range_min = 301.00;
		range_max = 500.00;
	}

	if(checkBoxChecked.checked)
	{		
		(async () => {
			let products_filter_id = [];

			(await products).forEach(product => {

				if(product.price >= range_min && product.price <= range_max)
				{
					products_filter_id.push(`product-card-${product.id}`);
					
					products_filted_id.push(`product-card-${product.id}`);
				}
			});

			products_card.forEach(element => {
				if(!products_filter_id.includes(element.id))
					element.style.display = "none";
			});
		})();

	}
	else
	{
		(async () => {

			(await products).forEach(product => {

				if(product.price >= range_min && product.price <= range_max)
				{
					let index = products_filted_id.indexOf(`product-card-${product.id}`);

					if(index > -1)
						products_filted_id.splice(index, 1);
				}
			});

			productsShowing()

			limitCountProductShowing();
		})();

	}

}

function checkbox_size_span(text)
{
	let checkboxs = document.getElementsByClassName("checkfilter-size");
	let checkBoxChecked;

	for (let i = 0; i < checkboxs.length; i++) 
	{
		let checkName = checkboxs[i].getAttribute("name");

		if(checkName.split('-')[1] != text)
		{
			checkboxs[i].checked = false;
		}
		else
		{
			checkboxs[i].checked = !checkboxs[i].checked;
			
			checkBoxChecked = checkboxs[i];
		}
	}

	if(checkBoxChecked.checked)
	{
		
		(async () => {
			let products_filter_id = [];

			(await products).forEach(product => {

				if(product.size == text)
				{
					products_filter_id.push(`product-card-${product.id}`);
					
					products_filted_id.push(`product-card-${product.id}`);
				}
			});

			products_card.forEach(element => {
				if(!products_filter_id.includes(element.id))
					element.style.display = "none";
			});	
		})();

	}
	else
	{
		(async () => {

			(await products).forEach(product => {

				if(product.size == text)
				{
					let index = products_filted_id.indexOf(`product-card-${product.id}`);

					if(index > -1)
						products_filted_id.splice(index, 1);
				}
			});

			productsShowing()

			limitCountProductShowing();
		})();
	}

}

function checkbox_size(value)
{
	let checkboxs = document.getElementsByClassName("checkfilter-size");
	let checkBoxChecked;

	for (let i = 0; i < checkboxs.length; i++) 
	{
		let checkName = checkboxs[i].getAttribute("name");

		if(checkName.split('-')[1] != value)
		{
			checkboxs[i].checked = false;
		}
		else
		{
			if(checkboxs[i].checked)
				checkBoxChecked = checkboxs[i];
		}
	}

	if(checkBoxChecked == undefined)
		return;

	if(checkBoxChecked.checked)
	{
		
		(async () => {
			let products_filter_id = [];

			(await products).forEach(product => {

				if(product.size === value)
				{
					products_filter_id.push(`product-card-${product.id}`);
					
					products_filted_id.push(`product-card-${product.id}`);
				}
			});
			
			products_card.forEach(element => {
				if(!products_filter_id.includes(element.id))
					element.style.display = "none";
			});
		})();

	}
	else
	{
		(async () => {

			(await products).forEach(product => {

				if(product.size == value)
				{
					let index = products_filted_id.indexOf(`product-card-${product.id}`);

					if(index > -1)
						products_filted_id.splice(index, 1);
				}
			});

			productsShowing()

			limitCountProductShowing();
		})();
	}

}