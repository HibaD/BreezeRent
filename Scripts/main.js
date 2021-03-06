const profile = document.querySelector("#panel-profile");
const messages = document.querySelector("#panel-messages");
const claims = document.querySelector("#panel-claims");
const placeholder = document.querySelector("#panel-placeholder");

const navProfile = document.querySelector("#nav-profile");
const navMessages = document.querySelector("#nav-messages");
const navClaims = document.querySelector("#nav-claims");
const navSupports = document.querySelector("#nav-supports");


const signOutButton = document.querySelector("#signOut");

profile.innerHTML = '<object data="../Views/landlord-view.html" height="100%" width="100%"></object>';
claims.innerHTML = '<object data="../Views/landlord-claim-main.html" height="100%" width="100%"></object>';

navProfile.addEventListener("click", function(e) {
  e.preventDefault();
  profile.innerHTML = '<object data="../Views/landlord-view.html" height="100%" width="100%"></object>';
});

navClaims.addEventListener("click", function(e) {
  e.preventDefault();
  claims.innerHTML = '<object data="../Views/landlord-claim-main.html" height="100%" width="100%"></object>';
});

navSupports.addEventListener("click", function(e) {
  e.preventDefault();
  claims.innerHTML = '<object data="../Views/landlord-support-main.html" height="100%" width="100%"></object>';
});