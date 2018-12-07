const claimTable = document.querySelector("#claimInfoTenant");
var claimClicked;
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
		addEventListener();
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
		    claimClickTenant(json.claim);
		                  
		}).catch((error) => {
			console.log(error)
		})
		
	})
		
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

function claimClickTenant(claim) {
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

  newClaim.appendChild(claimTitle);
  newClaim.appendChild(claimDetails);
  newClaim.appendChild(claimStatus);
  claimTable.appendChild(newClaim);
  showAllComments();
}

/************Comments************/
function showAllComments(){
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
	for (i=0; i< json.comments.length; i++){
			addCommentToSection(json.comments[i]);
		}
    }).catch((error) => {
        console.log(error)
    })
}

const newCommentFormTenant = document.querySelector("#addCommentTenant");
newCommentFormTenant.addEventListener("submit", addCommentTenant);


function addCommentTenant(e) {
	e.preventDefault();
	const commentText = (document.querySelector("#commentT")).value;
	const url = '/createComment/'+claimClicked._id;
	console.log(commentText);
	console.log(claimClicked._id)
	if (commentText === "") {
		return;
	  }
	  const newComment= {
		  author: 'tenant',
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
		  addCommentToSection(newComment);
		  document.getElementById('addCommentTenant').reset() 
       } else {
            alert('Could not get comments')
       }                
    }).catch((error) => {
        console.log(error)
    })
  
}

function addCommentToSection(comment){
  const commentSec = document.querySelector(".commentsT");

  if (comment.author == 'landlord') {
    const newComment = document.createElement("div");
    newComment.classList.add("landlordComment");
    newComment.classList.add("comment");

    const icon = document.createElement('div');
    icon.classList.add('icon');
    icon.appendChild(document.createTextNode('L'));
    newComment.appendChild(icon);
    newComment.appendChild(document.createTextNode(comment.content));
    commentSec.appendChild(newComment);
  } else {
    const newComment = document.createElement("div");
    newComment.classList.add("tenantComment");
    newComment.classList.add("comment");

    const icon = document.createElement('div');
    icon.classList.add('icon');
    icon.appendChild(document.createTextNode('T'));

    newComment.appendChild(icon);
    newComment.appendChild(document.createTextNode(comment.content));
    commentSec.appendChild(newComment);
  }
}
