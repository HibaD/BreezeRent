const userList = []

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

userList.push(new User("root", "csc309", "abc@a.com", "master"))
userList[0].addRole("admin")

const registerForm = document.querySelector("#registerForm")

registerForm.addEventListener('submit', addNewUser)

function addNewUser(e) {
    var id = registerForm.newId.value;
    var pwd = registerForm.newPwd.value;
    var pwd2 = registerForm.repeatPwd.value;
    var email = registerForm.newEmail.value;
    var name = registerForm.legalName.value;


}
