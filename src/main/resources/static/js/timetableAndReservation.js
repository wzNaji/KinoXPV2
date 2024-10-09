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
        await fetchTimetable(movieId);  // Fetch and display the movie's timetable
    } catch (error) {
        console.error("Error fetching movie details:", error);
        const movieContainer = document.getElementById('movie-details-container');
        movieContainer.innerHTML = `<p>Error fetching movie details. Please try again later.</p>`;
    }
}

// Fetch the movie's timetable by movieId
async function fetchTimetable(movieId) {
    try {
        const response = await fetch(`/api/timetables/movie/${movieId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching timetable: ${response.statusText}`);
        }

        const timetable = await response.json();  // Parse the timetable details
        displayTimetable(timetable);
    } catch (error) {
        console.error("Error fetching timetable:", error);
        const timetableContainer = document.getElementById('timetable-container');
        timetableContainer.innerHTML = `<p>Timetable not available.</p>`;
    }
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

// Function to display the movie's timetable on the page
function displayTimetable(timetable) {
    const timetableContainer = document.getElementById('timetable-container');

    timetableContainer.innerHTML = `
        <h2>Showtimes</h2>
        <p>Start Time: ${timetable.startTime}</p>
    `;
}

// Call the function to fetch movie details when the page loads
document.addEventListener("DOMContentLoaded", async () => {
    if (movieId) {
        await findMovieById(movieId);
    } else {
        const movieContainer = document.getElementById('movie-details-container');
        movieContainer.innerHTML = `<p>Invalid movie ID. Please select a valid movie.</p>`;
    }
});
