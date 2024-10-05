document.addEventListener("DOMContentLoaded", () => {
    const deleteButtons = document.getElementsByClassName("userDeleteButton");

    // Convert HTMLCollection to an array if needed (optional in modern browsers if using for..of)
    Array.from(deleteButtons).forEach(button => {
        button.addEventListener('click', function(event) {
            const userId = this.getAttribute('data-user-id');
            deleteUser(userId);
        });
    });

    function deleteUser(userId) {
        fetch(`/api/users/delete/${userId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    console.log('User deleted successfully');
                    // Optionally remove the user element from the DOM or refresh the list
                } else {
                    console.error('Failed to delete user');
                }
            })
            .catch(error => console.error('Error:', error));
    }
});
