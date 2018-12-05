'use strict';
const log = console.log;

const express = require('express')
const bodyParser = require('body-parser')
const { ObjectID } = require('mongodb')

// Import our mongoose connection
const { mongoose } = require('./db/mongoose');

// Import models
const { User } = require ('./models/user')

// Express
const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());

// parse incoming parameters to req.body
app.use(bodyParser.urlencoded({ extended:true }))

// static js directory
app.use("/Scripts", express.static(__dirname + '/Scripts'))


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Views/index.html');
});

// POST route to add new users
app.post('/newUser', (req,res) => {
	const role = req.body.role;
	let user = null;
	if (role == 'Admin'){
		user = new User ({
			fullName: req.body.fullName,
			username: req.body.username,
			password: req.body.password,
			role: req.body.role
		})
	}
	else {
		 user = new User ({
			fullName: req.body.fullName,
			username: req.body.username,
			password: req.body.password,
			role: req.body.role,
			email: req.body.email,
			claims: req.body.claims,
			property: req.body.property
		})
	}
	user.save().then((result) => {
		// Save and send object that was saved
		res.send(result)
	}, (error) => {
		res.status(400).send(error) // 400 for bad request
	})
})

app.post('/users/login', (req, res) => {
	User.findOne({username: req.body.username, password: req.body.password}).then((result)=>{
		if (result.role == 'landlord'){
			res.sendFile(__dirname + '/Views/main.html');
		}else if (result.role == 'admin'){
			res.sendFile(__dirname + '/Views/main-admin.html');
		}else if (result.role == 'tenant'){
			res.sendFile(__dirname + '/Views/main-tenant.html');
		}
		
	}).catch ((error) => {
		res.status(400).send(error) // 400 for bad request
	})
})

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});