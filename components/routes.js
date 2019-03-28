'use strict';

//DEPENDENCIES===================================================================
const path = require("path");
const express = require('express');
const db = require("./db_connector");
const router = express.Router();

//FUNCTIONS===================================================================
function init(app){
	// Defined routes for static files
	app.use("/css", express.static(path.join(__dirname, "..", 'public/css')));
	app.use("/js", express.static(path.join(__dirname, "..", 'public/js')));
	app.use("/asset", express.static(path.join(__dirname, "..", 'public/asset')));

	// Define routes for html pages
	router.get("/login", (req, res) => {
		res.sendFile(path.join(__dirname, '..', '/public/html/login.html'));
	});
	router.get("/customer", (req, res) => {
		res.sendFile(path.join(__dirname, '..', '/public/html/c_home.html'));
	});
	router.get("/employee", (req, res) => {
		res.sendFile(path.join(__dirname, '..', '/public/html/e_home.html'));
	});

	// Define post routes

	// Catch all --> send home
	router.get('/*', (req,res) => {
		res.status(404).sendFile(path.join(__dirname, '..', '/public/html/login.html'));
	});

	// Set routes to app
	app.use(router);
}

//EXPORT===================================================================
module.exports = {
	init: init
};