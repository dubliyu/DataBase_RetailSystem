'use strict';

// Function contains profile events
let search_btn = document.getElementById("search");
search_btn.addEventListener('click', (event) => {
	// Get the original and the search containers
	let original_ctn = document.getElementById("original_container");
	let search_ctn = document.getElementById("search_container");

	// Make form object
	let formData = new FormData();
	let state_in = document.getElementById("state_in").value;
	let name_in = document.getElementById("name_in").value;
	if(name_in.trim().length === 0 && state_in.trim().length === 0){
		ShowMessage("Please type in a search parameter", true);
		return;
	}
	if(name_in.trim().length > 0){
		formData.append("name", name_in.trim());
	}
	if(state_in.trim().length > 0){
		formData.append("state", state_in.trim());
	}

	// Make post request
	let req = new XMLHttpRequest();
	req.open("POST", "/store_search");
	req.send(formData);

	// Handle response
	req.onreadystatechange = function() { 
		if (req.readyState === 4 && req.status == 200){
				// parse response
				let response = req.responseText;
				response = JSON.parse(response);

				// Interpret response
				if(typeof response.success === 'string' || typeof response.stores === "undefined"){
					ShowMessage("Could Not Load Stores", true);
				}
				else{
					LoadStores(response.stores)
				}
			}else{
				ShowMessage("Could Load Stores", true);
			}
		};
	});

let clear_btn = document.getElementById("clear");
clear_btn.addEventListener('click', (event) => {
	// Get the search container
	let search_ctn = document.getElementById("search_container");

	// Hide it
	search_ctn.style.display = "none";

	// Remove its table rows
	let rows = document.getElementsByClassName("copy");
	while(rows[0]) {
		rows[0].parentNode.removeChild(rows[0]);
	}

	// Clear input fields
	document.getElementById("state_in").value = "";
	document.getElementById("name_in").value = "";

	// Get original container
	let original_ctn = document.getElementById("original_container");

	// Show the original container
	original_ctn.style.display = "table";
});

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

function LoadStores(stores){
	// Hide msg container if it exists
	let msg_ctn = document.getElementById("msg_container");
	msg_ctn.style.display = "none";

	// Clear the search ctn if it shows
	let rows = document.getElementsByClassName("copy");
	while(rows[0]) {
		rows[0].parentNode.removeChild(rows[0]);
	}

	// Create search container
	let search_ctn = document.getElementById("search_container");
	for(let store of stores) {
		let store_elm = generate_store_elm(store);
    	search_ctn.appendChild(store_elm);
	}

	// Hide the original
	let original_ctn = document.getElementById("original_container");
	original_ctn.style.display = "none";

	// Show the search
	search_ctn.style.display = "table";
}

function generate_store_elm(store){
	// Create nodes
	let ctn = document.createElement("TR");
	let id = document.createElement("TD");
	let store_name = document.createElement("TD");
	let city = document.createElement("TD");
	let state = document.createElement("TD");
	let rating = document.createElement("TD");
	let year = document.createElement("TD");

	// Create text nodes
	let id_txt = document.createTextNode((store.StoreID? store.StoreID: ""));  
	let store_txt = document.createTextNode((store.StoreName? store.StoreName: ""));  
	let city_txt = document.createTextNode((store.City? store.City: ""));  
	let state_txt = document.createTextNode((store.State? store.State: ""));  
	let rating_txt = document.createTextNode((store.Rating? store.Rating: ""));  
	let year_txt = document.createTextNode((store.YearFounded? store.YearFounded: ""));  

	// Apend text nodes
	id.appendChild(id_txt);
	store_name.appendChild(store_txt);
	city.appendChild(city_txt);
	state.appendChild(state_txt);
	rating.appendChild(rating_txt);
	year.appendChild(year_txt);

	// Append node to container
	ctn.appendChild(id);
	ctn.appendChild(store_name);
	ctn.appendChild(city);
	ctn.appendChild(state);
	ctn.appendChild(rating);
	ctn.appendChild(year);

	// Add Class to ctainer
	ctn.classList.add("copy");

	// Return
	return ctn;
}
