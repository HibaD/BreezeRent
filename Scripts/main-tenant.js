const profile = document.querySelector("#panel-profile");
const messages = document.querySelector("#panel-messages");
const claims = document.querySelector("#panel-claims");
const placeholder = document.querySelector("#panel-placeholder");

const navProfile = document.querySelector("#nav-profile");
const navMessages = document.querySelector("#nav-messages");
const navClaims = document.querySelector("#nav-claims");
const navSupports = document.querySelector("#nav-support");


const signOutButton = document.querySelector("#signOut");

profile.innerHTML = '<object data="../Views/tenant-view.html" height="100%" width="100%"></object>';
claims.innerHTML = '<object data="../Views/Tenant-Claim-Main.html" height="100%" width="100%"></object>';

navProfile.addEventListener("click", function(e) {
  e.preventDefault();
  profile.innerHTML = '<object data="../Views/tenant-view.html" height="100%" width="100%"></object>';
});

navClaims.addEventListener("click", function(e) {
  e.preventDefault();
  claims.innerHTML = '<object data="../Views/tenant-claim-main.html" height="100%" width="100%"></object>';
});

navSupports.addEventListener("click", function(e) {
  e.preventDefault();
  claims.innerHTML = '<object data="../Views/tenant-support-main.html" height="100%" width="100%"></object>';
});

signOutButton.addEventListener("click", function(e) {
  e.preventDefault();
  window.location = "../Views/index.html";
})
