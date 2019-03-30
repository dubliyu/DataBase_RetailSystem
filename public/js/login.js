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
	req.open("POST", window.location.host + "/login");
	req.send(formData);
});

// Parse the url for a bad login
if(window.location.search.substr(1) === "error=true"){
	// Get the msg container
	msg_ctn = document.getElementById("msg_container");

	// show the the div with the error message
	error_ctn.innerText = "Bad login information";
	error_msg.style.display = "block";
}