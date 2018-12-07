const tenants = []

const tenantAddButton = document.querySelector('#tenants-submit');
const noticeSubmitButton = document.querySelector('#notice-submit');

tenantAddButton.addEventListener('click', updateTenantsInfo);
noticeSubmitButton.addEventListener('click', updateNoticeInfo);

var count_tenant = 2;
var count_notice = 1;

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

    // const tdfirst = document.createElement('td')
    // tdfirst.appendChild(document.createTextNode("Camelo"))
    //
    // const tdsecond = document.createElement('td')
    // tdsecond.appendChild(document.createTextNode("Anthony"))
    //
    // const tdthird = document.createElement('td')
    // tdthird.appendChild(document.createTextNode("Melo"))

    const url = '/property';
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
             return res.json()
         } else {
              alert('Could not get users')
         }
      })
      .then((json) => {
        tbodyElement.appendChild(thElement);
        const tdfirst = document.createElement('td');
        tdfirst.appendChild(document.createTextNode(""));
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
