'use strict';

//DEPENDENCIES===================================================================
const path = require("path");
const express = require('express');
const db = require("./db_connector");
const router = require('express-promise-router')();
const cookieLogic = require("./cookie_logic");
const multer = require('multer')();
const login_api = require('./login_api');
const profile_api = require('./profile_api');
const stores_api = require('./stores_api');
const items_api = require('./items_api');
const comment_api = require('./comment_api');
const get_routes = require('./get_routes');
const cookie_parser = require('cookie-parser');

//FUNCTIONS===================================================================
function init(app){
	// Set view engine
	app.set('view engine', 'ejs');
	
	// Use cookie parser
	app.use(cookie_parser());
	app.use(cookieLogic.add_cookie);

	// Defined routes for static files
	app.use("/css", express.static(path.join(__dirname, "..", 'public/css')));
	app.use("/js", express.static(path.join(__dirname, "..", 'public/js')));
	app.use("/asset", express.static(path.join(__dirname, "..", 'public/asset')));

	// Define get routes
	get_routes.apply_get(router, cookieLogic, path, express, db);

	// Define post routes
	login_api.apply_post(router, multer, db, cookieLogic);
	profile_api.apply_post(router, multer, db, cookieLogic);
	stores_api.apply_post(router, multer, db, cookieLogic);
	items_api.apply_post(router, multer, db, cookieLogic);
	comment_api.apply_post(router, multer, db, cookieLogic);

	// Catch all --> send home
	router.get('/*', (req,res) => {
		res.status(404).redirect("/login");
	});

	// Set routes to app
	app.use(router);
}

//EXPORT===================================================================
module.exports = {
	init: init
};
