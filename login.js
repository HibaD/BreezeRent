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

userList["root"] = new User("root", "csc309", "abc@a.com", "master")
userList["root"].addRole("admin")


const registerForm = document.querySelector("#registerForm")
const loginForm = document.querySelector("#loginForm")
console.log(registerForm)
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
    window.open("index.html")
    // window.location.href = "index.html"
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
