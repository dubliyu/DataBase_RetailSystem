'use strict';

// Function contains profile events
let search_btn = document.getElementById("search");
search_btn.addEventListener('click', (event) => {
	// Make form object
	let formData = new FormData();
	let dept_in = document.getElementById("dept_in").value;
	let brand_in = document.getElementById("brand_in").value;
	let size_in = document.getElementById("size_in").value;

	// Apprend to query
	if(dept_in.trim().length === 0 && brand_in.trim().length === 0 && size_in.trim().length === 0){
		ShowMessage("Please type in a search parameter", true);
		return;
	}
	if(dept_in.trim().length > 0){
		formData.append("dept", dept_in.trim());
	}
	if(brand_in.trim().length > 0){
		formData.append("brand", brand_in.trim());
	}
	if(size_in.trim().length > 0){
		formData.append("size", size_in.trim());
	}

	// Make post request
	ShowMessage("Searching...", false);
	let req = new XMLHttpRequest();
	req.open("POST", "/item_search");
	req.send(formData);

	// Handle response
	req.onreadystatechange = function() { 
		if (req.readyState === 4 && req.status == 200){
				// parse response
				let response = req.responseText;
				response = JSON.parse(response);

				// Interpret response
				if(typeof response.success === 'string' || typeof response.items === "undefined" || typeof response.isCust === "undefined"){
					ShowMessage("Could Not Load Items", true);
				}
				else{
					LoadItems(response.items, response.isCust)
				}
			}else{
				ShowMessage("Could Load Items", true);
			}
		};
	});

let clear_btn = document.getElementById("clear");
clear_btn.addEventListener('click', (event) => {
	// Make post request
	ShowMessage("Clearing...", false);
	let req = new XMLHttpRequest();
	req.open("POST", "/item_search");
	req.send(new FormData());

	// Clear the search fields
	document.getElementById("dept_in").value = "";
	document.getElementById("brand_in").value = "";
	document.getElementById("size_in").value = "";

	// Handle response
	req.onreadystatechange = function() { 
		if (req.readyState === 4 && req.status == 200){
				// parse response
				let response = req.responseText;
				response = JSON.parse(response);

				// Interpret response
				if(typeof response.success === 'string' || typeof response.items === "undefined" || typeof response.isCust === "undefined"){
					ShowMessage("Could Not Load Items", true);
				}
				else{
					LoadItems(response.items, response.isCust)
				}
			}else{
				ShowMessage("Could Load Items", true);
			}
		};
});

let save_btns = document.getElementsByClassName("save");
for(let save_btn of save_btns){
	save_btn.addEventListener('click', save_item);
}
function save_item(event){
	// Make form object
	let formData = new FormData();
	let parent = this.parentElement.parentElement;
	let upc = parent.children[0].innerText;
	let size = parent.children[1].firstChild.value;
	let color = parent.children[2].firstChild.value;
	let desc = parent.children[4].firstChild.value;
	let brand = parent.children[5].firstChild.value;
	let price = parent.children[6].firstChild.value;
	
	// Apprend to query
	if(!upc || !size || !color || !desc || !brand || !price){
		ShowMessage("Could Not Get the Items Properties", true);
		return;
	}
	if(upc.length === 0 || size.length === 0 ||
	 color.length === 0 || desc.length === 0 ||
	  brand.length === 0 || price.length === 0){
		ShowMessage("An item must have all fields filled", true);
		return;
	}
	formData.append("upc", upc);
	formData.append("size", size);
	formData.append("color", color);
	formData.append("desc", desc);
	formData.append("brand", brand);
	formData.append("price", price);

	// Make post request
	ShowMessage("Updating...", false);
	let req = new XMLHttpRequest();
	req.open("POST", "/update_items");
	req.send(formData);

	// Handle response
	req.onreadystatechange = function() { 
		if (req.readyState === 4 && req.status == 200){
				// parse response
				let response = req.responseText;
				response = JSON.parse(response);

				// Interpret response
				if(typeof response.success === 'undefined'){
					ShowMessage("Could Not Update Item " + upc.toString(), true);
				}
				else{
					ShowMessage(response.success, false);
				}
			}else{
				ShowMessage("Could Not Update Item " + upc.toString(), true);
			}
		};
}


function ShowMessage(msg, error){
	let msg_ctn = document.getElementById("msg_container");
	msg_ctn.innerText = msg;
	msg_ctn.style.display = "block";
	if(!error){
		msg_ctn.classList.add("green");
	}else{
		msg_ctn.classList.remove("green")
	}
}

function LoadItems(items, isCust){
	// Hide msg container if it exists
	let msg_ctn = document.getElementById("msg_container");
	msg_ctn.style.display = "none";

	// Clear the table
	let rows = document.getElementsByClassName("item_row");
	while(rows[0]) {
		rows[0].parentNode.removeChild(rows[0]);
	}

	// Append to the table
	let items_ctn = document.getElementById("items_ctn");
	for(let item of items) {
		let item_elm = generate_item_elm(item, isCust);
    	items_ctn.appendChild(item_elm);
	}
}

function generate_item_elm(item, isCust){
	// Create nodes
	let ctn = document.createElement("TR");
	let upc = document.createElement("TD");
	let size = document.createElement("TD");
	let color = document.createElement("TD");
	let dept = document.createElement("TD");
	let desc = document.createElement("TD");
	let brand = document.createElement("TD");
	let price = document.createElement("TD");
	let edit = document.createElement("TD");

	if(isCust === "false"){
		// Create inputs
		let size_in = document.createElement("INPUT");
		let color_in = document.createElement("INPUT");
		let desc_in = document.createElement("INPUT");
		let brand_in = document.createElement("INPUT");
		let price_in = document.createElement("INPUT");
		let edit_btn = document.createElement("A");

		// Stylize inputs
		size_in.type = "text";
		color_in.type = "text";
		desc_in.type = "text";
		brand_in.type = "text";
		price_in.type = "text";
		size_in.name = "input_size";
		color_in.name = "input_color";
		desc_in.name = "input_desc";
		brand_in.name = "input_brand";
		price_in.name = "input_price";
		size_in.value = (item.Size ? item.Size: "");
		color_in.value = (item.Color ? item.Color: "");
		desc_in.value = (item.Description ? item.Description: "");
		brand_in.value = (item.Brand ? item.Brand: "");
		price_in.value = (item.Price ? item.Price: "");
		edit_btn.href = "#";
		edit_btn.classList.add("editbtn");
		edit_btn.classList.add("save");
		edit_btn.appendChild( document.createTextNode("Save"));

		// Append input nodes
		size.appendChild(size_in);
		color.appendChild(color_in);
		desc.appendChild(desc_in);
		brand.appendChild(brand_in);
		price.appendChild(price_in);
		edit.appendChild(edit_btn);
	}
	else{
		// Create text nodes
		let size_txt = document.createTextNode((item.Size ? item.Size : ""));
		let color_txt = document.createTextNode((item.Color ? item.Color : ""));
		let desc_txt = document.createTextNode((item.Description ? item.Description : ""));
		let brand_txt = document.createTextNode((item.Brand ? item.Brand : ""));
		let price_txt = document.createTextNode((item.Price ? item.Price : ""));

		// Apend text nodes
		size.appendChild(size_txt);
		color.appendChild(color_txt);
		desc.appendChild(desc_txt);
		brand.appendChild(brand_txt);
		price.appendChild(price_txt);
	}

	// Create text nodes
	let upc_txt = document.createTextNode((item.UPC ? item.UPC: ""));  
	let dept_txt = document.createTextNode((item.Department ? item.Department: ""));  

	// Apend text nodes
	upc.appendChild(upc_txt);
	dept.appendChild(dept_txt);

	// Append node to container
	ctn.appendChild(upc);
	ctn.appendChild(size);
	ctn.appendChild(color);
	ctn.appendChild(dept);
	ctn.appendChild(desc);
	ctn.appendChild(brand);
	ctn.appendChild(price);
	if(isCust === "false"){
		ctn.appendChild(edit);
	}

	// Add Class to container
	ctn.classList.add("item_row");

	// Return
	return ctn;
}
