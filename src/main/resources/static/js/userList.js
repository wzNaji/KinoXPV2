let userListButton;
let userListContent;
document.addEventListener("DOMContentLoaded", () => {
    userListButton = document.getElementById("userListButton");
    userListContent = document.getElementById("userListContent");

    userListButton.addEventListener("click", async () => {
        let userListSection = document.getElementById("userListSection");

        // If the section exists and is currently shown, hide it
        if (userListSection && userListSection.classList.contains("show")) {
            userListSection.classList.remove("show");
        } else {
            // If the section does not exist or is not shown, fetch and display the users
            await fetchAndDisplayUsers();
            userListSection = document.getElementById("userListSection"); // Re-acquire the reference
            if (userListSection) {
                userListSection.classList.add("show");
            }
        }
    });
});

async function fetchAndDisplayUsers() {
    try {
        const response = await fetch("/api/users/userList");
        if (response.ok) {
            const users = await response.json();

            let userListHtml = '<section id="userListSection">';
            userListHtml += '<h3>User List</h3><ul>';

            users.forEach(user => {
                userListHtml += `
                    <li class="user-item">
                        <div class="user-details">${user.username} - ${user.userRole}</div>
                        <div class="user-actions">
                            <button class="userDeleteButton" data-user-id="${user.userId}">Delete</button>
                        </div>
                    </li>`;
            });

            userListHtml += '</ul></section>';
            userListContent.innerHTML = userListHtml;

            bindDeleteButtons();
        } else {
            userListContent.innerHTML = `<p>Error fetching user list: ${response.status}</p>`;
        }
    } catch (error) {
        userListContent.innerHTML = `<p>Error occurred while fetching user list: ${error.message}</p>`;
    }
}

function bindDeleteButtons() {
    const deleteButtons = document.getElementsByClassName("userDeleteButton");
    Array.from(deleteButtons).forEach(button => {
        button.addEventListener('click', function() {
            const userId = this.getAttribute('data-user-id');
            if (confirm("Are you sure you want to delete this user?")) {
                deleteUser(userId);
            }
        });
    });
}

function deleteUser(userId) {
    fetch(`/api/users/delete/${userId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                userListButton.click(); // Trigger the list to toggle or refresh
                userListButton.click(); // Trigger the list to toggle or refresh
            } else {
                console.error('Failed to delete user');
            }
        })
        .catch(error => console.error('Error:', error));
}