'use strict';
const log = console.log;

const express = require('express')
const bodyParser = require('body-parser')
const { ObjectID } = require('mongodb')
const session = require('express-session')
var cookieParser = require('cookie-parser');
//var cookieSession = require('cookie-session')


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

app.use(cookieParser());


// Add route to check for cookies
app.get('/cookie',function(req, res){
	res.cookie("set cookie on login page" , '1').send('Cookie is set');
});

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
		User.findById(req.session.user).then((result) => {

			if (result.role == 'landlord') {
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
	User.findOne({ username: req.body.username }).then((result) => {
		res.send(result)
		console.log(req.session.user);
	}).catch((error) => {
		res.status(400).send(error)
	})
})

app.post('/user', (req, res) => {
	User.findOne({ username: req.body.username }).then((result) => {
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
	User.find({}).then((result) => {
		res.send({ result });
	}).catch((error) => {
		res.status(400).send(error)
	})
})

app.post('/users/login', (req, res) => {
	User.findOne({ username: req.body.username, password: req.body.password }).then((result) => {
		req.session.user = result._id;
		req.session.email = result.email
		res.redirect('/dashboard');
	}).catch((error) => {
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
app.get('/sessionUser', (req, res) => {
	const id = req.session.user;

	if (!id) {
		return res.status(404).send();
	}

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

// GET user by username
app.get('/userByUsername/:username', (req, res) => {
	const username = req.params.username;

	User.findOne({ username: username }).then((user) => {
		if (!user) {
			res.status(404).send();
		} else {
			res.send(user);
		}
	}).catch((error) => {
		res.status(400).send(error);
	});
});

// POST get users by usernames
app.post('/usersByUsernames', (req, res) => {
	const usernames = req.body;

	User.find().then((users) => {
		res.send(users.filter(user => usernames.includes(user.username)));
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

// GET all properties by tenant user id
app.get('/propertiesByTenant/:user_id', (req, res) => {
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


app.get('/propertiesByLandlord/:user_id', (req, res) => {
	const userId = req.params.user_id;

	Property.find().then((properties) => {
		if (!properties || properties.length === 0) {
			res.status(404).send();
		} else {
			User.findById(userId).then((user) => {
				const username = user.username;
				const userProperties = properties.filter(property => property.landlord === username);
				res.send(userProperties);
			});
		}
	}).catch((error) => {
		res.status(400).send(error);
	});
});

// POST create property
app.post('/property', (req, res) => {
	const property = new Property(
		{
			name: req.body.name,
			landlord: req.body.landlord,
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

// POST add user to property, and vice versa
app.post('/addUserToProperty/:username/:property_id', (req, res) => {
	const username = req.params.username;
	const propertyId = req.params.property_id;

	Property.findById(propertyId).then(property => {
		property.tenants.push(username);

		Property.findByIdAndUpdate(propertyId, { $set: property }, { new: true }).then(() => {
			User.findOne({ username: username }).then(user => {
				user.property.push(property);

				User.findOneAndUpdate({ username: username }, { $set: user }, { new: true }).then((result) => {
					res.send({ property, user });
				});
			});
		});
	}).catch((error) => {
		res.status(400).send(error);
	});
});


/* Requests for notices */

//get all notices
app.get('/notices/:property_id', (req, res) => {
	const propertyId = req.params.property_id;

	Property.findById(propertyId).then((property) => {
		if (!property || property.length === 0) {
			res.status(404).send();
		} else {
			res.send(property.notices);
		}
	}).catch((error) => {
		res.status(400).send(error);
	});
});

//post new notices
app.post('/notices/:property_id', (req, res) => {
	const propertyId = req.params.property_id;
	const new_notice = req.body.notice;

	Property.findByIdAndUpdate(propertyId, { $push: { notices: new_notice } }, { new: true }).then((result) => {
		if (!result || result.length === 0) {
			res.status(404).send();
		} else {
			for (var i = 0; i < result.tenants.length; i++) {
				User.findOneAndUpdate({ username: result.tenants[i] }, { $set: { property: result } }, { new: true }).then((user) => {
					res.send({ new_notice, user });
				});
			}
		}
	}).catch((error) => {
		res.status(400).send(error);
	});
});

/************************ Claims *****************/
// route for login
/*app.get('/tenant/claims', (req, res) => {
	//const claims = document.querySelector("#panel-claims");
	//claims.innerHTML = '<object data="Tenant-claim-main.html" height="100%" width="100%"></object>';
	res.sendFile(__dirname + '/Views/Tenant-claim-main.html');
})*/

app.get('/allClaims', (req, res) => {
	User.findById(req.session.user).then((user)=>{
	let allClaims = user.claims;
	res.send({allClaims});
	}).catch((error) => {
		res.status(400).send(error)
	})
})

app.post('/addClaim', (req, res) => {
	const id = req.session.user;

	if (req.body.title == null || req.body.detail == null){
		res.status(400).send("Properties missing")
	}
	User.findById(id).then((user) => {
		const claim =  new Claim ({
			title:req.body.title, 
			detail:req.body.detail, 
			status:req.body.status});
		user.claims.push(claim)
		user.save();
		// save to landlord as well
		User.findOne({fullName: (user.property)[0].landlord}).then((landlord) => {
			landlord.claims.push(claim)
			landlord.save();
		})
		
		res.send(claim)
	}).catch((error) => {
		res.status(400).send(error)
	})	
})

/*app.post('/findClaim', (req, res) => {
	const id = req.session.user;
	User.findById(id).then((user) => {
		let i = 0;
		let claims = user.claims;
		for(i in user.claims){
			if(claims[i].title == req.body.title){
				claimId = claims[i]._id;
				res.send({claimId});
			}	
		}
	})
})
*/

app.route('/claimsPage').get((req, res) => {
	res.sendFile(__dirname+ '/Views/Landlord-Claim-Click.html');
})

app.post('/claimClicked',(req, res) => {
	const id = req.session.user;
	const cid = req.body.id;
		
	User.findById(id).then((user) => {
		res.redirect('/claimsPage');
	})
	
})


app.post('/findClaim', (req, res) => {
	const id = req.session.user;
	const cid = req.body.id;
		
	User.findById(id).then((user) => {
		let claim = user.claims.id(cid);
		res.send({claim});
	})
})

app.patch('')

/**************Comments******************/
app.get('/allComments/:id', (req, res) => {
	const id = req.session.user;
	const cid = req.params.id;
	User.findById(id).then((user) => {
		let claim = user.claims.id(cid);
		let comments = claim.comments;
		console.log(claim);
		console.log(comments);
		res.send({comments});
	})
})

app.post('/createComment/:id', (req,res) => {
	const id = req.session.user;
	const cid = req.params.id;
	const {author, content} = req.body;
	const comment = {author, content};
	User.findById(id).then((user) => {
		let claim = user.claims.id(cid);
		(user.claims.id(cid)).comments.push(comment);
		user.save();
		// save to landlord as well
		/*let landlordName = user.landlord;
		User.find({fullName: landlordName}).then((landlord) => {
			let claim = user.claims.id(cid);
			claim.push(comment);
			landlord.save();
		})*/
		res.send(comment);
	})
})


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
