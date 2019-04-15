//Global===================================================================
let Users = [];

//PUBLIC FUNCTIONS===================================================================
function add_cookie(req, res, next){
	// Check the cookie
	if(typeof req.cookies === "undefined" || typeof req.cookies.track_id === "undefined"){
		// Set Cookie
		let cookie = Math.random().toString().substring(2, 10);
		res.cookie('track_id', cookie, {expires: new Date(Date.now() + 3600000), httpOnly: true});
	}

	// Call next
	next();
}

function create_user(type, req){
	let user = {};
	user.type = type;
	user.track_id = req.cookies.track_id;
	Users.push(user);
}

//PRIVATE FUNCTIONS===================================================================


//EXPORT===================================================================
module.exports = {
	add_cookie: add_cookie,
	create_user: create_user
};