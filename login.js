const userList = {}

class User {
    constructor(id, pwd, email, name) {
        this.id = id;
        this.pwd = pwd;
        this.email = email;
        this.name = name;
        this.role = []];
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

registerForm.addEventListener('submit', addNewUser)

function addNewUser(e) {
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

    userList[id] = new User(id, pwd, email, name)

}
