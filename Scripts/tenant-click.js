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
  constructor(user, commentEntered) {
    this.user = user;
    this.commentEntered = commentEntered;
  }
}
//server call to initialize page and pull data from db
function initialize() {
  const claimEx1 = new Claim('Fix kitchen sink', 'Water fills up in sink and takes a long time to drain', 'Test');
  const claimEx2 = new Claim('Toilet clogged', 'Water fills up in sink and takes a long time to drain', 'Test');
  claimList.push(claimEx1);
  claimList.push(claimEx2);
  claimEx1.claimStatus = 'In-Progress';

  addToClaimTableTenant(claimEx1);

  const comment1 = new Comment('L', 'This is not a valid request based on section 5 of lease agreement');
  const comment2 = new Comment('T', 'The issue is caused by tenants living upstairs');
  addCommentToSection(comment1);
  addCommentToSection(comment2);
}
initialize();

const newCommentFormTenant = document.querySelector("#addCommentTenant");
newCommentFormTenant.addEventListener("submit", addCommentTenant);

function addCommentTenant(e) {
  e.preventDefault();
  const commentText = (document.querySelector("#commentT")).value;
  if (commentText === "") {
    return;
  }

  const comment = new Comment('T', commentText);
  addCommentToSection(comment);
  document.getElementById('addCommentTenant').reset()
}

function addCommentToSection(comment) {
  const commentSec = document.querySelector(".commentsT");

  if (comment.user == 'L') {
    const newComment = document.createElement("div");
    newComment.classList.add("landlordComment");
    newComment.classList.add("comment");

    const icon = document.createElement('div');
    icon.classList.add('icon');
    icon.appendChild(document.createTextNode('L'));
    newComment.appendChild(icon);
    newComment.appendChild(document.createTextNode(comment.commentEntered));
    commentSec.appendChild(newComment);
  } else {
    const newComment = document.createElement("div");
    newComment.classList.add("tenantComment");
    newComment.classList.add("comment");

    const icon = document.createElement('div');
    icon.classList.add('icon');
    icon.appendChild(document.createTextNode('T'));

    newComment.appendChild(icon);
    newComment.appendChild(document.createTextNode(comment.commentEntered));
    commentSec.appendChild(newComment);
  }
}

function addToClaimTableTenant(claim) {
  const claimTable = document.querySelector("#claimClickedTenant");

  const claimTitle = document.createElement("td");
  const claimDetails = document.createElement("td");
  const claimStatus = document.createElement("td");

  claimTitle.classList.add("align-middle");
  claimDetails.classList.add("align-middle");
  claimStatus.classList.add("align-middle");

  const newClaim = document.createElement("tr");

  const statusDiv = document.createElement("div");

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

  newClaim.appendChild(claimTitle);
  newClaim.appendChild(claimDetails);
  newClaim.appendChild(claimStatus);
  claimTable.appendChild(newClaim);
}
