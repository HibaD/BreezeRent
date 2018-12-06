const showPasswordCheckbox = document.querySelector("#show-password");

showPasswordCheckbox.addEventListener("click", revealPwd);

function revealPwd() {
    var x = document.getElementById("newPwd");
    var y = document.getElementById("repeatPwd");
    if (x.type === "password" && y.type === "password") {
        x.type = "text";
        y.type = "text";
    } else {
        x.type = "password";
        y.type = "password";
    }
}

// Setup basic users on startup
function setup(){
	// Admin User
	const url = '/newUser';
	const admin = {
		fullName: 'Master',
		username: 'root',
		password: 'csc309',
		role: 'admin'
	}
	const request = new Request (url, {
			method: 'post',
			body: JSON.stringify(admin),
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
	});
	addRequest(request);

	// Landlord
	const landlord = {
		fullName: 'Monica Geller',
		username: 'monicaG',
		password: 'test1',
		role: 'landlord',
		email: 'monicaG@gmail.com',
		claims: [],
		property: []
	}
	const request2 = new Request (url, {
			method: 'post',
			body: JSON.stringify(landlord),
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
	});
	addRequest(request2);

	//Tenant
	const tenant = {
		fullName: 'Rachel Green',
		username: 'rachelG',
		password: 'test2',
		role: 'tenant',
		email: 'rachelG@gmail.com',
		claims: [],
		property: []
	}
	const request3 = new Request (url, {
			method: 'post',
			body: JSON.stringify(tenant),
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
	});
	addRequest(request3);
}
//setup();
function addRequest(request){
	fetch(request)
    .then(function(res) {
        // Handle response we get from the API
        // Usually check the error codes to see what happened
        const message = document.querySelector('#message')
        if (res.status === 200) {
            message.innerText = 'You have successfully Registered'
            message.setAttribute("style", "color: green")
            registerForm.reset();
        } else {
            message.innerText = 'User already exists'
            message.setAttribute("style", "color: red")
     
        }
        
    }).catch((error) => {
        console.log(error)
    })
}

const registerForm = document.querySelector("#registerForm")
//const loginForm = document.querySelector("#loginForm")

if (registerForm) {
	const btn = document.querySelector("#newUser");
    btn.addEventListener('click', addNewUser)
}

function addNewUser(e) {
    e.preventDefault()
	var username = registerForm.newId.value;
    var pwd = registerForm.newPwd.value;
    var pwd2 = registerForm.repeatPwd.value;
    var email = registerForm.newEmail.value;
    var name = registerForm.legalName.value;
    var role = registerForm.role.value;
	console.log('adding user');
	// TODO remove from here - check in user.js
    if (pwd !== pwd2) {
        const message = document.querySelector('#message')
		message.innerText = 'Passwords do not match'
        message.setAttribute("style", "color: red")
     
		return // pwd not matching
    }
   
	// pre rules in user.js will check if user already exists
	// make server calls to add new user
	const url = '/newUser';
	const newUser = {
		fullName: name,
		username: username,
		password: pwd,
		role: role,
		email: email,
		claims: [],
		property: []
	}
	const request = new Request (url, {
			method: 'post',
			body: JSON.stringify(newUser),
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
	});
	addRequest(request);
}
