import { fetchMovies } from './movieList.js';

document.addEventListener("DOMContentLoaded", () => {
    const createMovieButton = document.getElementById("createMovieButton");
    const createMovieForm = document.getElementById("createMovieForm");
    const createMovieMessage = document.getElementById("createMovieMessage");

    createMovieButton.addEventListener("click", () => {
        createMovieForm.classList.toggle("show");
    });

    const createMovieFormElement = document.getElementById("createMovieFormElement");

    createMovieFormElement.addEventListener("submit", async (event) => {
        event.preventDefault();

        const title = document.getElementById("movieTitle").value;
        const genre = document.getElementById("movieGenre").value;
        const duration = parseInt(document.getElementById("movieDuration").value, 10);
        const ageLimit = parseInt(document.getElementById("ageLimit").value, 10);
        const cinemaHallSize = document.getElementById("cinemaHall").value;

        // Fetch the correct CinemaHall object based on the size selected
        let cinemaHall;
        try {
            const response = await fetch(`/api/cinema/halls/size/${cinemaHallSize}`);
            if (!response.ok) {
                throw new Error("Failed to fetch cinema hall");
            }
            cinemaHall = await response.json();
        } catch (error) {
            console.error("Error fetching cinema hall:", error);
            createMovieMessage.innerText = "Failed to fetch cinema hall. Please try again.";
            return;
        }

        // Build the movie data including the CinemaHall object
        const movieData = {
            title: title,
            genre: genre,
            duration: duration,
            ageLimit: ageLimit,
            cinemaHall: cinemaHall  // Send the full CinemaHall object
        };

        try {
            const response = await fetch("/api/movies/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(movieData)  // Send the movie data including CinemaHall
            });

            const resultText = await response.text();  // Get the response text

            if (response.ok) {
                createMovieMessage.innerText = "Movie successfully created: " + title;
                // Reset form fields
                document.getElementById("movieTitle").value = "";
                document.getElementById("movieGenre").value = "";
                document.getElementById("movieDuration").value = "";
                document.getElementById("ageLimit").value = "";
                fetchMovies();
            } else {
                createMovieMessage.innerText = "Failed to create movie: " + resultText;
            }
        } catch (error) {
            console.log("Error:", error);
            createMovieMessage.innerText = "Error creating movie: " + error.message;
        }
    });
});
