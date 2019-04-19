'use strict';
// File contains the POST endpoints for the login page

//PUBLIC FUNCTIONS===================================================================
function apply_post(router, multer, db, cookieLogic){
		// Define post routes
	router.post("/login", multer.fields([]), async (req, res) => {
		// Attempt to login user
		let user = await db.login(req.body.username, req.body.password);
		
		// Redirect to proper page or show error
		if(user.type !== "customer" && user.type !== "employee" && user.type !== "manager"){
			res.json({ success: false });
		}
		else{
			cookieLogic.create_user(user.type, user.id, req);
			res.json({success: true, redirect: "/home"});
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