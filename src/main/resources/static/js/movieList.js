export let allMovies = [];

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

// Function to sort movies based on selected criteria
export function sortMovies() {
    const sortOption = document.getElementById("sort-options").value;
    let sortedMovies = [...allMovies];  // Create a copy of the array

    switch (sortOption) {
        case 'title-asc':
            sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'title-desc':
            sortedMovies.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case 'age-asc':
            sortedMovies.sort((a, b) => a.ageLimit - b.ageLimit);
            break;
        case 'age-desc':
            sortedMovies.sort((a, b) => b.ageLimit - a.ageLimit);
            break;
    }

    displayMovies(sortedMovies);  // Display the sorted movies
}

// Function to filter movies by search input
export function filterMovies() {
    const searchTerm = document.getElementById("search-bar").value.toLowerCase();
    const filteredMovies = allMovies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm)
    );

    displayMovies(filteredMovies);  // Display the filtered movies
}

// Function to filter movies by selected genre
export function filterMoviesByGenre() {
    const selectedGenre = document.getElementById("genre-filter").value;

    if (selectedGenre === "all") {
        displayMovies(allMovies);
    } else {
        const filteredMovies = allMovies.filter(movie => movie.genre === selectedGenre);
        displayMovies(filteredMovies);
    }
}
