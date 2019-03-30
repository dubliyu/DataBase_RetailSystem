'use strict';

//DEPENDENCIES===================================================================
const client_lib = require('pg');
const bcrypt = require('bcrypt');

//GLOBALS===================================================================
const settings = {
	user: 'postgres',
	host: '192.168.254.22',
	database: 'retail',
	password: '@Simba39',
	port: 5432,
};

//PRIVATE FUNCTIONS===================================================================
function GetConnector(app){
	let client = new client_lib.Client(settings);
	client.connect();
	return client;
}

//PUBLIC FUNCTIONS===================================================================
function test(){
	// Get a new connector
	let conn = GetConnector();
	console.log("Connecting");

	// Make a query
	conn.query('select * from "InStock";', (err, res) => {
		console.log(err, res);
		conn.end();
	});
}

function login(username, password){
	return New Promise((resolve, reject) => {
		// Validate input
		if(username.length === 0 || password.length === 0){
			reject("error");
		}

		// Get a connection
		let conn = GetConnector();
		let query = 'select * from "Users" where "username"=$1;'
		let values = [username];

			// Make a query
		conn.query(query, values, (err1, res1) => {
			// Close the connection
			conn.end();

			// Check for error
			if(err1){
				reject("error");
			}

			// Compare the hash
			bcrypt.compare(password, res1.rows[0].hash, (err2, res2) => {
				// If bad match or error
				if(!res2 || err2){
					reject("error");
				}

				// We have valid match, return user type
				resolve(res1.rows[0].userType);
			});
		});
	});
}

//EXPORT===================================================================
module.exports = {
	login: login,
	test: test
};