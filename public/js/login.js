'use strict';

// Add event listener to attempt log in
let login_btn = document.getElementById("login");
login_btn.addEventListener('click', (event) => {
	// Get form fields
	let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;

	// Make form object
	let formData = new FormData();
	formData.append("username", username);
	formData.append("password", password);

	// Make post request
	let req = new XMLHttpRequest();
	req.open("POST", "/login");
	req.send(formData);

	// Handle response
	req.onreadystatechange = function() { 
		if (req.readyState === 4 && req.status == 200){
			// parse response
			let response = req.responseText;
			response = JSON.parse(response);

			// check response
			if(response.success === false){
				// Get the msg container
				let msg_ctn = document.getElementById("msg_container");

				// show the the div with the error message
				msg_ctn.innerText = "Bad login information";
				msg_ctn.style.display = "block";
			}
		}
	};
});

// Add event listener to create login btn
let create_btn = document.getElementById("create_user");
let state = "show"
create_btn.addEventListener('click', (event) => {
	if(state === "show"){
		// Show the other input fields
		document.getElementById("container_email").style.display = "flex";
		document.getElementById("container_name").style.display = "flex";

		// Hide login btn
		document.getElementById("login").style.display = "none";

		// Show submit btn
		document.getElementById("submit").style.display = "block";
		state = "hide";
	}
	else{
		// Show the other input fields
		document.getElementById("container_email").style.display = "none";
		document.getElementById("container_name").style.display = "none";

		// Show login btn
		document.getElementById("login").style.display = "block";

		// Hide submit btn
		document.getElementById("submit").style.display = "none";
		state = "show"
	}
});

// Add event listener to the create login submit btn
let submit_btn = document.getElementById("submit");
submit_btn.addEventListener('click', (event) => {
	// Get form fields
	let username = document.getElementById("username").value;
	let password = document.getElementById("password").value;
	let email = document.getElementById("email").value;
	let name = document.getElementById("name").value;

	// Make form object
	let formData = new FormData();
	formData.append("username", username);
	formData.append("password", password);
	formData.append("email", email);
	formData.append("name", name);

	// Make post request
	let req = new XMLHttpRequest();
	req.open("POST", "/create_user");
	req.send(formData);

	// Handle response
	req.onreadystatechange = function() { 
		if (req.readyState === 4 && req.status == 200){
			// parse response
			let response = req.responseText;
			response = JSON.parse(response);

			// check response
			if(response.success === false){
				// Get the msg container
				let msg_ctn = document.getElementById("msg_container");

				// show the the div with the error message
				msg_ctn.innerText = "Bad login information";
				msg_ctn.style.display = "block";
			}
		}
	};
});
