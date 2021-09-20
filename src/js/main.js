var products;
var products_card = [];
var quant_row_to_show = 3;
var order_cards = "";   
var products_filted_id = [];
var cart = [];
var quant_products_hidden = 0;
var filter_mobile_color_selected = "";
var filter_mobile_size_selected = "";
var filter_mobile_range_selected = "";
var quant_filter_mobile_open = 0;

async function loadProducts()
{
    let response = await fetch("http://localhost:3000/clothing");
    let data = response.json().then(clothing => {return clothing});

    return data;
}

function showMoreProducts(showMoreButton)
{
    if(quant_products_hidden > 0)
    {
        quant_row_to_show += 2;
     
        limitCountProductShowing();
    }
    else
    {
        showMoreButton.style.display = "none";
    }
}

function limitCountProductShowing()
{
    (async () => {
        let count = 1;
        let grid = document.getElementsByClassName("product-grid")[0];
        
        const gridComputedStyle = window.getComputedStyle(grid);
        
        const gridColumnCount = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;
        
        let max_to_show = quant_row_to_show * gridColumnCount;

        quant_products_hidden = 0;

        products_card.forEach(element => 
        {   
            if(max_to_show >= count)
                element.style.display = "flex";
            else
            {
                element.style.display = "none";
                quant_products_hidden++;
            }
            
            count += 1;
        });

        if(quant_products_hidden > 0)
        {
            let showMoreButton = document.getElementsByClassName("show-more-products")[0];

            showMoreButton.style.display = "block";
        }
    })()
}

function addProductCart(product_id)
{
    if(!cart.includes(product_id))
    {
        cart.push(product_id);
        
        let wishlist_counter = document.getElementsByClassName("wishlist-counter")[0];
        let wishlist_counter_text = document.getElementsByClassName("wishlist-counter-text")[0];

        if(cart.length == 1)
            wishlist_counter.style.opacity = 1;
        
        wishlist_counter_text.textContent = cart.length;
    }    
}

function createProductCard(data)
{
    let product_card_container = document.createElement("div");
    
    product_card_container.classList.add("product-card-container");
    
    product_card_container.setAttribute("id", `product-card-${data.id}`);

    let product_card_img = document.createElement("img");

    product_card_img.src = data.image;
    
    product_card_container.appendChild(product_card_img);

    let product_card_title = document.createElement("span");

    product_card_title.innerHTML = data.title;

    product_card_title.classList.add("product-card-title");

    product_card_container.appendChild(product_card_title);

    let product_card_price = document.createElement("span");

    product_card_price.innerHTML = `R$ ${ ( data.price ).toFixed(2).replace('.',',') }`;

    product_card_price.classList.add("product-card-price");

    product_card_container.appendChild(product_card_price);

    let product_card_portion = document.createElement("span");

    product_card_portion.innerHTML = `até ${data.portion}x de R$${ ( data.price / data.portion ).toFixed(2).replace('.',',') }`;

    product_card_portion.classList.add("product-card-portion");

    product_card_container.appendChild(product_card_portion);
    
    let product_card_buy_button = document.createElement("button");

    product_card_buy_button.innerHTML = "COMPRAR";

    product_card_buy_button.classList.add("product-card-buy-button");

    product_card_buy_button.setAttribute("onclick", `addProductCart("${product_card_container.id}")`)

    product_card_container.appendChild(product_card_buy_button);

    return product_card_container;
}

function updateProductCard(condition)
{
    let product_grid = document.getElementsByClassName("product-grid")[0];


    while (product_grid.firstChild) 
    {
        product_grid.removeChild(product_grid.lastChild);
    }

    while(products_card.length)
    {
        products_card.pop();
    }

    if(order_cards != condition)
    {

        order_cards = condition;

        (async () => {
            let data = (await products).slice();
            
            if(condition.trim() == "Menor preço") 
            {
    
                data = data.sort((a, b) => {
                    if(a.price < b.price) 
                        return -1;
                    return 1;
                });
            } 
            else if(condition.trim() == "Maior preço")
            {
                data = data.sort((a, b) => {
                    if(a.price > b.price)
                        return -1;
                    return 1;
                });
            } 
            else if(condition.trim() == "Mais recentes") 
            {

                data = data.sort((a, b) => {
                    if(new Date(a.date) < new Date(b.date))
                        return -1;
                    return 1;
                });
            }

            for(let i = 0;i < data.length; i++)
            {
                let product_card = createProductCard(data[i]);
    
                products_card.push(product_card);
        
                product_grid.appendChild(product_card);
            }
        })()   
    }
    else
    {
        order_cards = "";

        (async () => {
            let data = (await products).slice();

            for(let i = 0;i < data.length; i++)
            {
                let product_card = createProductCard(data[i]);
    
                products_card.push(product_card);
        
                product_grid.appendChild(product_card);
            }
        })()   
    }

    (async () => {
        if(products_filted_id.length > 0)
        {
            (await products_card).forEach(element => 
            {
                if(!products_filted_id.includes(element.id))
                    element.style.display = "none";
            });
        }
    })()

    limitCountProductShowing();
}

products = loadProducts();

window.onload = function()
{
	let elem = document.getElementById("order-menu-content");

    (async() => {
        let data = await products;
    
        let product_grid = document.getElementsByClassName("product-grid")[0];
    
        for(let i = 0;i < data.length; i++)
        {
            let product_card = createProductCard(data[i]);

            products_card.push(product_card);
    
            product_grid.appendChild(product_card);
        }
    })()

	document.onclick = (event) => {
        
        if(event.target.id != "order-menu-content" && event.target.id != "dropbth")
        {
            if(elem.classList.length > 1)
                elem.classList.remove("order-dropdown-active");
        }
    };

};

window.addEventListener("DOMContentLoaded", limitCountProductShowing);
window.addEventListener("resize", limitCountProductShowing);
