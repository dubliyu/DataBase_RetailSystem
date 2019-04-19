// Function contains profile events
let name_edit = document.getElementById("name_edit");
name_edit.addEventListener('click', (event) => {
	// Diable input
	Disable_and_wait();

	// Make form object
	let formData = new FormData();
	let name = document.getElementById("name_in").value;
	formData.append("name", name);

	// Make post request
	let req = new XMLHttpRequest();
	req.open("POST", "/update_profile");
	req.send(formData);

	// Handle response
	req.onreadystatechange = function() { 
		if (req.readyState === 4 && req.status == 200){
			// parse response
			let response = req.responseText;
			response = JSON.parse(response);

			// Interpret response
			if(typeof response.success === 'string'){
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

let email_edit = document.getElementById("email_edit");
if(email_edit !== null){
	email_edit.addEventListener('click', (event) => {
		// Diable input
		Disable_and_wait();

		// Make form object
		let formData = new FormData();
		let email = document.getElementById("email_in").value;
		formData.append("email", email);

		// Make post request
		let req = new XMLHttpRequest();
		req.open("POST", "/update_profile");
		req.send(formData);

		// Handle response
		req.onreadystatechange = function() { 
			if (req.readyState === 4 && req.status == 200){
				// parse response
				let response = req.responseText;
				response = JSON.parse(response);

				// Interpret response
				if(typeof response.success === 'string'){
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
}


function Disable_and_wait(){
	// Disable buttons
	let edit_btns = document.getElementsByClassName("editbtn");
	for(btn of edit_btns){
		btn.disabled = true;
	}

	// Show waiting
	let msg_ctn = document.getElementById("msg_container");
	msg_ctn.innerText = "Updating, Please wait...";
	msg_ctn.style.display = "block";
	msg_ctn.classList.add("green");
}

function Enable_and_Message(msg, error){
	// Enable Buttons
	let edit_btns = document.getElementsByClassName("editbtn");
	for(btn of edit_btns){
		btn.disabled = false;
	}

	// Show message
	let msg_ctn = document.getElementById("msg_container");
	msg_ctn.innerText = msg;
	msg_ctn.style.display = "block";
	if(!error){
		msg_ctn.classList.add("green");
	}else{
		msg_ctn.classList.remove("green")
	}
}


