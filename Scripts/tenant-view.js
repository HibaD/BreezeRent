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

const updateProfileButton = document.querySelector("#update-profile-button");
const saveProfileButton = document.querySelector("#save-profile-button");

const profileName = document.querySelector("#profile-name");
const profileNameDiv = document.querySelector("#profile-name-div");
const profileContact = document.querySelector("#profile-contact");
const profileContactDiv = document.querySelector("#profile-contact-div");
const profileRole = document.querySelector("#profile-role");
const profileRatings = document.querySelector("#profile-ratings");

const noticeList = document.querySelector("#notice-list");

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

function displayNotices(notices) {
  var newNotice, closeButton, xSpan;
  for (var i = 0; i < notices.length; i++) {
    newNotice = document.createElement("li");
    newNotice.classList.add("list-group-item");

    closeButton = document.createElement("button");
    closeButton.setAttribute("type", "button");
    closeButton.classList.add("close");
    closeButton.setAttribute("aria-label", "Close");

    xSpan = document.createElement("span");
    xSpan.setAttribute("aria-hidden", "true");
    xSpan.innerHTML = "&times;";

    closeButton.appendChild(xSpan);
    newNotice.appendChild(document.createTextNode(notices[i].message));
    newNotice.appendChild(closeButton);
    noticeList.appendChild(newNotice);
  }
}

displayNotices(notices);

noticeList.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains("close")) {
    var notice = e.target.parentElement.parentElement;
    notice.parentElement.removeChild(notice);
  }
});
