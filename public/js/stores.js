'use strict';

// Function contains profile events
let clear_btn = document.getElementById("clear");
clear_btn.addEventListener('click', (event) => {
	// Get the original and the search containers
	let original_ctn = document.getElementById("original_container");
	let search_ctn = document.getElementById("search_container");

	// Make form object
	let formData = new FormData();
	let state_in = document.getElementById("state_in").value;
	let name_in = document.getElementById("name_in").value;
	if(name_in.length > 0){
		formData.append("name", name_in);
	}
	if(state_in.length > 0){
		formData.append("state", state_in);
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
				if(typeof response.success === 'string'){//sdfshfgkjsgkjdhgghsdjkghdkrjghdfhgdfghjsgshdfgjkh
					Enable_and_Message(response.success, false);
				}
				else{
					Enable_and_Message("Could not Update", true);
				}
			}else{
				Enable_and_Message("Could not Update", true);
			}
		};
	});

let search_btn = document.getElementById("search");
search_btn.addEventListener('click', (event) => {
	// Get the search container
	let search_ctn = document.getElementById("search_container");

	// Hide it
	search_ctn.styles.display = "none";

	// Remove its children
	while (search_ctn.hasChildNodes()) {
		search_ctn.removeChild(search_ctn.lastChild);
	}

	// Get original container
	let original_ctn = document.getElementById("original_container");

	// Show the original container
	original_ctn.styles.display = "table";
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
