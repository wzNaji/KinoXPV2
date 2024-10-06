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

        const movieData = {
            title: title,
            genre: genre,
            duration: duration,
            ageLimit: ageLimit
        };

        try {
            const response = await fetch("/api/movies/movieList", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(movieData)
            });

            const resultText = await response.text(); // Getting the response text (assuming it might contain info or just using it for logging/error messages)

            if (response.ok) {
                createMovieMessage.innerText = "Movie successfully created: " + title;
                // Reset form fields
                document.getElementById("movieTitle").value = "";
                document.getElementById("movieGenre").value = "";
                document.getElementById("movieDuration").value = "";
                document.getElementById("ageLimit").value = "";
            } else {
                createMovieMessage.innerText = "Failed to create movie: " + resultText;
            }
        } catch (error) {
            console.log("Error:", error);
            createMovieMessage.innerText = "Error creating movie: " + error.message;
        }
    });
});
