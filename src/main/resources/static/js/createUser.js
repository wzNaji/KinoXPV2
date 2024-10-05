document.addEventListener("DOMContentLoaded", () => {
    const createUserButton = document.getElementById("createUserButton");
    const createUserForm = document.getElementById("createUserForm");
    const createUserFormElement = document.getElementById("createUserFormElement");
    let createUserMessage = document.getElementById("createUserMessage")
    const userListButton = document.getElementById("userListButton");

    createUserButton.addEventListener("click", () => {
        createUserForm.classList.toggle("show");
    });

    createUserFormElement.addEventListener("submit", async(event) => {
        event.preventDefault();

        const username = document.getElementById("newUsername");
        const password = document.getElementById("newPassword");


        try {
            const response = await fetch("/api/users/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username: username.value, password: password.value})
            })

        if (response.ok) {
            createUserMessage.innerText = "User successfully created: " + username.value;
            userListButton.click();
            username.value = "";
            password.value = "";
        } else
            createUserMessage.innerText = "Failed to create user: " + username.value;
            username.value = "";
            password.value = "";
        } catch (error) {
            console.log("Error:" + error)
        }

    })


});
