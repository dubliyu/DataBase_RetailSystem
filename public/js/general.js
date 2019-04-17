// Function contains general javascript code for all the files
let login_btn = document.getElementById("logout_btn");
login_btn.addEventListener('click', (event) => {
		// Make form object
	let formData = new FormData();
	formData.append("command", "logout");

	// Make post request
	let req = new XMLHttpRequest();
	req.open("POST", "/logout");
	req.send(formData);

	// Handle response
	req.onreadystatechange = function() { 
		if (req.readyState === 4 && req.status == 200){
			// parse response
			let response = req.responseText;
			response = JSON.parse(response);

			// redirect
			if(typeof response.redirect === 'string'){
				window.location = response.redirect;
			}
			else{
				window.location = "/login";
			}
			
		}
	};
});
