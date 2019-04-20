'use strict';
// File contains the POST endpoints for the store search page

//PUBLIC FUNCTIONS===================================================================
function apply_post(router, multer, db, cookieLogic){
	// Define post routes
	router.post("/store_search", multer.fields([]), async (req, res) => {
		// Get the user
		let user = cookieLogic.get_user(req);
		if(user === "error"){
			res.json({success: "error"});
		}
		else{
			// Search the store
			let stores = await db.get_stores(req.body.name, req.body.state);
			
			// Respond
			if(stores !== "error"){
				// Success
				res.json({stores: stores});
			}else{
				// Nothing happened
				res.json({success: "error"});
			}
		}
	});
}

module.exports = {
	apply_post: apply_post
}