'use strict';
// File contains the POST endpoints for the profile page

//PUBLIC FUNCTIONS===================================================================
function apply_post(router, multer, db, cookieLogic){
	// Define post routes
	router.post("/update_profile", multer.fields([]), async (req, res) => {
		// Get the user
		let user = cookieLogic.get_user(req);
		if(user === "error"){
			res.status(403).redirect("/login");
		}
		else{
			// Attempt to update
			let update = await db.update_user(user, req.body.name, req.body.email);
			console.log(update);
			// Respond
			if(update !== "error"){
				// Success
				res.json({success: "User has been updated"});
			}else{
				// Nothing happened
				res.json({});
			}
		}
	});
}

module.exports = {
	apply_post: apply_post
}