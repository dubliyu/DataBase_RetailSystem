'use strict';
// File contains the POST endpoints for the comment page

//PUBLIC FUNCTIONS===================================================================
function apply_post(router, multer, db, cookieLogic){
	// Define post routes
	router.post("/new_comment", multer.fields([]), async (req, res) => {
		// Get the user
		let user = cookieLogic.get_user(req);
		if(user === "error" || user.type !== "customer"){
			res.json({});
		}
		else{
			// Attempt to update
			let update = await db.insert_comment(req.body.comment);

			// Respond
			if(update !== "error"){
				// Success
				res.json({success: "success"});
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