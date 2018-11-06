const profile = document.querySelector("#panel-profile");
const messages = document.querySelector("#panel-messages");
const claims = document.querySelector("#panel-claims");
const placeholder = document.querySelector("#panel-placeholder");

$(document).ready(function() {
  $('#panel-profile').load('landlord-view.html');
});