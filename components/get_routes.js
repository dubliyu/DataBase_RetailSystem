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
	router.get("/about", async (req, res) => {
		let user = cookieLogic.get_user(req);
		if(user === "error"){
			res.status(403).redirect("/login");
		}
		else{
			res.render('about.ejs', {user_type: user.type});
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
	router.get("/stock", async (req, res) => {
		let user = cookieLogic.get_user(req);
		if(user === "error"){
			res.status(403).redirect("/login");
		}
		else{
			let items = await db.get_items(user, undefined, undefined, undefined, undefined);
			res.render('stock.ejs', {user_type: user.type, items: items});
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
	router.get("/comments", async (req, res) => {
		// Check if user is allowed type
		let user = cookieLogic.get_user(req);
		if(user === "error"){
			res.status(403).redirect("/login");
		}
		else if(user.type == "customer"){
			res.render('comments.ejs', {user_type: user.type});
		}
		else if(user.type == "manager"){
			let comments = await db.get_comments();
			res.render('comments.ejs', {user_type: user.type, comments: comments});
		}
		else{
			res.status(403).redirect("/home");
		}
	});
}

module.exports = {
	apply_get: apply_get
}