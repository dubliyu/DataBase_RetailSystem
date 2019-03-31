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
function create_user_emp(employee){
	return New Promise((resolve, reject) => {
		// Validate input
		if(employee.username.length === 0 || employee.password.length === 0){
			reject(false);
		}

		// Get a connection
		let conn = GetConnector();
		let query = 'INSERT INTO employees ("Name", "Position", "Department") VALUES ($1, $2, $3) Returning "EmpID";'
		let values = [employee.name, employee.pos, employee.dept];

		// Insert the query into the customer table
		conn.query(query. values. (err1, res1) => {
			// Check for error
			if(err1){
				reject(false);
			}

			// Get the new employee id
			let empId = res1.rows[0].EmpID;

			// Validate
			if(typeof empId !== "number"){
				reject(false);
			}

			// hash the password
			bcrypt.hash(employee.password, 10, (err2, hash) => {
				// Check error
				if(err2){
					reject(false);
				}

				// Set new query for users table
				query = "INSERT INTO users (empid, username, password) VALUES ($1, $2, $3);";
				values = [empId, username, password];

				// Insert the query
				conn.query(query, values, (err3, res3) => {
					// Close the connection
					conn.end();

					// Check error
					if(err3){
						reject(false);
					}

					// If no error, then resolve true
					resolve(true);
				});
			});
		});
	};
}

function create_user_cust(customer){
	return New Promise((resolve, reject) => {
		// Validate input
		if(customer.username.length === 0 || customer.password.length === 0){
			reject(false);
		}

		// Get a connection
		let conn = GetConnector();
		let query = 'INSERT INTO customers ("name", "email") VALUES ($1, $2) Returning "CustID";'
		let values = [customer.name, customer.email];

		// Insert the query into the customer table
		conn.query(query. values. (err1, res1) => {
			// Check for error
			if(err1){
				reject(false);
			}

			// Get the new employee id
			let custID = res1.rows[0].CustID;

			// Validate
			if(typeof custID !== "number"){
				reject(false);
			}

			// hash the password
			bcrypt.hash(employee.password, 10, (err2, hash) => {
				// Check error
				if(err2){
					reject(false);
				}

				// Set new query for users table
				query = "INSERT INTO users (custid, username, password) VALUES ($1, $2, $3);";
				values = [custID, username, password];

				// Insert the query
				conn.query(query, values, (err3, res3) => {
					// Close the connection
					conn.end();

					// Check error
					if(err3){
						reject(false);
					}

					// If no error, then resolve true
					resolve(true);
				});
			});
		});
	};
}

function login(username, password){
	return New Promise((resolve, reject) => {
		// Validate input
		if(username.length === 0 || password.length === 0){
			reject("error");
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
				if(res1.rows[0].empid !== "" && res1.rows[0].empid !== null){
					resolve("employee");
				}
				else if(res1.rows.custid !== "" && res1.rows[0].custid !== null){
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
	create_user_cust: create_user_cust,
	create_user_emp: create_user_emp
};