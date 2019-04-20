'use strict';

let submit_btn = document.getElementById("submit");
submit_btn.addEventListener('click', (event) => {
	// Make form object
	let formData = new FormData();
	let comment = document.getElementById("comment_in").value;

	// Apprend to query
	if(comment.trim().length === 0){
		ShowMessage("Please Enter in a Comment", true);
		return;
	}
	formData.append("comment", comment.trim());

	// Make post request
	ShowMessage("Saving...", false);
	let req = new XMLHttpRequest();
	req.open("POST", "/new_comment");
	req.send(formData);

	// Handle response
	req.onreadystatechange = function() { 
		if (req.readyState === 4 && req.status == 200){
				// parse response
				let response = req.responseText;
				response = JSON.parse(response);

				// Interpret response
				if(typeof response.success === 'string' && response.success === 'success'){
					ShowMessage("Comment has been Saved", false);
				}
				else{
					ShowMessage("Could Not Save Comment", true);
				}
			}else{
				ShowMessage("Could Not Save Comment", true);
			}
		};
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