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
			resolve("error");
			return;
		}
		let email_pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; 
		if(customer.name.length === 0 || customer.email.length === 0 || !email_pattern.test(customer.email) ){
			resolve("error");
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
				resolve("error");
				return;
			}

			// Get the new employee id
			let custID = res1.rows[0].CustID;

			// Validate
			if(typeof custID !== "number"){
				resolve("error");
				return;
			}

			// hash the password
			bcrypt.hash(customer.password, 10, (err2, hash) => {
				// Check error
				if(err2){
					resolve("error");
					return;
				}

				// Set new query for users table
				query = "INSERT INTO users (custid, username, password) VALUES ($1, $2, $3);";
				values = [custID, customer.username, hash];

				// Insert the query
				conn.query(query, values, (err3, res3) => {
					// Close the connection
					conn.end();

					// Check error
					if(err3){
						resolve("error");
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
			resolve("error");
			return;
		}

		// Get a connection
		let conn = GetConnector();
		let query = 'select * from users u left join employees e on u.empid = e."EmpID" where "username"=$1;';
		let values = [username];

		// Make a query
		conn.query(query, values, (err1, res1) => {
			// Close the connection
			conn.end();

			// Check for error
			if(err1 || res1.rowCount == 0){
				resolve("error");
				return;
			}

			// Compare the hash
			bcrypt.compare(password, res1.rows[0].password, (err2, res2) => {
				// If bad match or error
				if(!res2 || err2){
					resolve("error");
					return;
				}
				// Create obj
				let user = {};

				// We have valid match, return user type
				if(res1.rows[0].empid !== "" && res1.rows[0].empid !== null){
					user.id = res1.rows[0].EmpID;
					if(res1.rows[0].Position === "Manager"){
						user.type = "manager";
						resolve(user);
					}
					else{
						user.type = "employee";
						resolve(user);						
					}
				}
				else if(res1.rows[0].custid !== "" && res1.rows[0].custid !== null){
					user.id = res1.rows[0].custid;
					user.type = "customer";
					resolve(user);
				}
				else{
					resolve("error");
				}
			});
		});
	});
}

function get_transactions(user){
	return new Promise((resolve, reject) => {
		// Construct query
		let values = [];
		let query = 'SELECT t."TransID", to_char(t."Timestamp", \'MM-DD-YY HH12:MI AM\') as tm, t."Total",';
		query += 'c.name AS cust_name, s."StoreName", '
		query += "(regexp_split_to_array(e.\"Name\", '\s+'))[1] AS emp_fname "
		query += "FROM transactions t "
		query += 'LEFT JOIN employees e ON e."EmpID" = t."EmpID"'
		query += 'LEFT JOIN customers c ON c."CustID" = t."CustID"'
		query += 'LEFT JOIN stores s ON s."StoreID" = t."StoreID"'
		if(user.type !== "manager"){
			if(user.type === 'employee'){
				query += ' where t."EmpID" = $1;'
			}
			else{
				query += ' where t."CustID" = $1;'
			}
			values.push(user.id);
		}

		// Get a connection
		let conn = GetConnector();

		// Make a query
		conn.query(query, values, (err1, res1) => {
			if(err1 ){
				resolve("error");
			}else{
				resolve(res1.rows);
			}
		});
	});
}

function get_stores(state, name){
	return new Promise((resolve, reject) => {
		// Construct query
		let query = 'select * from stores ';
		let values = [];
		if(state || name){
			where = "where "
			if(state && name){
				where += '"State"=$1 and "StoreName"=$2'
				values.push(state, name);
			}
			else if(state){
				where += '"State"=$1';
				values.push(state);
			}
			else if(name){
				where += '"StoreName"=$1';
				values.push(name);
			}
			else{
				where = "";
			}
			query += where + ";";
		}


		// Get a connection
		let conn = GetConnector();

		// Make a query
		conn.query(query, values, (err1, res1) => {
			if(err1 ){
				resolve("error");
			}else{
				resolve(res1.rows);
			}
		});
	});
}

function get_profile(user){
	return new Promise((resolve, reject) => {
		// Construct query
		let query = '';
		if(user.type === "customer"){
			query = 'SELECT * FROM customers WHERE "CustID"=$1;'
		}
		else{
			query = 'SELECT *, "Name" AS name FROM employees WHERE "EmpID"=$1;'
		}

		// Get a connection
		let values = [user.id];
		let conn = GetConnector();

		// Make a query
		conn.query(query, values, (err1, res1) => {
			if(err1 ){
				resolve("error");
			}else{
				resolve(res1.rows[0]);
			}
		});
	});
}

function update_user(user, name, email){
	return new Promise((resolve, reject) => {
		// Validate input
		if(typeof email !== "undefined"){
			// Check email
			let email_pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; 
			if(email.length === 0 || !email_pattern.test(email)){
				resolve("error");
				return;
			}
		}
		else{
			// Check name
			if(name.length === 0){
				resolve("error");
				return;
			}
		}

		// Construct query
		let query = '';
		let values = [user.id];
		if(user.type === "customer"){
			if(typeof name === "undefined"){
				query = 'UPDATE customers SET email=$1 WHERE "CustID"=$2;'
				values.unshift(email);
			}
			else{
				query = 'UPDATE customers SET name=$1 WHERE "CustID"=$2;'
				values.unshift(name);
			}
		}
		else{
			query = 'UPDATE employees SET "Name"=$1 WHERE "EmpID"=$2;'
			values.unshift(name);	
		}

		// Get a connection
		let conn = GetConnector();

		// Make a query
		conn.query(query, values, (err1, res1) => {
			if(err1 ){
				resolve("error");
			}else{
				resolve("success");
			}
		});
	});
}

//EXPORT===================================================================
module.exports = {
	login: login,
	create_user_cust: create_user_cust,
	get_transactions: get_transactions,
	get_profile: get_profile,
	update_user: update_user,
	get_stores: get_stores
};
