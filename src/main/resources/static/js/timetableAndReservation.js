let cinemaHallId;

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
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching movie: ${response.statusText}`);
        }

        const movie = await response.json();
        displayMovieDetails(movie);
        await fetchTimetable(movieId);
        await getCinemaHallIdByMovieId(movieId);
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

        const timetable = await response.json();
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

// Fetch the cinema hall ID by movie ID
async function getCinemaHallIdByMovieId(movieId) {
    const url = `/api/cinema/halls/${movieId}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch cinema hall ID. Movie may not exist.');
        }
        cinemaHallId = await response.json();
        console.log('Cinema Hall ID:', cinemaHallId);
        fetchSeats();  // Fetch seats after cinema hall ID is confirmed
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Fetch and display seats
function fetchSeats() {
    fetch(`/api/seats/${cinemaHallId}/seats`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch seats');
            }
            return response.json();
        })
        .then(seats => {
            displaySeats(seats);
        })
        .catch(error => {
            console.error('Error fetching seats:', error);
            document.getElementById('seating-chart').innerHTML = `<p>Error fetching seats: ${error.message}</p>`;
        });
}

// Display seats on the page
function displaySeats(seats) {
    const seatingChart = document.getElementById('seating-chart');
    seatingChart.innerHTML = '';

    seats.forEach(seat => {
        const seatElement = document.createElement('div');
        seatElement.classList.add('seat');
        seatElement.dataset.seatId = seat.id;

        if (seat.reserved) {
            seatElement.classList.add('reserved');
        } else {
            seatElement.addEventListener('click', () => toggleSeatSelection(seatElement));
        }

        seatingChart.appendChild(seatElement);
    });
    updateReserveButton();
}

// Toggle seat selection
function toggleSeatSelection(seatElement) {
    if (!seatElement.classList.contains('reserved')) {
        seatElement.classList.toggle('selected');
        updateReserveButton();
    }
}

// Update the reserve button based on selection
function updateReserveButton() {
    const selectedSeats = document.querySelectorAll('.seat.selected').length;
    const reserveButton = document.getElementById('reserve-seats');
    reserveButton.disabled = selectedSeats === 0;
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

// Add the event listener for the reservation button
document.getElementById('reserve-seats').addEventListener('click', () => {
    const selectedSeatElements = document.querySelectorAll('.seat.selected');
    const seatIds = Array.from(selectedSeatElements, seat => seat.dataset.seatId);

    fetch(`/api/seats/${cinemaHallId}/reserve`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(seatIds)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Reservation failed');
            }
            return response.text();
        })
        .then(message => {
            document.getElementById('reservation-status').innerText = message;
            fetchSeats();  // Refresh the seats to show any new reservations
        })
        .catch(error => {
            document.getElementById('reservation-status').innerText = error.message;
            console.error('Error reserving seats:', error);
        });
});
