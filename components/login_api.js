'use strict';
// File contains the POST endpoints for the login page

//PUBLIC FUNCTIONS===================================================================
function apply_post(router, multer, db, cookieLogic){
		// Define post routes
	router.post("/login", multer.fields([]), async (req, res) => {
		// Attempt to login user
		let user_type = await db.login(req.body.username, req.body.password);
		
		// Redirect to proper page or show error
		switch(user_type){
			case "customer":
				cookieLogic.create_user('customer', req);
				res.json({success: true, redirect: "/home"});
				break;
			case "manager":
			case "employee":
				cookieLogic.create_user(user_type, req);
				res.json({success: true, redirect: "/home"});
				break;
			case "error":
				res.json({ success: false });
				break;
			default:
				console.log("Unexpected user type: ", user_type);
		}
	});
	router.post("/create_user", multer.fields([]), async (req, res) => {
		// Check which type of creation is this
		let user_type = req.body.user_type;

		// Insert customer
		let cust = {
			name: req.body.name,
			email: req.body.email,
			username: req.body.username,
			password: req.body.password
		};
		let result = await db.create_user_cust(cust);


		// Send back results
		if(result === "error"){
			res.json({ success: false });
		}
		else{
			res.json({ success: true });
		}
	});
	router.post("/logout", multer.fields([]), async (req, res) => {
		cookieLogic.remove_user(req);
		res.clearCookie('track_id');
		res.json({redirect: "/login"});
	});
}

module.exports = {
	apply_post: apply_post
}