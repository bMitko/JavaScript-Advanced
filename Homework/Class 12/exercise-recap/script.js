// import { User, users, generateID, addNewUsers, displayMessage } from "./scripts/users"; //users.js
// import { registerUser } from "./scripts/register"; // register.js
// import { setLoggedInUser, getLoggedInUser, loginUser, logout } from "./scripts/login&logout"; // login&logout.js

// DOM Elements
const html = {
    loginForm: document.getElementById("login-form"),
    registerForm: document.getElementById("register-form"),
    messageDiv: document.getElementById('message'),
    logoutBtn: document.getElementById('logout-btn'),
    registerLink: document.getElementById("register-link"),
    main: document.getElementById('main'),
    backBtn: document.getElementById('backBtn'),
    firstname: document.getElementById('register-firstname'),
    lastname: document.getElementById('register-lastname'),
    email: document.getElementById('register-email'),
    password: document.getElementById('register-password'),
}

function generateID() {
    return Date.now();
}

// Utility that stores the logged in user in localeStorage
function setLoggedInUser(user) {
    localStorage.setItem("loggedUser", JSON.stringify(user));
}

function getLoggedInUser() {
    const user = localStorage.getItem("loggedUser");
    return user;
}

function logout(){
    localStorage.removeItem("loggedUser")
}

function addNewUsers(user){
    localStorage.setItem ("user#" + JSON.stringify(user.id), JSON.stringify(user))
}

class User {
    constructor(firstname, lastname, email, password) {
        this.id = generateID();
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }
};

// Hardcoded data (simulating a db);
const users = [
    new User('John', 'Doe', 'john.doe@mail.com', '12345'),
    new User('Jane', 'Doe', 'jane.doe@mail.com', 'p@ssW0rd')
];

// Simulate login API call
function loginUser(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const userFound = users.find((user) => {
                return user.email === email && user.password === password
            })

            // Early return
            if (!userFound) {
                reject({ message: "Invalid email or password" });
                return;
            }

            resolve(userFound)
        }, 1000);

    })
};

// Simulate register API call
function registerUser(firstname, lastname, email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!firstname || !lastname || !email || !password) {
                reject({ message: "All fields are required" });
                return
            };

            const userExists = users.some((user) => user.email === email);
            if (userExists) {
                reject({ message: `User with the email: ${email} already exists.` });
                return;
            }

            const newUser = new User(firstname, lastname, email, password);
            users.push(newUser);
            addNewUsers(newUser)

            resolve({ message: "Registration succesful! Please log in." })

        }, 1000);
    })
}


// Display message utility
function displayMessage(message, isError = false) {
    html.messageDiv.style.display = "block";
    html.messageDiv.textContent = message;
    html.messageDiv.classList.add(isError ? "error" : "success");

    setTimeout(() => {
        html.messageDiv.textContent = "";
        html.messageDiv.style.display = "none";
    }, 2000)
}


// IIFE => Immedietly invoked function expression
(() => {
    const keyArray = Object.entries(localStorage)
    for (let key in keyArray) {
        users.push(JSON.parse(keyArray[key][1]))
    }
    const loggedInUser = getLoggedInUser();
    if (loggedInUser) {
        html.loginForm.style.display = "none";
        html.main.style.display = "flex";
    };

    // SCOPE OF THE IIFE

    // Event listeners
    // Handle Login
    html.loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            const result = await loginUser(email, password)
            html.loginForm.style.display = 'none';
            html.main.style.display = "flex";
            setLoggedInUser(result);
            displayMessage(`Welcome back ${result.firstname}!`)
            html.loginForm.reset() // clears all inputs in the form
        } catch (error) {
            displayMessage(error.message, true)
        }

    })

    // Handle register link
    html.registerLink.addEventListener("click", () => {
        html.loginForm.style.display = "none";
        html.registerForm.style.display = "block";
    })

    // Handle Register
    html.registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const firstname = html.firstname.value;
        const lastname = html.lastname.value;
        const email = html.email.value;
        const password = html.password.value;

        try {
            const result = await registerUser(firstname, lastname, email, password);
            displayMessage(result.message);
            html.registerForm.style.display = "none";
            html.loginForm.style.display = "block";
            html.registerForm.reset();
        } catch (error) {
            displayMessage(error.message, true)
        }
    })

    // Handle logout
    html.logoutBtn.addEventListener('click', () => {
        logout()
        html.loginForm.style.display = "block";
        html.main.style.display = "none";

        displayMessage('Logged out successfully!')
    })

    html.backBtn.addEventListener('click', () => {
        html.loginForm.style.display = "block";
        html.registerForm.style.display = "none";
    })
})();
