function revealPwd() {
    var x = document.getElementById("newPwd");
    var y = document.getElementById("repeatPwd");
    if (x.type === "password" && y.type === "password") {
        x.type = "text";
        y.type = "text";
    } else {
        x.type = "password";
        y.type = "password";
    }
}

const userList = {}

class User {
    constructor(id, pwd, email, name) {
        this.id = id;
        this.pwd = pwd;
        this.email = email;
        this.name = name;
        this.role = [];
    }

    changeName(newName) {
      this.name = newName;
    }

    changePwd(newPwd) {
        this.pwd = newPwd;
    }

    changeEmail(newEmail) {
        this.email = newEmail;
    }

    addRole(role) {
        this.role.push(role);
    }
}

// Fake data
userList["root"] = new User("root", "csc309", "abc@a.com", "master")
userList["root"].addRole("admin")
userList["1"] = new User("1", "1", "one@a.com", "one")
userList["1"].addRole("tenant")
userList["2"] = new User("2", "2", "two@a.com", "two")
userList["2"].addRole("landlord")


const registerForm = document.querySelector("#registerForm")
const loginForm = document.querySelector("#loginForm")

if (registerForm) {
    registerForm.addEventListener('submit', addNewUser)
}
if (loginForm) {
    loginForm.addEventListener('submit', logIn)
}


function addNewUser(e) {
    e.preventDefault()

    var id = registerForm.newId.value;
    var pwd = registerForm.newPwd.value;
    var pwd2 = registerForm.repeatPwd.value;
    var email = registerForm.newEmail.value;
    var name = registerForm.legalName.value;

    if (id in userList) {
        if (email === userList[id].email) {
            //Replace with pop up or some notification on webpage
            console.log("existing profile, try remembering your password")
        } else {
            //Replace with pop up or some notification on webpage
            console.log("existing username, choose different user ID")
        }
        return
    }

    if (pwd !== pwd2) {
        console.log("password not matching")
        return // pwd not matching
    }

    userList[id] = new User(id, pwd, email, name)
    console.log(userList[id])
}

function logIn(e) {
    e.preventDefault()

    var userid = loginForm.userid.value;
    var password = loginForm.pwd.value;

    if (userid in userList) {
        if (userList[userid].pwd === password) {
            window.location.href = "main.html"
            return //login
        }
        console.log("Wrong Password")
        return //fail
    }
    console.log("user does not exist")
    return //fail
}
