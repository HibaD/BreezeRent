const userTable = document.querySelector("#userTable");
const propertyTable = document.querySelector("#propertyTable");
const deleteBtn = document.getElementById("delete");	
const signOutButton = document.querySelector("#logOut");

signOutButton.addEventListener("click", function(e) {
  e.preventDefault();
  window.location = "index.html";
})

function removeUser(){
	const rowNum = event.target.parentNode.parentNode.parentNode.rowIndex;
	userTable.deleteRow(rowNum);
}

function removeProperty(){
	const rowNum = event.target.parentNode.parentNode.parentNode.rowIndex;
	propertyTable.deleteRow(rowNum);
}

function editUser (){
	let column = (event.target.parentNode.parentNode.parentNode).children;
	let username = column[0].innerText;
	username = username.replace(/^\s+|\s+$/g, "");
	let email = column[1].innerText;
	email = email.replace(/^\s+|\s+$/g, "");
	let name = column[2].innerText;
	name = name.replace(/^\s+|\s+$/g, "");
	
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
}

function saveData(){
	let column = (event.target.parentNode.parentNode.parentNode).children;
	let username = ((column[0].children)[0]).value;
	let email = ((column[1].children)[0]).value;
	let name = ((column[2].children)[0]).value;
	
	column[0].innerHTML = "";
	column[0].appendChild(document.createTextNode(username));
	
	column[1].innerHTML = "";
	column[1].appendChild(document.createTextNode(email));
	
	column[2].innerHTML = "";
	column[2].appendChild(document.createTextNode(name));
	
	column[3].removeChild(event.target.parentNode);
}

function editProperty (){
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

function saveChanges(){
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
