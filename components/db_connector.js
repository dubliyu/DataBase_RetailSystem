'use strict';

//DEPENDENCIES===================================================================
const client_lib = require('pg');

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
//EXPORT===================================================================
module.exports = {
	test: test
};