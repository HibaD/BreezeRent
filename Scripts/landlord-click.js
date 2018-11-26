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
//server call to initialize claims page and pull data from db
function initialize() {
  const claimEx1 = new Claim('Fix kitchen sink', 'Water fills up in sink and takes a long time to drain', 'Test');
  const claimEx2 = new Claim('Toilet clogged', 'Water fills up in sink and takes a long time to drain', 'Test');
  claimList.push(claimEx1);
  claimList.push(claimEx2);
  claimEx1.claimStatus = 'In-Progress';

  addToLandlordClick(claimEx1);

  const comment1 = new Comment('L', 'This is not a valid request based on section 5 of lease agreement');
  const comment2 = new Comment('T', 'The issue is caused by tenants living upstairs');
  addCommentToSection(comment1);
  addCommentToSection(comment2);
}
initialize();

const newCommentFormLandlord = document.querySelector("#addCommentLandlord");
newCommentFormLandlord.addEventListener("submit", addCommentLandlord);

function addCommentLandlord(e) {
  e.preventDefault();
  const commentText = (document.querySelector("#commentL")).value;
  if (commentText === "") {
    return;
  }
  const comment = new Comment('L', commentText);
  addCommentToSection(comment);
  document.getElementById('addCommentLandlord').reset()
}

function addCommentToSection(comment) {
  const commentSec = document.querySelector(".commentsL");

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

function addToLandlordClick(claim) {
  const claimTable = document.querySelector("#claimClickedLandlord");

  const claimTitle = document.createElement("td");
  const claimDetails = document.createElement("td");
  const claimStatus = document.createElement("td");

  const newClaim = document.createElement("tr");

  claimTitle.appendChild(document.createTextNode(claim.title));
  claimDetails.appendChild(document.createTextNode(claim.description));

  claimTitle.classList.add("align-middle");
  claimDetails.classList.add("align-middle");
  claimStatus.classList.add("align-middle");

  const claimForm = document.createElement('form');
  claimForm.id = claimStatus;
  const radioAcpt = document.createElement('input');
  const radioRjt = document.createElement('input');

  const divAcpt = document.createElement('div');
  const divRjt = document.createElement('div');

  radioAcpt.type = 'radio';
  radioRjt.type = 'radio';
  radioAcpt.value = 'Accept';
  radioRjt.value = 'Accept';
  radioAcpt.name = "status";
  radioRjt.name = "status";

  if (claim.claimStatus == 'In-Progress') {
    radioAcpt.setAttribute('checked', 'checked');
  } else if (claim.status == 'Rejected') {
    radioRjt.setAttribute('checked', 'checked');
  }

  divAcpt.appendChild(radioAcpt);
  divRjt.appendChild(radioRjt);

  divAcpt.appendChild(document.createTextNode(' Accept'));
  divRjt.appendChild(document.createTextNode(' Reject'));

  claimForm.appendChild(divAcpt);
  claimForm.appendChild(divRjt);
  claimStatus.appendChild(claimForm);

  newClaim.appendChild(claimTitle);
  newClaim.appendChild(claimDetails);
  newClaim.appendChild(claimStatus);
  claimTable.appendChild(newClaim);
}
