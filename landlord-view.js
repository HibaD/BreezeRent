const addPropertyButton = document.querySelector("#add-property-button");
const updateProfileButton = document.querySelector("#update-profile-button");
const saveProfileButton = document.querySelector("#save-profile-button");

const profileName = document.querySelector("#profile-name");
const profileNameDiv = document.querySelector("#profile-name-div");
const profileContact = document.querySelector("#profile-contact");
const profileContactDiv = document.querySelector("#profile-contact-div");

var nameInput, contactInput;

addPropertyButton.addEventListener("click", function(e) {
  e.preventDefault();
  window.location = "propertyregistry.html";
})

updateProfileButton.addEventListener("click", function(e) {
  e.preventDefault();

  nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.class = "form-control";
  nameInput.value = profileName.innerHTML;

  contactInput = document.createElement("input");
  contactInput.type = "text";
  contactInput.class = "form-control";
  contactInput.value = profileContact.innerHTML;

  updateProfileButton.style.display = "none";
  saveProfileButton.removeAttribute("style");

  profileName.style.display = "none";
  profileNameDiv.appendChild(nameInput);
  profileContact.style.display = "none";
  profileContactDiv.appendChild(contactInput);
})

saveProfileButton.addEventListener("click", function(e) {
  e.preventDefault();
  updateProfileButton.removeAttribute("style");
  saveProfileButton.style.display = "none";

  const newName = nameInput.value;
  const newContact = contactInput.value;

  nameInput.style.display = "none";
  contactInput.style.display = "none";

  profileName.innerHTML = newName;
  profileContact.innerHTML = newContact;

  profileName.removeAttribute("style");
  profileContact.removeAttribute("style");
})