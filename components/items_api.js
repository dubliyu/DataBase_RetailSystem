'use strict';
// File contains the POST endpoints for the store items page

//PUBLIC FUNCTIONS===================================================================
function apply_post(router, multer, db, cookieLogic){
	// Define post routes
	router.post("/item_search", multer.fields([]), async (req, res) => {
		// Get the user
		let user = cookieLogic.get_user(req);
		if(user === "error"){
			res.json({success: "error"});
		}
		else{
			// Search the store
			let items = await db.get_items(req.body.dept, req.body.brand, req.body.size);
			
			// Respond
			if(items !== "error"){
				// Success
				let isCust = (user.type === "custtomer" ? "true" : "false")
				res.json({items: items, isCust: isCust});
			}else{
				// Nothing happened
				res.json({success: "error"});
			}
		}
	});
	router.post("/update_items", multer.fields([]), async (req, res) => {
		// Get the user
		let user = cookieLogic.get_user(req);
		if(user === "error" || user.type === "customer"){
			res.json({});
		}
		else{
			// Get item as obj
			item = {
				upc: req.body.upc,
				size: req.body.size,
				color: req.body.color,
				desc: req.body.desc,
				brand: req.body.brand,
				price: req.body.price
			};

			// Attempt to update
			let update = await db.update_item(user, item);

			// Respond
			if(update !== "error"){
				// Success
				res.json({success: `Item ${item.upc} has been updated`});
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