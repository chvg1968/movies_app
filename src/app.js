const apiKey = "f9834d4be2b0f414292cfcbaafb78093";

const form = document.querySelector("form");
const input = document.querySelector("input[type='text']");
const movieCards = document.getElementById("movie-cards");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  searchMovies(input.value);
});

function searchMovies(query) {
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
  )
    .then((response) => response.json())
    .then((data) => {
      displayMovies(data.results);
    })
    .catch((error) => console.error(error));
}

function displayMovies(movies) {
  movieCards.innerHTML = "";
  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    movieCard.innerHTML = `
      <img class="poster" src="https://image.tmdb.org/t/p/w300${
        movie.poster_path
      }" alt="${movie.title}">
      <h2 class="title">${movie.title}</h2>
      <p class="info">${movie.release_date.substring(0, 4)} | ${
      movie.vote_average
    }/10</p>
    `;
    movieCards.appendChild(movieCard);
    movieCard.addEventListener("click", () => {
      displayMovieDetails(movie);
    });
  });
}

function displayMovieDetails(movie) {
  const modal = document.querySelector(".modal");
  const modalContent = `
    <div class="modal-header">
      
      <button class="modal-close">&times;</button>
    </div>
    <div>
      <img class="modal-poster" src="https://image.tmdb.org/t/p/w500${
        movie.poster_path
      }" alt="${movie.title}">
    </div>
    <div>
      <h2 class="modal-title">${movie.title}</h2>
      <p class="modal-info">Vote Count: ${movie.vote_average} | ${movie.vote_count}<br>Popularity: ${
      movie.popularity
    }<br>Original Title: ${movie.original_title}<br>Genre: ${getGenres(
      movie.genre_ids
    )}</p>
      <p class="modal-about"><b>ABOUT</b><br>${movie.overview}</p>
      <div class="modal-buttons">
        <button class="watch-btn">ADD TO WATCHED</button>
        <button class="queue-btn">ADD TO QUEUE</button>
      </div>
    </div>
  `;
  const modalContentWrapper = document.createElement("div");
  modalContentWrapper.innerHTML = modalContent;
  modalContentWrapper.classList.add("modal-content");
  modal.appendChild(modalContentWrapper);
  modal.style.display = "block";

  const closeButton = modalContentWrapper.querySelector(".modal-close");
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
    modalContentWrapper.remove();
  });

  const watchButton = modalContentWrapper.querySelector(".watch-btn");
  const queueButton = modalContentWrapper.querySelector(".queue-btn");
  watchButton.addEventListener("click", () => {
    saveMovie(movie, "watched");
  });
  queueButton.addEventListener("click", () => {
    saveMovie(movie, "queue");
  });

  // Hide the modal window when the user clicks on the background or the close button
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      modalContentWrapper.remove();
    }
  });
}

function getGenres(genreIds) {
  const genres = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };
  return genreIds.map((id) => genres[id]).join(", ");
}

function saveMovie(movie, listName) {
  const storageKey = listName === "watched" ? "watchedMovies" : "queuedMovies";
  const savedMovies = JSON.parse(localStorage.getItem(storageKey)) || [];
  savedMovies.push(movie);
  localStorage.setItem(storageKey, JSON.stringify(savedMovies));
}
