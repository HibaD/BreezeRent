const userTable = document.querySelector("#userTable");
const propertyTable = document.querySelector("#propertyTable");
const deleteBtn = document.getElementById("delete");

function removeUser() {
	const rowNum = event.target.parentNode.parentNode.parentNode.rowIndex;
	userTable.deleteRow(rowNum);
}

function removeProperty() {
	const rowNum = event.target.parentNode.parentNode.parentNode.rowIndex;
	propertyTable.deleteRow(rowNum);
}

function createUserTable() {
	const url = '/users';
	const request = new Request(url, {
		method: 'get',
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		},
	});
	fetch(request)
		.then((res) => {
			if (res.status === 200) {
				return res.json()
			} else {
				alert('Could not get users')
			}
		})
		.then((json) => {
			for (i = 0; i < json.result.length; i++) {
				addUser(json.result[i]);
			}
		}).catch((error) => {
			console.log(error)
		})

}
createUserTable();

function addUser(user) {
	let row = document.createElement('tr');
	let col1 = document.createElement('td');
	let col2 = document.createElement('td');
	let col3 = document.createElement('td');
	let col4 = document.createElement('td');

	let editBtn = document.createElement('button');
	let trashBtn = document.createElement('button');

	editBtn.setAttribute('onclick', 'editUser()');
	trashBtn.setAttribute('onclick', 'removeUser()');

	let editIcon = document.createElement('i');
	let trashIcon = document.createElement('i');
	editIcon.setAttribute('class', 'material-icons');
	trashIcon.setAttribute('class', 'material-icons');
	editIcon.appendChild(document.createTextNode('edit'));
	trashIcon.appendChild(document.createTextNode('delete'));

	editBtn.appendChild(editIcon);
	trashBtn.appendChild(trashIcon);

	const tbody = (userTable.children)[1];

	col1.appendChild(document.createTextNode(user.username));
	col2.appendChild(document.createTextNode(user.email));
	col3.appendChild(document.createTextNode(user.fullName));
	col4.appendChild(editBtn);
	col4.appendChild(trashBtn);

	row.appendChild(col1);
	row.appendChild(col2);
	row.appendChild(col3);
	row.appendChild(col4);
	tbody.appendChild(row);
}

function editUser() {
	const url = '/findUser';
	let column = (event.target.parentNode.parentNode.parentNode).children;
	var username = column[0].innerText;
	username = username.replace(/^\s+|\s+$/g, "");
	var email = column[1].innerText;
	email = email.replace(/^\s+|\s+$/g, "");
	var name = column[2].innerText;
	name = name.replace(/^\s+|\s+$/g, "");
	let editBtn = event.target.parentNode;

	const findUser = {
		username: username,
		email: email,
		fullName: name
	}
	const request = new Request(url, {
		method: 'post',
		body: JSON.stringify(findUser),
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		},
	});
	fetch(request)
		.then((res) => {
			editBtn.setAttribute("onclick", "");

			const inputUsername = document.createElement('input');
			inputUsername.type = 'text';
			inputUsername.value = username;
			column[0].innerHTML = "";
			column[0].appendChild(inputUsername);

			const inputEmail = document.createElement('input');
			inputEmail.type = 'text';
			inputEmail.value = email;
			column[1].innerHTML = "";
			column[1].appendChild(inputEmail);

			const inputName = document.createElement('input');
			inputName.type = 'text';
			inputName.value = name;
			column[2].innerHTML = "";
			column[2].appendChild(inputName);

			const saveBtn = document.createElement('button');
			saveBtn.setAttribute("onclick", "saveData()");
			const btnI = document.createElement('i')
			btnI.classList.add("material-icons");
			btnI.appendChild(document.createTextNode('save'));
			saveBtn.appendChild(btnI);
			column[3].appendChild(saveBtn);

		}).catch((error) => {
			console.log(error)
		})

}

function createPropertyTable() {
	const request = new Request('/properties', { method: 'get' });
	fetch(request)
		.then((res) => {
			if (res.status === 200) {
				return res.json()
			} else {
				alert('Could not get properties')
			}
		})
		.then((json) => {
			for (i = 0; i < json.length; i++) {
				addProperty(json[i]);
			}
		}).catch((error) => {
			console.log(error)
		})

}
createPropertyTable();

function addProperty(property) {
	let row = document.createElement('tr');
	let col1 = document.createElement('td');
	let col2 = document.createElement('td');
	let col3 = document.createElement('td');
	let col4 = document.createElement('td');
	let col5 = document.createElement('td');

	let editBtn = document.createElement('button');
	let trashBtn = document.createElement('button');

	editBtn.setAttribute('onclick', 'editProperty()');
	trashBtn.setAttribute('onclick', 'removeUser()');

	let editIcon = document.createElement('i');
	let trashIcon = document.createElement('i');
	editIcon.setAttribute('class', 'material-icons');
	trashIcon.setAttribute('class', 'material-icons');
	editIcon.appendChild(document.createTextNode('edit'));
	trashIcon.appendChild(document.createTextNode('delete'));

	editBtn.appendChild(editIcon);
	trashBtn.appendChild(trashIcon);

	const tbody = (propertyTable.children)[1];

	col1.appendChild(document.createTextNode(property.name));
	col2.appendChild(document.createTextNode(property.capacity));
	col3.appendChild(document.createTextNode(property.address));
	var available = property.capacity - property.tenants.length > 0;
	if (available) {
		col4.appendChild(document.createTextNode('Available'));
	} else {
		col4.appendChild(document.createTextNode('Not Available'));
	}
	col5.appendChild(editBtn);
	col5.appendChild(trashBtn);

	row.appendChild(col1);
	row.appendChild(col2);
	row.appendChild(col3);
	row.appendChild(col4);
	row.appendChild(col5);
	tbody.appendChild(row);
}

//save form data to db
function saveData() {
	let editBtn = (event.target.parentNode.parentNode.children)[0];
	let parentNode = event.target.parentNode;
	let column = (event.target.parentNode.parentNode.parentNode).children;
	let username = ((column[0].children)[0]).value;
	let email = ((column[1].children)[0]).value;
	let name = ((column[2].children)[0]).value;

	const url = "/user"
	const patchedUser = {
		username: username,
		email: email,
		fullName: name
	}
	const request = new Request(url, {
		method: 'post',
		body: JSON.stringify(patchedUser),
		headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		},
	});
	fetch(request)
		.then((res) => {

			editBtn.setAttribute("onclick", "editUser()");

			column[0].innerHTML = "";
			column[0].appendChild(document.createTextNode(username));

			column[1].innerHTML = "";
			column[1].appendChild(document.createTextNode(email));

			column[2].innerHTML = "";
			column[2].appendChild(document.createTextNode(name));

			column[3].removeChild(parentNode);

		}).catch((error) => {
			console.log(error)
		})
}

function editProperty() {
	let editBtn = event.target.parentNode;
	editBtn.setAttribute("onclick", "");

	let column = (event.target.parentNode.parentNode.parentNode).children;
	let property = column[0].innerText;
	property = property.replace(/^\s+|\s+$/g, "");
	let tenants = column[1].innerText;
	tenants = tenants.replace(/^\s+|\s+$/g, "");
	let address = column[2].innerText;
	address = address.replace(/^\s+|\s+$/g, "");
	let availability = column[3].innerText;
	availability = availability.replace(/^\s+|\s+$/g, "");

	const inputProp = document.createElement('input');
	inputProp.type = 'text';
	inputProp.value = property;
	column[0].innerHTML = "";
	column[0].appendChild(inputProp);

	const inputTenants = document.createElement('input');
	inputTenants.type = 'text';
	inputTenants.value = tenants;
	column[1].innerHTML = "";
	column[1].appendChild(inputTenants);

	const inputAddress = document.createElement('input');
	inputAddress.type = 'text';
	inputAddress.value = address;
	column[2].innerHTML = "";
	column[2].appendChild(inputAddress);

	const inputAvail = document.createElement('input');
	inputAvail.type = 'text';
	inputAvail.value = availability;
	column[3].innerHTML = "";
	column[3].appendChild(inputAvail);

	const saveBtn = document.createElement('button');
	saveBtn.setAttribute("onclick", "saveChanges()");
	const btnI = document.createElement('i')
	btnI.classList.add("material-icons");
	btnI.appendChild(document.createTextNode('save'));
	saveBtn.appendChild(btnI);
	column[4].appendChild(saveBtn);
}
//save form data to db
function saveChanges() {
	let editBtn = (event.target.parentNode.parentNode.children)[0];
	editBtn.setAttribute("onclick", "editProperty()");

	let column = (event.target.parentNode.parentNode.parentNode).children;
	let property = ((column[0].children)[0]).value;
	let tenants = ((column[1].children)[0]).value;
	let address = ((column[2].children)[0]).value;
	let avail = ((column[3].children)[0]).value;

	column[0].innerHTML = "";
	column[0].appendChild(document.createTextNode(property));

	column[1].innerHTML = "";
	column[1].appendChild(document.createTextNode(tenants));

	column[2].innerHTML = "";
	column[2].appendChild(document.createTextNode(address));

	column[3].innerHTML = "";
	column[3].appendChild(document.createTextNode(avail));

	column[4].removeChild(event.target.parentNode);
}

