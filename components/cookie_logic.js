//Global===================================================================
let Users = [];
let User_hash = {};
let Deleted_indexes = [];

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

function create_user(type, id, req){
	let user = {};
	user.type = type;
	user.track_id = req.cookies.track_id;
	user.id = id;

	if(Deleted_indexes.length === 0){
		Users.push(user);
		User_hash[user.track_id] = Users.length - 1;
	}
	else{
		let index = Deleted_indexes.shift();
		Users[index] = user;
		User_hash[user.track_id] = index;
	}

}

function get_user(req){
	if(typeof req === "undefined" || typeof req.cookies === "undefined" || typeof req.cookies.track_id === "undefined"){
		return "error";
	}
	user_index = User_hash[req.cookies.track_id]
	if(user_index === undefined || user_index === null){
		return "error";
	}
	return Users[user_index];
}

function get_user_type(req){
	if(typeof req === "undefined" || typeof req.cookies === "undefined" || typeof req.cookies.track_id === "undefined"){
		return "error";
	}
	user_index = User_hash[req.cookies.track_id]
	if(user_index === undefined || user_index === null){
		return "error";
	}
	return Users[user_index].type;
}

function remove_user(){
	if(typeof req === "undefined" || typeof req.cookies === "undefined" || typeof req.cookies.track_id === "undefined"){
		return "error";
	}
	user_index = User_hash[req.cookies.track_id]
	if(user_index === undefined || user_index === null){
		return "error";
	}
	delete User_hash[req.cookies.track_id];
	Deleted_indexes.unshift(user_index);
}


//EXPORT===================================================================
module.exports = {
	add_cookie: add_cookie,
	create_user: create_user,
	get_user_type: get_user_type,
	get_user: get_user,
	remove_user: remove_user
};