const property_id = document.cookie.substring(document.cookie.indexOf("=")+1, document.cookie.length);
// Display property summary
const getPropertyRequest = new Request('/property/' + property_id, { method: 'get' });
fetch(getPropertyRequest).then((res) => {
  if (res.status === 200) {
    return res.json();
  }
}).then((property) => {
  displayTenantsInfo(property);
  displayNoticeInfo(property);
}).catch((error) => {
  console.log(error);
});

var count_tenant = 0;
function displayTenantsInfo(property) {
    const userTable = document.querySelector('#user-table');

    for(var i = 0; i<property.tenants.length; i++) {
        count_tenant++;
        let tbodyElement = document.createElement('tr');
        let thElement = document.createElement('th');
        thElement.setAttribute("scope", "row");
        thElement.appendChild(document.createTextNode(count_tenant));
    
        let tdthird = document.createElement('td')
        tdthird.appendChild(document.createTextNode(property.tenants[i]))
    
        tbodyElement.appendChild(thElement);
        tbodyElement.appendChild(tdthird)
    
        userTable.appendChild(tbodyElement);
    } 
        
}

function displayNoticeInfo(property) {
    const noticeTable = document.querySelector('#notice-table');

    //'11/06-water shut off'
    for(var i = 0; i<property.notices.length; i++) {
        count_notice++;
        let trElement = document.createElement('tr');
        let thElement = document.createElement('th');
        thElement.setAttribute("scope", "row");
        thElement.appendChild(document.createTextNode(count_notice));
        let tdfirst = document.createElement('td')
        
        let date = property.notices[i].substring(0, property.notices[i].indexOf("-"));
        let notice_text = property.notices[i].substring(property.notices[i].indexOf("-")+1, property.notices[i].length);

        tdfirst.appendChild(document.createTextNode(date))

        let tdsecond = document.createElement('td')
        tdsecond.appendChild(document.createTextNode(notice_text))


        trElement.appendChild(thElement);
        trElement.appendChild(tdfirst)
        trElement.appendChild(tdsecond)

        noticeTable.appendChild(trElement);
    }

      
}


const tenants = []

const tenantAddButton = document.querySelector('#tenants-submit');
const noticeSubmitButton = document.querySelector('#notice-submit');

tenantAddButton.addEventListener('click', updateTenantsInfo);
noticeSubmitButton.addEventListener('click', updateNoticeInfo);

var count_notice = 0;

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; 

if(dd<10) {
    dd = '0'+dd
} 

if(mm<10) {
    mm = '0'+mm
}

var date_format = mm + '/' + dd;

function updateTenantsInfo(e) {
    e.preventDefault();
    count_tenant ++;
    const userTable = document.querySelector('#user-table');

    //DOM Manipulation
    const tbodyElement = document.createElement('tr');
    const thElement = document.createElement('th');
    thElement.setAttribute("scope", "row");
    thElement.appendChild(document.createTextNode(count_tenant));
  
    const tenantInput = document.querySelector("#tenants-input")
    const tenantUserName = tenantInput.value

    const url = '/addUserToProperty/'+ tenantUserName + '/' + document.cookie;
    const request = new Request (url, {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
    });
    fetch(request)
      .then((res) => {
          if (res.status === 200) {
             return res.json()
         } else {
              alert('Could not add user')
         }
      })
      .then((json) => {
        tbodyElement.appendChild(thElement);
        const tdfirst = document.createElement('td');
        tdfirst.appendChild(document.createTextNode(tenantUserName));
        tbodyElement.appendChild(tdfirst);
        userTable.appendChild(tbodyElement);

      }).catch((error) => {
          console.log(error)
      })



}

function updateNoticeInfo(e) {
    e.preventDefault();
    count_notice++;
    const noticetext = document.querySelector('#notice-input').value;
    const noticeTable = document.querySelector('#notice-table');


    //DOM Manipulation
    const tbodyElement = document.createElement('tr');
    const thElement = document.createElement('th');
    thElement.setAttribute("scope", "row");
    thElement.appendChild(document.createTextNode(count_notice));
    const tdfirst = document.createElement('td')
    tdfirst.appendChild(document.createTextNode(date_format))

    const tdsecond = document.createElement('td')
    tdsecond.appendChild(document.createTextNode(noticetext))


    tbodyElement.appendChild(thElement);
    tbodyElement.appendChild(tdfirst)
    tbodyElement.appendChild(tdsecond)

    noticeTable.appendChild(tbodyElement);

}
