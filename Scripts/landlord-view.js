var sessionUser = {
  _id: '5c08355906b93e5abbf775e0'
};

// Display user information
const getUserRequest = new Request('/user/' + sessionUser._id, { method: 'get' });
fetch(getUserRequest).then((res) => {
  if (res.status === 200) {
    return res.json();
  }
}).then((user) => {
  sessionUser = user;
  displayUserInformation(sessionUser);
}).catch((error) => {
  console.log(error);
});

const getPropertiesRequest = new Request('/properties/' + sessionUser._id, { method: 'get' });
fetch(getPropertiesRequest).then((res) => {
  if (res.status === 200) {
    return res.json();
  }
}).then((properties) => {
  displayProperties(properties);
}).catch((error) => {
  console.log(error);
});

const addPropertyButton = document.querySelector("#add-property");
const updateProfileButton = document.querySelector("#update-profile-button");
const saveProfileButton = document.querySelector("#save-profile-button");

const profileName = document.querySelector("#profile-name");
const profileNameDiv = document.querySelector("#profile-name-div");
const profileContact = document.querySelector("#profile-contact");
const profileContactDiv = document.querySelector("#profile-contact-div");
const profileRole = document.querySelector("#profile-role");
const profileRatings = document.querySelector("#profile-ratings");

const propertyInfoDiv = document.querySelector("#property-info-div");
const propertyListTabs = document.querySelector("#property-list-tabs");

var nameInput, contactInput;

function displayUserInformation(user) {
  profileName.appendChild(document.createTextNode(user.fullName));
  profileContact.appendChild(document.createTextNode(user.email));
  profileRole.appendChild(document.createTextNode(user.role));

  let numOfFullStars = Math.floor(user.ratings / 1);
  let numOfHalfStars = user.ratings % 1 != 0;
  let numOfEmptyStars = 5 - numOfFullStars - numOfHalfStars;

  var newStar;
  for (var i = 0; i < numOfFullStars; i++) {
    newStar = document.createElement("i");
    newStar.classList.add("fas");
    newStar.classList.add("fa-star");
    profileRatings.appendChild(newStar);
  }

  for (var i = 0; i < numOfHalfStars; i++) {
    newStar = document.createElement("i");
    newStar.classList.add("fas");
    newStar.classList.add("fa-star-half-alt");
    profileRatings.appendChild(newStar);
  }

  for (var i = 0; i < numOfEmptyStars; i++) {
    newStar = document.createElement("i");
    newStar.classList.add("far");
    newStar.classList.add("fa-star");
    profileRatings.appendChild(newStar);
  }
}

function updateUserInformation(user) {
  const updateUserInfoRequest = new Request('/user/' + sessionUser._id,
    {
      method: 'post',
      body: JSON.stringify(sessionUser),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    });

  fetch(updateUserInfoRequest);

  if (profileName.firstChild) {
    profileName.removeChild(profileName.firstChild);
  }
  profileName.appendChild(document.createTextNode(user.fullName));
  if (profileContact.firstChild) {
    profileContact.removeChild(profileContact.firstChild);
  }
  profileContact.appendChild(document.createTextNode(user.email));
}

function displayProperties(properties) {
  var newTab, newPanel, newTenantTable;
  for (var i = 0; i < properties.length; i++) {
    newTab = document.createElement("a");
    newTab.classList.add("list-group-item");
    newTab.classList.add("list-group-item-action");
    newTab.classList.add("d-flex");
    newTab.classList.add("justify-content-between");
    newTab.classList.add("align-items-center");
    if (i === 0) {
      newTab.classList.add("active");
      newTab.setAttribute("aria-selected", "true");
    } else {
      newTab.setAttribute("aria-selected", "false");
    }

    newTab.setAttribute("id", properties[i].id + "Tab");
    newTab.setAttribute("data-toggle", "list");
    newTab.setAttribute("href", "#" + "list-" + properties[i].id);
    newTab.setAttribute("role", "tab");
    newTab.setAttribute("aria-controls", properties[i].id);
    newTab.appendChild(document.createTextNode(properties[i].address));
    propertyListTabs.insertBefore(newTab, addPropertyButton);

    newPanel = document.createElement("div");
    newPanel.classList.add("tab-pane");
    newPanel.classList.add("fade");
    if (i === 0) {
      newPanel.classList.add("active");
      newPanel.classList.add("show");
    }
    newPanel.setAttribute("id", "list-" + properties[i].id);
    newPanel.setAttribute("role", "tabpanel");
    newPanel.setAttribute("aria-labelledby", "list-" + properties[i].id + "-list");

    newTenantTable = document.createElement("table");
    newTenantTable.classList.add("table");
    newTenantTable.classList.add("table-striped");
    var tHead = document.createElement("thead");
    var tR = document.createElement("tr");
    var tHNumber = document.createElement("th");
    tHNumber.appendChild(document.createTextNode("#"));
    var tHName = document.createElement("th");
    tHName.appendChild(document.createTextNode("Name"));
    var tHUsername = document.createElement("th");
    tHUsername.appendChild(document.createTextNode("Username"));
    tR.appendChild(tHNumber);
    tR.appendChild(tHName);
    tR.appendChild(tHUsername);
    tHead.appendChild(tR);
    newTenantTable.appendChild(tHead);

    var tBody = document.createElement("tBody");

    for (var j = 0; j < properties[i].tenants.length; j++) {
      tR = document.createElement("tr");
      var tH = document.createElement("th");
      tH.appendChild(document.createTextNode(j + 1));
      var tDName = document.createElement("td");
      tDName.appendChild(document.createTextNode(properties[i].tenants[j].name));
      var tDUsername = document.createElement("td");
      tDUsername.appendChild(document.createTextNode(properties[i].tenants[j].username));

      tR.appendChild(tH);
      tR.appendChild(tDName);
      tR.appendChild(tDUsername);

      tBody.appendChild(tR);
    }

    newTenantTable.appendChild(tBody);
    newPanel.appendChild(newTenantTable);

    var detailDiv = document.createElement("div");
    detailDiv.classList.add("text-center");
    var detailButton = document.createElement("button");
    detailButton.setAttribute("type", "button");
    detailButton.classList.add("btn");
    detailButton.classList.add("btn-primary");
    detailButton.setAttribute("id", "property-detail-button");
    detailButton.appendChild(document.createTextNode("Property details"));
    detailDiv.appendChild(detailButton);
    newPanel.appendChild(detailDiv);

    propertyInfoDiv.appendChild(newPanel);
  }
}

addPropertyButton.addEventListener("click", function (e) {
  e.preventDefault();
  window.location = "../Views/propertyregistry.html";
});

updateProfileButton.addEventListener("click", function (e) {
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
});

saveProfileButton.addEventListener("click", function (e) {
  e.preventDefault();
  updateProfileButton.removeAttribute("style");
  saveProfileButton.style.display = "none";

  sessionUser.fullName = nameInput.value;
  sessionUser.email = contactInput.value;

  nameInput.style.display = "none";
  contactInput.style.display = "none";

  updateUserInformation(sessionUser);

  profileName.removeAttribute("style");
  profileContact.removeAttribute("style");
});

propertyInfoDiv.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.id === "property-detail-button") {
    window.location = "../Views/propertysummary.html";
  }
});
