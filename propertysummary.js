const tenants = []

const tenantSubmitButton = document.querySelector('#tenants-submit');
tenantSubmitButton.addEventListener('click', updateTenantsInfo);
function updateTenantsInfo(e) {
    e.preventDefault();
    const userID = document.querySelector('#tenants-input').value;
    const userTable = document.querySelector('#user-table');
    
    //DOM Manipulation
    const tbodyElement = document.createElement('tr');
    const thElement = document.createElement('th');
    thElement.setAttribute("scope", "row");
    thElement.appendChild(document.createTextNode(3));
    const tdfirst = document.createElement('td')
    tdfirst.appendChild(document.createTextNode("Camelo"))

    const tdsecond = document.createElement('td')
    tdsecond.appendChild(document.createTextNode("Anthony"))

    const tdthird = document.createElement('td')
    tdthird.appendChild(document.createTextNode("Melo"))

    tbodyElement.appendChild(thElement);
    tbodyElement.appendChild(tdfirst)
    tbodyElement.appendChild(tdsecond)
    tbodyElement.appendChild(tdthird)

    userTable.appendChild(tbodyElement);
    
}


