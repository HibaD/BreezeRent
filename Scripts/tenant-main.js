const claimTable = document.querySelector("#claimInfoTenant");
//server call to initialize claims page and pull data from db
function initialize() {
													
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
			addToClaimTableTenant(json.allClaims[i]);
		}
    }).catch((error) => {
        console.log(error)
    })									
	//on support page
	//claimTable = document.querySelector("#supportInfoTenant");
    //addToSupportTableTenant(claimEx2);
  
}
initialize();

const newClaim = document.querySelector("#addNewClaim");
if(newClaim !== null) {
  newClaim.addEventListener("submit", addClaim);
}

const newTicket = document.querySelector("#createNewTicket");
if(newTicket !== null) {
  newTicket.addEventListener("submit", addTicket);
} 

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

	const url = '/addClaim';
	const newClaim = {
		title: textTitle,
		detail: textDescription,
		status: 'Active',
	}
	
	const request = new Request (url, {
			method: 'post',
			body: JSON.stringify(newClaim),
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
	});
	fetch(request)
    .then(function(res) {
        // Handle response we get from the API
        // Usually check the error codes to see what happened
        if (res.status === 200) {
            addToClaimTableTenant(newClaim);
			document.getElementById("addNewClaim").reset();
        } 
    }).catch((error) => {
        console.log(error)
    })
	
}

function addTicket(e) {
  e.preventDefault();

  const textTitle = (document.querySelector("#title")).value;

  const filter_support = supportList.filter(claim => claim.title.toUpperCase() === textTitle.toUpperCase());
  if(filter_support.length === 0) {     //didn't exist in the support list
    const filter_claim = claimList.filter(claim => claim.title.toUpperCase() === textTitle.toUpperCase());
    
    if(filter_claim.length === 0) {    //didn't exist in the claim list
      return Error('Cannot find in the claim list');
    }else{                      
      supportList.push(filter_claim[0]);

      addToSupportTableTenant(filter_claim[0]);
      document.getElementById("createNewTicket").reset();
    }
  }
  else {
    return Error('Cannot find in the support list');
  }

}

function addToClaimTableTenant(claim) {

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
  claimDetails.appendChild(document.createTextNode(claim.detail));

  statusDiv.classList.add("alert");

  if (claim.claimStatus === "In-Progress") {
    statusDiv.classList.add("alert-success");
  } else if (claim.claimStatus === "Rejected") {
    statusDiv.classList.add("alert-danger");
  } else {
    statusDiv.classList.add("alert-warning");
  }

  statusDiv.appendChild(document.createTextNode(claim.status));
  claimStatus.appendChild(statusDiv);

  newClaim.appendChild(claimTitle);
  newClaim.appendChild(claimDetails);
  newClaim.appendChild(claimStatus);
  claimTable.appendChild(newClaim);
}

function addToSupportTableTenant(claim) {

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