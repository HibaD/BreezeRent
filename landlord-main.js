class Claim {
	constructor (title, description, property){
		this.title = title;
		this.description = description;
		this.property = property;
		this.claimStatus = "Active";
		this.commentList = [];
	}
}

const claimList = [];

class Comment {
	constructor (user, comment){
		this.user = user;
		this.comment = comment;
	}
}

function initialize(){
	const claimEx1 = new Claim('Fix kitchen sink', 'Water fills up in sink and takes a long time to drain', 'Test');
	const claimEx2 = new Claim('Toilet clogged', 'Water fills up in sink and takes a long time to drain', 'Test');
	claimList.push(claimEx1);
	claimList.push(claimEx2);
	claimEx1.claimStatus = 'In-Progress';
	
	addToClaimTableLandlord(claimEx1);
	addToClaimTableLandlord(claimEx2);
}
initialize();

function addToClaimTableLandlord(claim){
	const claimTable = document.querySelector("#claimInfoLandlord");

	const claimProperty = document.createElement("td");
	const claimTitle = document.createElement("td");
	const claimDetails = document.createElement("td");
	const claimStatus = document.createElement("td");
	
	const newClaim = document.createElement("tr");
	
	const aTag = document.createElement("a");
	const statusDiv = document.createElement("div");
	
	claimProperty.appendChild(document.createTextNode(claim.property));
	
	aTag.setAttribute('href', 'Landlord-Claim-Click.html');
	aTag.appendChild(document.createTextNode(claim.title));
	claimTitle.appendChild(aTag);
	
	claimDetails.classList.add("description");
	claimDetails.appendChild(document.createTextNode(claim.description));
	
	statusDiv.classList.add(claim.claimStatus);
	statusDiv.appendChild(document.createTextNode(claim.claimStatus));
	claimStatus.appendChild(statusDiv);

	newClaim.appendChild(claimProperty);
	newClaim.appendChild(claimTitle);
	newClaim.appendChild(claimDetails);
	newClaim.appendChild(claimStatus);
	claimTable.appendChild(newClaim);
}