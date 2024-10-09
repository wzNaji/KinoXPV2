// Function to get query parameters from the URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Use the function to get the movieId
const movieId = getQueryParam('movieId');
console.log('Movie ID:', movieId);

// Function to fetch movie details by ID
async function findMovieById(movieId) {
    try {
        const response = await fetch(`/api/movies/${movieId}`, {
            method: 'GET',  // Make a GET request to your API
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching movie: ${response.statusText}`);
        }

        const movie = await response.json();  // Parse the JSON response
        displayMovieDetails(movie);  // Call a function to display the movie details
    } catch (error) {
        console.error("Error fetching movie details:", error);
        // Handle errors (e.g., display a message to the user)
    }
}

// Call the function to fetch movie details when the page loads
if (movieId) {
    await findMovieById(movieId);
}

// Function to display movie details on the page
function displayMovieDetails(movie) {
    const movieContainer = document.getElementById('movie-details-container');

    movieContainer.innerHTML = `
        <h1>${movie.title}</h1>
        <p>Genre: ${movie.genre}</p>
        <p>Duration: ${movie.duration} minutes</p>
        <p>Age Limit: ${movie.ageLimit}+</p>
    `;
}
