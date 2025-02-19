function generateID() {
    return Date.now();
}

class User {
    constructor(firstname, lastname, email, password) {
        this.id = generateID();
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }
}

const users = [
    new User('John', 'Doe', 'john.doe@mail.com', '12345'),
    new User('Jane', 'Doe', 'jane.doe@mail.com', 'p@ssW0rd')
]

// Add new user to local storage
function addNewUsers(user) {
    localStorage.setItem("user#" + JSON.stringify(user.email), JSON.stringify(user))
}

function displayMessage(message, isError = false) {
    html.messageDiv.style.display = "block";
    html.messageDiv.textContent = message;
    html.messageDiv.classList.add(isError ? "error" : "success");

    setTimeout(() => {
        html.messageDiv.textContent = "";
        html.messageDiv.style.display = "none";
    }, 2000)
}
export { User, users, addNewUsers, generateID, displayMessage};