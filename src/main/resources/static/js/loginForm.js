document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("loginButton");
    const loginForm = document.getElementById("loginForm");

    if (loginButton && loginForm) {
        loginButton.addEventListener("click", () => {
            // Hvis formen allerede vises ved content load, sættes den til 'none' på 0,4s.
            if (loginForm.classList.contains("show")) {
                loginForm.classList.remove("show");
                setTimeout(() => {
                    loginForm.style.display = "none";
                }, 400); // Match the CSS transition duration
            } else {
                // Eller vises den når der klikkes på login knappen.
                loginForm.style.display = "block"; // Make it visible first
                setTimeout(() => {
                    loginForm.classList.add("show"); // Transition
                }, 10); // Smooth transition
            }
        });
    }

    const loginFormElement = document.getElementById("loginFormElement");
    const loginMessage = document.getElementById("loginMessage");

    if (loginFormElement) {
        loginFormElement.addEventListener("submit", async (event) => {
            event.preventDefault();

            // fang værdierne
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            try {
                const response = await fetch("/api/users/login", {
                    method: "POST",
                    headers: {
                        'Content-Type':'application/json' // Vis at vi gerne vil sende json. Se controller api 'loginData' parameter.
                    },
                    body: JSON.stringify({username,password}) // Her sender vi json dataen.
                })

                const result = await response.text();// Venter på svar fra api
                loginMessage.innerText = result;
            } catch (error) {
                console.log("Error", error);
            }
        })
    }
});