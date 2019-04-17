'use strict';
// File contains the GET endpoints for all pages

//PUBLIC FUNCTIONS===================================================================
function apply_get(router, cookieLogic, path, express){
	router.get("/login", (req, res) => {
		res.sendFile(path.join(__dirname, '..', '/public/html/login.html'));
	});
	router.get("/home", (req, res) => {
		let type = cookieLogic.get_user_type(req)
		if(type == "error"){
			res.status(403).redirect("/login");
		}
		else{
			res.render('home.ejs', {user_type: type});
			//res.sendFile(path.join(__dirname, '..', '/public/html/home.html'));
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
	router.get("/stores", (req, res) => {
		if(cookieLogic.get_user_type(req) == "error"){
			res.status(403).redirect("/login");
		}
		else{
			res.sendFile(path.join(__dirname, '..', '/public/html/stores.html'));
		}
	});
	router.get("/transactions", (req, res) => {
		if(cookieLogic.get_user_type(req) == "error"){
			res.status(403).redirect("/login");
		}
		else{
			res.sendFile(path.join(__dirname, '..', '/public/html/transactions.html'));
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
	router.get("/profile", (req, res) => {
		if(cookieLogic.get_user_type(req) == "error"){
			res.status(403).redirect("/login");
		}
		else{
			res.sendFile(path.join(__dirname, '..', '/public/html/profile.html'));
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