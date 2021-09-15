function checkbox_color(value)
{
	let checkboxs = document.getElementsByClassName("checkfilter-color");
	
	for (let i = 0; i < checkboxs.length; i++) 
	{
		
		let checkName = checkboxs[i].getAttribute("name");

		if(checkName.split('-')[1] != value)
		{
			checkboxs[i].checked = false;
		}
		
	}
}

function checkbox_range(value)
{
	let checkboxs = document.getElementsByClassName("checkfilter-range-price");
	
	for (let i = 0; i < checkboxs.length; i++) 
	{
		
		let checkName = checkboxs[i].getAttribute("name");

		if(checkName.split('-')[1] != value)
		{
			checkboxs[i].checked = false;
		}
		
	}
}

function checkbox_size_span(text)
{
	let checkboxs = document.getElementsByClassName("checkfilter-size");
	
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
		}
		
	}
}

function checkbox_size(value)
{
	let checkboxs = document.getElementsByClassName("checkfilter-size");
	
	for (let i = 0; i < checkboxs.length; i++) 
	{
		
		let checkName = checkboxs[i].getAttribute("name");

		if(checkName.split('-')[1] != value)
		{
			checkboxs[i].checked = false;
		}
		
	}
}