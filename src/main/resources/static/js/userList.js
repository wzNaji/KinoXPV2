document.addEventListener("DOMContentLoaded", () => {
    const userListButton = document.getElementById("userListButton");
    const mainContent = document.getElementById("content");

    userListButton.addEventListener("click", async () => {
        try {
            const response = await fetch("/api/users/userList"); // Send request to API

            if (response.ok) {
                const users = await response.json();
                console.log(users); // Debugging: Log fetched users

                // HTML content for user list
                let userListHtml = `
                    <section id="userListSection" class="show">
                        <h3>User List</h3>
                        <button id="closeButtonUsers">X</button>
                        <ul>
                `;
                users.forEach(user => {
                    userListHtml += `<li>${user.username} - ${user.userRole}</li>`;
                });
                userListHtml += "</ul></section>";

                // Insert the generated HTML into the main content
                mainContent.innerHTML = userListHtml;

                // Access the close button and set up its event listener
                document.getElementById("closeButtonUsers").addEventListener("click", () => {
                    const userListSection = document.getElementById("userListSection");
                    if (userListSection) {
                        userListSection.classList.remove("show"); // Correctly use classList.remove()
                        setTimeout(() => { // Optionally, hide after animation
                            userListSection.style.display = "none";
                        }, 400);
                    }
                });

            } else {
                mainContent.innerHTML = `<p>Error fetching user list: ${response.status}</p>`;
            }
        } catch (error) {
            mainContent.innerHTML = `<p>Error occurred while fetching user list: ${error.message}</p>`;
        }
    });
});
