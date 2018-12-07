const clickTable = document.querySelector("#claimClickedLandlord");

var claimClicked;
const claimTable = document.querySelector("#claimInfoLandlord");
//server call to initialize claims page and pull data from db
function initialize() {
  //const claimEx1 = new Claim('Fix kitchen sink', 'Water fills up in sink and takes a long time to drain', 'Property 1');
  //const claimEx2 = new Claim('Toilet clogged', 'Water fills up in sink and takes a long time to drain', 'Property 3');
	
	const url = '/allClaims';
	const request = new Request (url, {
			method: 'get',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
	});
	fetch(request)
    .then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
            alert('Could not get users')
       }                
    })
    .then((json) => {
		for (i=0; i< json.allClaims.length; i++){
			addToClaimTableLandlord(json.allClaims[i]);
		}
    }).catch((error) => {
        console.log(error)
    })
	
  // claimTable = document.querySelector("#supportInfoLandlord");
  // addToSupportTableLandlord(claimEx2);
  
}
if(claimTable){
	initialize();
}

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

  aTag.setAttribute('href', '');
  aTag.setAttribute('id', claim._id);
  aTag.setAttribute('class', 'claimTag');
  aTag.appendChild(document.createTextNode(claim.title));
  claimTitle.appendChild(aTag);

  claimDetails.classList.add("description");
  claimDetails.appendChild(document.createTextNode(claim.detail));

  statusDiv.classList.add("alert");

  if (claim.status === "In-Progress") {
    statusDiv.classList.add("alert-success");
  } else if (claim.status === "Rejected") {
    statusDiv.classList.add("alert-danger");
  } else {
    statusDiv.classList.add("alert-warning");
  }

  statusDiv.appendChild(document.createTextNode(claim.status));
  claimStatus.appendChild(statusDiv);

  newClaim.appendChild(claimProperty);
  newClaim.appendChild(claimTitle);
  newClaim.appendChild(claimDetails);
  newClaim.appendChild(claimStatus);
  claimTable.appendChild(newClaim);
  addEventListener();
}

function addEventListener(){
	let claimTag = document.querySelector(".claimTag");

	claimTag.addEventListener("click", function(e) {
		e.preventDefault();
		const claimId = event.target.id;
		const url = '/findClaim';
		const ids = {
			id: claimId
		}
		const request = new Request (url, {
				method: 'post',
				body: JSON.stringify(ids),
				headers: {
					'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/json'
				}
		});
		fetch(request).then((res) => { 
			if (res.status === 200) {
				return res.json();	
			} else {
				alert('Could not get claim clicked')
			}
	    }).then((json) => {
			let claim = json.claim;
			claimClicked = claim;
		    addToLandlordClick(json.claim);
		                  
		}).catch((error) => {
			console.log(error)
		})
		
	})
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



/**************Clicked Claim********************/

const newCommentFormLandlord = document.querySelector("#addCommentLandlord");
newCommentFormLandlord.addEventListener("submit", addCommentLandlord);

function showAllComments(){
	console.log(claimClicked);
	const url = '/allComments/'+claimClicked._id;
	const request = new Request (url, {
			method: 'get',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
	});
	fetch(request)
    .then((res) => { 
        if (res.status === 200) {
           return res.json() 
       } else {
            alert('Could not get comments')
       }                
    })
    .then((json) => {
		console.log(json.comments[0])
		for (i=0; i< json.comments.length; i++){
			
			addCommentToSection(json.comments[i]);
		}
    }).catch((error) => {
        console.log(error)
    })
}

function addCommentLandlord(e) {
    e.preventDefault();
	console.log(claimClicked._id);
	
    const url = '/createComment/'+claimClicked._id;
	const commentText = (document.querySelector("#commentL")).value;
	  if (commentText === "") {
		return;
	  }
	  const newComment= {
		  author: 'Landlord',
		 content: commentText
	  }
	const request = new Request (url, {
			method: 'post',
			body: JSON.stringify(newComment),
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
	});
	fetch(request)
    .then((res) => { 
        if (res.status === 200) {
           
		  const comment = new Comment('L', commentText);
		  addCommentToSection(comment);
		  document.getElementById('addCommentLandlord').reset() 
       } else {
            alert('Could not get comments')
       }                
    }).catch((error) => {
        console.log(error)
    })
  
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
    const url = '/claimClicked';
	
	const ids = {
		id: claim.id
	}
	const request = new Request (url, {
			method: 'post',
			body: JSON.stringify(ids),
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			}
	});
	fetch(request)
    .then((res) => { 
        if (res.status === 200) {
			window.location.assign('/claimsPage')
	
			const claimTitle = document.createElement("td");
  const claimDetails = document.createElement("td");
  const claimStatus = document.createElement("td");

  const newClaim = document.createElement("tr");

  claimTitle.appendChild(document.createTextNode(claim.title));
  claimDetails.appendChild(document.createTextNode(claim.detail));

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
  showAllComments();
 
  //console.log(clickTable);
  //clickTable.appendChild(newClaim);	
		} else {
            alert('Could not get claim clicked')
        }
	}).catch((error) => {
        console.log(error)
    })
}
