function showFilters(op)
{
    let root = document.documentElement;

    root.style.setProperty("--elements-hidden", "none");

    if(op == "filter")
    {
        root.style.setProperty('--select-filter', "flex");
		root.style.setProperty('--select-ordemenu', "none");
	}
    else if(op == "ordermenu")
    {
        root.style.setProperty('--select-ordemenu', "flex");
		root.style.setProperty('--select-filter', "none");
    }
}

function checkbox_color_mobile(color)
{
	let checkboxs = document.getElementsByClassName("checkfilter-color");
	let checkBoxChecked;
    let quant = 1;

	for (let i = 0; i < checkboxs.length; i++) 
	{
		let checkName = checkboxs[i].getAttribute("name");

		if(checkName.split('-')[1] != color)
		{
			checkboxs[i].checked = false;
		}
		else
		{
            quant--;

            if(quant == 0)
			    checkBoxChecked = checkboxs[i];
		}
	}


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

function checkbox_range_mobile(value)
{
	let checkboxs = document.getElementsByClassName("checkfilter-range-price");
	let checkBoxChecked;
    let quant = 1;

	for (let i = 0; i < checkboxs.length; i++) 
	{	
		let checkName = checkboxs[i].getAttribute("name");

		if(checkName.split('-')[1] != value)
		{
			checkboxs[i].checked = false;
		}
		else
		{   
            quant--;

            if(quant == 0)
				checkBoxChecked = checkboxs[i];
		}
	}

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

function checkbox_size_mobile(value)
{
	let checkboxs = document.getElementsByClassName("checkfilter-size");
	let checkBoxChecked;
    let quant = 1;

	for (let i = 0; i < checkboxs.length; i++) 
	{
		let checkName = checkboxs[i].getAttribute("name");

		if(checkName.split('-')[1] != value)
		{
			checkboxs[i].checked = false;
		}
		else
		{
            quant--;

			if(quant == 0)
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

function selectFilter(value, op)
{
    if(op == "color")
    {
        filter_mobile_color_selected =  value;
    }
    else if(op == "size")
    {
        filter_mobile_size_selected = value;
    }
    else if(op == "range")
    {
        filter_mobile_range_selected =  value;
    }
}

function showHiddenFilters(index)
{
    let filters_group_hidden = document.getElementsByClassName("filter-group-mobile-hidden");
    let filter_category_show = document.getElementsByClassName("product-filter-category-mobile-show");
    let filter_group_button_hidden = document.getElementsByClassName("filter-group-mobile-button-hidden")[0];

    let imgsrc = filter_category_show[index].src.split("/");

    if(imgsrc[imgsrc.length - 1] == "add_black_24dp.svg")
    {
        filters_group_hidden[index - 1].style.display = "block";
        
        filter_group_button_hidden.style.display = "flex";

        filter_category_show[index].src = "./assets/icons/close_black_24dp.svg";
        
        quant_filter_mobile_open++;
    }
    else
    {
        filters_group_hidden[index - 1].style.display = "none";

        quant_filter_mobile_open--;

        if(quant_filter_mobile_open == 0)
            filter_group_button_hidden.style.display = "none";
        
        filter_category_show[index].src = "./assets/icons/add_black_24dp.svg";
    }
}

function closeShowingFilters(index)
{
    let filters_group_hidden = document.getElementsByClassName("filter-group-mobile-hidden");
    let filter_category_show = document.getElementsByClassName("product-filter-category-mobile-show");
    let filter_group_button_hidden = document.getElementsByClassName("filter-group-mobile-button-hidden")[0];

    let imgsrc = filter_category_show[index].src.split("/");

    if(imgsrc[imgsrc.length - 1] == "close_black_24dp.svg")
    {
        filters_group_hidden[index - 1].style.display = "none";

        quant_filter_mobile_open--;

        if(quant_filter_mobile_open == 0)
            filter_group_button_hidden.style.display = "none";
        
        filter_category_show[index].src = "./assets/icons/add_black_24dp.svg";
    }
}

function closeFilters(op)
{
    let root = document.documentElement;

    root.style.setProperty("--elements-hidden", "flex");

    if(op == "filter")
    {
	   root.style.setProperty('--select-filter', "none");
    }
    else if(op == "ordermenu")
    {
        root.style.setProperty('--select-ordemenu', "none");
    }
}

function applyFilters()
{
    console.log(filter_mobile_color_selected, filter_mobile_range_selected, filter_mobile_size_selected);

    if(filter_mobile_color_selected != "")
        checkbox_color_mobile(filter_mobile_color_selected);

    if(filter_mobile_size_selected != "")
        checkbox_size_mobile(filter_mobile_size_selected);

    if(filter_mobile_range_selected != "")
        checkbox_range_mobile(filter_mobile_range_selected);   
}

function clearFilters()
{      
    let checkboxs_color = document.getElementsByClassName("checkfilter-color");
    let checkboxs_size = document.getElementsByClassName("checkfilter-size");
    let checkboxs_range = document.getElementsByClassName("checkfilter-range-price");

    for (var i = 0; i < checkboxs_color.length; i++) 
    {
        checkboxs_color[i].checked = false;
    }

    closeShowingFilters(1);

    for (var i = 0; i < checkboxs_size.length; i++) 
    {
        checkboxs_size[i].checked = false;
    }

    closeShowingFilters(2);

    for (var i = 0; i < checkboxs_range.length; i++) 
    {
        checkboxs_range[i].checked = false;
    }

    checkbox_color_mobile(filter_mobile_color_selected);

    checkbox_size_mobile(filter_mobile_size_selected);

    checkbox_range_mobile(filter_mobile_range_selected);

    closeShowingFilters(3);
}