class Claim {
  constructor(title, description, property) {
    this.title = title;
    this.description = description;
    this.property = property;
    this.claimStatus = "Active";
    this.commentList = [];
  }
}

const claimList = [];
const supportList = [];

class Comment {
  constructor(user, comment) {
    this.user = user;
    this.comment = comment;
  }
}
var claimTable;
//server call to initialize claims page and pull data from db
function initialize() {
  const claimEx1 = new Claim('Fix kitchen sink', 'Water fills up in sink and takes a long time to drain', 'Property 1');
  const claimEx2 = new Claim('Toilet clogged', 'Water fills up in sink and takes a long time to drain', 'Property 3');
  claimList.push(claimEx1);
  claimList.push(claimEx2);
  supportList.push(claimEx2);
  claimEx1.claimStatus = 'In-Progress';


  if(document.querySelector("#claimInfoLandlord") !== null) {   //on claim page
    claimTable = document.querySelector("#claimInfoLandlord");
    addToClaimTableLandlord(claimEx1);
    addToClaimTableLandlord(claimEx2);
  }else {                                                       //on support page
    claimTable = document.querySelector("#supportInfoLandlord");
    addToSupportTableLandlord(claimEx2);
  }
}

initialize();

function addToClaimTableLandlord(claim) {

  const claimProperty = document.createElement("td");
  const claimTitle = document.createElement("td");
  const claimDetails = document.createElement("td");
  const claimStatus = document.createElement("td");

  claimProperty.classList.add("align-middle");
  claimTitle.classList.add("align-middle");
  claimDetails.classList.add("align-middle");
  claimStatus.classList.add("align-middle");

  const newClaim = document.createElement("tr");

  const aTag = document.createElement("a");
  const statusDiv = document.createElement("div");

  claimProperty.appendChild(document.createTextNode(claim.property));

  aTag.setAttribute('href', 'Landlord-Claim-Click.html');
  aTag.appendChild(document.createTextNode(claim.title));
  claimTitle.appendChild(aTag);

  claimDetails.classList.add("description");
  claimDetails.appendChild(document.createTextNode(claim.description));

  statusDiv.classList.add("alert");

  if (claim.claimStatus === "In-Progress") {
    statusDiv.classList.add("alert-success");
  } else if (claim.claimStatus === "Rejected") {
    statusDiv.classList.add("alert-danger");
  } else {
    statusDiv.classList.add("alert-warning");
  }

  statusDiv.appendChild(document.createTextNode(claim.claimStatus));
  claimStatus.appendChild(statusDiv);

  newClaim.appendChild(claimProperty);
  newClaim.appendChild(claimTitle);
  newClaim.appendChild(claimDetails);
  newClaim.appendChild(claimStatus);
  claimTable.appendChild(newClaim);
}

function addToSupportTableLandlord(claim) {

  const claimProperty = document.createElement("td");
  const claimTitle = document.createElement("td");
  const claimDetails = document.createElement("td");
  const claimStatus = document.createElement("td");

  claimProperty.classList.add("align-middle");
  claimTitle.classList.add("align-middle");
  claimDetails.classList.add("align-middle");
  claimStatus.classList.add("align-middle");

  const newClaim = document.createElement("tr");

  const statusDiv = document.createElement("div");

  claimProperty.appendChild(document.createTextNode(claim.property));

  claimTitle.appendChild(document.createTextNode(claim.title));

  claimDetails.classList.add("description");
  claimDetails.appendChild(document.createTextNode(claim.description));

  statusDiv.classList.add("alert");

  if (claim.claimStatus === "In-Progress") {
    statusDiv.classList.add("alert-success");
  } else if (claim.claimStatus === "Rejected") {
    statusDiv.classList.add("alert-danger");
  } else {
    statusDiv.classList.add("alert-warning");
  }

  statusDiv.appendChild(document.createTextNode(claim.claimStatus));
  claimStatus.appendChild(statusDiv);

  newClaim.appendChild(claimProperty);
  newClaim.appendChild(claimTitle);
  newClaim.appendChild(claimDetails);
  newClaim.appendChild(claimStatus);
  claimTable.appendChild(newClaim);
}
