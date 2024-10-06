import "./loginForm.js";
import "./userList.js";
import "./createUser.js";
import "./createMovie.js";
import { fetchMovies } from './movieList.js';
import { sortMovies, filterMovies, filterMoviesByGenre } from './movieList.js';

fetchMovies();
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sort-options').onchange = sortMovies;
    document.getElementById('search-bar').onkeyup = filterMovies;
    document.getElementById('genre-filter').onchange = filterMoviesByGenre;
});
