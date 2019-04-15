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
function create_user_cust(customer){
	return new Promise((resolve, reject) => {
		// Validate input
		if(customer.username.length === 0 || customer.password.length === 0){
			reject("error");
			return;
		}

		// Get a connection
		let conn = GetConnector();
		let query = 'INSERT INTO customers ("name", "email") VALUES ($1, $2) Returning "CustID";'
		let values = [customer.name, customer.email];

		// Insert the query into the customer table
		conn.query(query, values, (err1, res1) => {
			// Check for error
			if(err1){
				reject("error");
				return;
			}

			// Get the new employee id
			let custID = res1.rows[0].CustID;

			// Validate
			if(typeof custID !== "number"){
				reject("error");
				return;
			}

			// hash the password
			bcrypt.hash(customer.password, 10, (err2, hash) => {
				// Check error
				if(err2){
					reject("error");
					return;
				}

				// Set new query for users table
				query = "INSERT INTO users (custid, username, password) VALUES ($1, $2, $3);";
				values = [custID, customer.username, hash];
				console.log(query);
				console.log(values);

				// Insert the query
				conn.query(query, values, (err3, res3) => {
					// Close the connection
					conn.end();

					// Check error
					if(err3){
						reject("error");
						return;
					}

					// If no error, then resolve true
					resolve("success");
				});
			});
		});
	});
}

function login(username, password){
	return new Promise((resolve, reject) => {
		// Validate input
		if(!username || username.length === 0 || password.length === 0){
			reject("error");
			return;
		}

		// Get a connection
		let conn = GetConnector();
		let query = 'select * from users where "username"=$1;';
		let values = [username];

		// Make a query
		conn.query(query, values, (err1, res1) => {
			// Close the connection
			conn.end();

			// Check for error
			if(err1 || res1.rowCount == 0){
				reject("error");
				return;
			}

			// Compare the hash
			bcrypt.compare(password, res1.rows[0].hash, (err2, res2) => {
				// If bad match or error
				if(!res2 || err2){
					reject("error");
					return;
				}

				// We have valid match, return user type
				if(res1.rows[0].empid !== "" && res1.rows[0].empid !== null){
					resolve("employee");
				}
				else if(res1.rows[0].custid !== "" && res1.rows[0].custid !== null){
					resolve("customer");
				}
				else{
					resolve("error");
				}
			});
		});
	});
}

//EXPORT===================================================================
module.exports = {
	login: login,
	create_user_cust: create_user_cust
};
