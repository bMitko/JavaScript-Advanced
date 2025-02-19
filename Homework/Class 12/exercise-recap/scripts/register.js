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

export { registerUser }