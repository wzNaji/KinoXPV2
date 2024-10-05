document.addEventListener("DOMContentLoaded", () => {
    const createMovieButton = document.getElementById("createMovieButton");
    const createMovieForm = document.getElementById("createMovieForm");

    createMovieButton.addEventListener("click", () => {
        createMovieForm.classList.toggle("show");
    });
});
