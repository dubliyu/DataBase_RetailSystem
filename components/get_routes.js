'use strict';
// File contains the GET endpoints for all pages

//PUBLIC FUNCTIONS===================================================================
function apply_get(router, cookieLogic, path, express, db){
	router.get("/login", (req, res) => {
		res.sendFile(path.join(__dirname, '..', '/public/html/login.html'));
	});
	router.get("/home", (req, res) => {
		let type = cookieLogic.get_user_type(req);
		if(type == "error"){
			res.status(403).redirect("/login");
		}
		else{
			res.render('home.ejs', {user_type: type});
		}
	});
	router.get("/about", (req, res) => {
		if(cookieLogic.get_user_type(req) == "error"){
			res.status(403).redirect("/login");
		}
		else{
			res.sendFile(path.join(__dirname, '..', '/public/html/about.html'));
		}
	});
	router.get("/stores", async (req, res) => {
		let user = cookieLogic.get_user(req);
		if(user === "error"){
			res.status(403).redirect("/login");
		}
		else{
			let stores = await db.get_stores(undefined, undefined);
			res.render('stores.ejs', {user_type: user.type, stores: stores});
		}
	});
	router.get("/transactions", async (req, res) => {
		let user = cookieLogic.get_user(req);
		if(user === "error"){
			res.status(403).redirect("/login");
		}
		else{
			let trans_arr = await db.get_transactions(user);
			res.render('transactions.ejs', {user_type: user.type, all_trans: trans_arr});
		}
	});
	router.get("/stock", (req, res) => {
		if(cookieLogic.get_user_type(req) == "error"){
			res.status(403).redirect("/login");
		}
		else{
			res.sendFile(path.join(__dirname, '..', '/public/html/stock.html'));
		}
	});
	router.get("/profile", async (req, res) => {
		let user = cookieLogic.get_user(req);
		if(user === "error"){
			res.status(403).redirect("/login");
		}
		else{
			let profile = await db.get_profile(user);
			profile.user_type = user.type;
			res.render('profile.ejs', profile);
		}
	});
	router.get("/comments", (req, res) => {
		// Check if user is allowed type
		if(cookieLogic.get_user_type(req) == "customer" ||
			cookieLogic.get_user_type(req) == "manager"){
			res.sendFile(path.join(__dirname, '..', '/public/html/comments.html'));
		}
		else if(cookieLogic.get_user_type(req) == "error"){
			res.status(403).redirect("/login");
		}
		else{
			res.redirect("/home");
		}
	});
}

module.exports = {
	apply_get: apply_get
}