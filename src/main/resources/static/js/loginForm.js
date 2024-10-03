document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("loginButton");
    const loginForm = document.getElementById("loginForm");
    const userListButton = document.getElementById("userListButton");
    const createUserButton = document.getElementById("createUserButton");
    const loginFormElement = document.getElementById("loginFormElement");
    const loginMessage = document.getElementById("loginMessage");

    // Handle login form visibility toggle
    loginButton.addEventListener("click", () => {
        if (loginForm.classList.contains("show")) {
            loginForm.classList.remove("show");
            setTimeout(() => {
                loginForm.style.display = "none";
            }, 400);
        } else {
            loginForm.style.display = "block";
            setTimeout(() => {
                loginForm.classList.add("show");
            }, 10);
        }
    });

    // Handle form submission for login
    loginFormElement.addEventListener("submit", async (event) => {
        event.preventDefault();

        // Capture username and password
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("/api/users/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            });

            const result = await response.text();
            loginMessage.innerText = result;

            // After a successful login, check if the user is an admin
            if (response.ok) {
                await checkIsAdmin(); // Immediately check admin status

                // Auto-hide the login form after 1 second
                setTimeout(() => {
                    loginForm.classList.remove("show");
                    setTimeout(() => {
                        loginForm.style.display = "none";
                    }, 400);
                }, 1000);
            }

        } catch (error) {
            console.error("Error", error);
        }
    });

    // Function to check if the logged-in user is an admin
    async function checkIsAdmin() {
        try {
            const response = await fetch("/api/users/isAdmin");

            if (response.ok) {
                const isAdmin = await response.json();

                // If the user is an admin, show the user list and create user buttons
                if (isAdmin) {
                    userListButton.classList.add("show");
                    createUserButton.classList.add("show");
                }
            } else {
                console.error("Failed to check admin status");
            }
        } catch (error) {
            console.error("Error fetching admin status: ", error);
        }
    }
});
