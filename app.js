'use strict';
const log = console.log;

const express = require('express')
const bodyParser = require('body-parser')
const { ObjectID } = require('mongodb')
const session = require('express-session')

// Import our mongoose connection
const { mongoose } = require('./db/mongoose');

// Import models
const { User, Property, Comments, Claim } = require('./models/user')

// Express
const port = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());

// parse incoming parameters to req.body
app.use(bodyParser.urlencoded({ extended: true }))

// static js directory
app.use(express.static(__dirname));
app.use('/Styles', express.static(__dirname + '/Styles'));
app.use('/Scripts', express.static(__dirname + '/Scripts'));
app.use('/Views', express.static(__dirname + '/Views'));

// Add express sesssion middleware
app.use(session({
	secret: 'oursecret',
	resave: false,
	saveUninitialized: false,
	cookie: {
		expires: 600000,
		httpOnly: true
	}
}))

// Add middleware to check for logged-in users
const sessionChecker = (req, res, next) => {
	if (req.session.user) {
		res.redirect('dashboard')
	} else {
		next();
	}
}

// route for root; redirect to login
app.get('/', sessionChecker, (req, res) => {
	res.redirect('login');
});

// route for login
app.route('/login').get(sessionChecker, (req, res) => {
	res.sendFile(__dirname + '/Views/index.html');
})

// POST route to add new users
app.post('/newUser', (req, res) => {
	const role = req.body.role;
	let user = null;
	if (role == 'Admin') {
		user = new User({
			fullName: req.body.fullName,
			username: req.body.username,
			password: req.body.password,
			role: req.body.role
		})
	}
	else {
		user = new User({
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

app.get('/dashboard', (req, res) => {
	// check if we have active session cookie
	if (req.session.user != null) {
		User.findById(req.session.user).then((result)=>{
		
		if (result.role == 'landlord'){
			res.sendFile(__dirname + '/Views/main.html');
		} else if (result.role == 'admin') {
			res.sendFile(__dirname + '/Views/main-admin.html');
		} else if (result.role == 'tenant') {
			res.sendFile(__dirname + '/Views/main-tenant.html');
		}

	}).catch((error) => {
		res.status(400).send(error) // 400 for bad request
	})
	} else {
		res.redirect('/')
	}
})

app.post('/findUser', (req, res) => {
	User.findOne({username: req.body.username}).then((result)=>{
		res.send(result)
		console.log(req.session.user);
	}).catch((error) => {
		res.status(400).send(error)
	})
})

app.post('/user', (req, res) => {
	User.findOne({username: req.body.username}).then((result)=>{
		result.username = req.body.username;
		result.email = req.body.email;
		result.fullName = req.body.fullName;
		result.save();
		res.send(result)
	}).catch((error) => {
		res.status(400).send(error)
	})
})

app.get('/users', (req, res) => {
	User.find({}).then((result)=>{
		res.send({result});
	}).catch((error) => {
		res.status(400).send(error)
	})
})

app.post('/users/login', (req, res) => {
	User.findOne({username: req.body.username, password: req.body.password}).then((result)=>{
		req.session.user = result._id;
		req.session.email = result.email
		res.redirect('/dashboard');
	}).catch ((error) => {
		res.status(400).redirect('/login') // 400 for bad request
	})
})

app.get('/users/logout', (req, res) => {
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send('error')
		} else {
			res.redirect('/')
		}
	})
})

/* Requests for user profile */

// GET user profile
app.get('/user/:id', (req, res) => {
	const id = req.params.id;

	User.findById(id).then((user) => {
		if (!user) {
			res.status(404).send();
		} else {
			res.send(user);
		}
	}).catch((error) => {
		res.status(400).send(error);
	});
});

// POST update user profile
app.post('/user/:id', (req, res) => {
	const id = req.params.id;
	const userInBody = req.body;

	User.findByIdAndUpdate(id, { $set: userInBody }, { new: true }).then((user) => {
		if (!user) {
			res.status(404).send();
		} else {
			res.send(user);
		}
	}).catch((error) => {
		res.status(400).send(error);
	});
});

/* Requests for properties */

// GET all properties
app.get('/properties', (req, res) => {
	Property.find().then((properties) => {
		if (!properties || properties.length === 0) {
			res.status(404).send();
		} else {
			res.send(properties);
		}
	}).catch((error) => {
		res.status(400).send(error);
	})
});

// GET all properties by user id
app.get('/properties/:user_id', (req, res) => {
	const userId = req.params.user_id;

	Property.find().then((properties) => {
		if (!properties || properties.length === 0) {
			res.status(404).send();
		} else {
			User.findById(userId).then((user) => {
				const username = user.username;
				const userProperties = properties.filter(property => property.tenants.includes(username));
				res.send(userProperties);
			});
		}
	}).catch((error) => {
		res.status(400).send(error);
	});
});

app.post('/property', (req, res) => {
	const property = new Property(
		{
			address: req.body.address,
			notices: [],
			capacity: req.body.capacity,
			tenants: []
		}
	);

	property.save().then((result) => {
		res.send(result);
	}).catch((error) => {
		res.status(400).send(error);
	});
});

app.post('/addUserToProperty/:username&:property_id', (req, res) => {
	const username = req.params.username;
	const propertyId = req.params.property_id;

	Property.findById(propertyId).then(property => {
		property.tenants.push(username);

		Property.findByIdAndUpdate(propertyId, {$set: property}, {new:true}).then(result => {
			res.send(result);
		}).catch((error) => {
			res.status(400).send(error);
		});
	}).catch((error) => {
		res.status(400).send(error);
	});
});

/* Temp */
app.get('/main.html', (req, res) => {
	console.log('Going to main.. ');
	res.sendFile(__dirname + '/Views/main.html');
});

app.get('/main-tenant.html', (req, res) => {
	console.log('Going to main.. ');
	res.sendFile(__dirname + '/Views/main-tenant.html');
});


app.listen(port, () => {
	console.log(`Listening on port ${port}...`);
});
