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

class Comment {
  constructor(user, comment) {
    this.user = user;
    this.comment = comment;
  }
}

function initialize() {
  const claimEx1 = new Claim('Fix kitchen sink', 'Water fills up in sink and takes a long time to drain', 'Test');
  const claimEx2 = new Claim('Toilet clogged', 'Water fills up in sink and takes a long time to drain', 'Test');
  claimList.push(claimEx1);
  claimList.push(claimEx2);
  claimEx1.claimStatus = 'In-Progress';

  addToClaimTableTenant(claimEx1);
  addToClaimTableTenant(claimEx2);
}
initialize();

const newClaim = document.querySelector("#addNewClaim");
newClaim.addEventListener("submit", addClaim);

function addCommentTenant(e) {
  e.preventDefault();
  const commentText = (document.querySelector("#commentT")).value;
  const commentSec = document.querySelector(".commentsT");

  const newComment = document.createElement("div");
  newComment.classList.add("tenantComment");
  newComment.classList.add("comment");

  const icon = document.createElement('div');
  icon.classList.add('icon');
  icon.appendChild(document.createTextNode('T'));

  newComment.appendChild(icon);
  newComment.appendChild(document.createTextNode(commentText));
  commentSec.appendChild(newComment);
}

function addClaim(e) {
  e.preventDefault();

  const textTitle = (document.querySelector("#title")).value;
  const textDescription = (document.querySelector("#description")).value;

  console.log(claimList);
  const claim = new Claim(textTitle, textDescription, 'Test')
  claimList.push(claim);

  addToClaimTableTenant(claim);

}

function addToClaimTableTenant(claim) {
  const claimTable = document.querySelector("#claimInfoTenant");

  const claimTitle = document.createElement("td");
  const claimDetails = document.createElement("td");
  const claimStatus = document.createElement("td");

  claimTitle.classList.add("align-middle");
  claimDetails.classList.add("align-middle");
  claimStatus.classList.add("align-middle");

  const newClaim = document.createElement("tr");

  const aTag = document.createElement("a");
  const statusDiv = document.createElement("div");

  aTag.setAttribute('href', 'Tenant-Claim-Click.html');
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

  newClaim.appendChild(claimTitle);
  newClaim.appendChild(claimDetails);
  newClaim.appendChild(claimStatus);
  claimTable.appendChild(newClaim);
}