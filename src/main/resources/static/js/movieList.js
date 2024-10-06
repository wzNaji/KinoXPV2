export let allMovies = [];  // Exporting this allows other modules to access the updated array if necessary

// Fetch movies from API
export function fetchMovies() {
    fetch('/api/movies/movieList')
        .then(response => {
            if (response.status === 204) {
                return [];  // Handle no content
            }
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(movies => {
            allMovies = movies;
            displayMovies(movies);  // Initial display of movies
            populateGenreDropdown(movies);  // Populate genre dropdown
        })
        .catch(error => {
            console.error('Failed to fetch movies:', error);
            document.getElementById("movies-container").innerHTML = `<p>Error loading movies: ${error.message}</p>`;
        });
}

// Display movies in a specified container
function displayMovies(movies) {
    const container = document.getElementById("movies-container");
    container.innerHTML = "";
    if (movies.length === 0) {
        container.innerHTML = "<p>No movies available.</p>";
    } else {
        movies.forEach(movie => {
            let movieElement = `
                <div class="movie">
                    <h2>${movie.title}</h2>
                    <p>Genre: ${movie.genre}</p>
                    <p>Duration: ${movie.duration} minutes</p>
                    <p>Age Limit: ${movie.ageLimit}+</p>
                </div>
            `;
            container.innerHTML += movieElement;
        });
    }
}

// Populate genre dropdown from fetched movies
function populateGenreDropdown(movies) {
    const genreSet = new Set();
    movies.forEach(movie => genreSet.add(movie.genre));
    const genreDropdown = document.getElementById("genre-filter");
    genreDropdown.innerHTML = '<option value="all">All Genres</option>';
    genreSet.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        genreDropdown.appendChild(option);
    });
}
