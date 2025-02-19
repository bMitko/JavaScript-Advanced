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
};

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
export { setLoggedInUser, getLoggedInUser, logout, loginUser}