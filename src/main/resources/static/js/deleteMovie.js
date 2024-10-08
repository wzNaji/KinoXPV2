import { allMovies } from './movieList.js'; // Assuming allMovies is an array of movie objects
import { fetchMovies } from './movieList.js';
// Function to search for movies to delete
function searchMoviesToDelete(searchTerm) {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    // Filter movies that include the search term in their title
    const filteredMovies = allMovies.filter(movie =>
        movie.title.toLowerCase().includes(lowerCaseSearchTerm)
    );
    return filteredMovies;
}

// Function to display the movies with delete buttons
// Function to display the movies with delete buttons
function displayMoviesForDeletion(movies) {
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = ''; // Clear the list

    if (movies.length === 0) {
        movieList.innerHTML = '<li>No movies found</li>';
        return;
    }

    // Loop through the filtered movies and add them to the list with a delete button
    movies.forEach(movie => {
        const listItem = document.createElement('li');
        listItem.textContent = movie.title;

        // Add a delete button for each movie
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';

        // Make the event listener async to handle async deleteMovie
        deleteButton.addEventListener('click', async () => {
            const confirmDeletion = confirm("Are you sure you want to delete: " + movie.title)
            if (!confirmDeletion){
                return
            }
            try {
                await deleteMovie(movie.id); // Await the deletion result
            } catch (error) {
                console.error('Error deleting movie:', error);
            }
        });

        listItem.appendChild(deleteButton);
        movieList.appendChild(listItem);
    });
}


// Function to delete a movie by ID
async function deleteMovie(movieId) {

    try {
        const response = await fetch(`/api/movies/delete/${movieId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const message = await response.text();
            alert(`Error: ${message}`);
            return;
        }

        await fetchMovies() // refresh this mofo


        let deleteMovieSearchTerm = document.getElementById("searchBar").value = ""
        const filteredMovies = searchMoviesToDelete(deleteMovieSearchTerm);
        displayMoviesForDeletion(filteredMovies); // Display filtered results with delete buttons
//TODO


    } catch (error) {
        console.error('Error deleting movie:', error);
        alert('Error deleting movie');
    }
}

// Listen for input in the search bar to filter movies for deletion
document.getElementById('searchBar').addEventListener('input', function() {
    const searchTerm = this.value;
    const filteredMovies = searchMoviesToDelete(searchTerm);
    displayMoviesForDeletion(filteredMovies); // Display filtered results with delete buttons
});
