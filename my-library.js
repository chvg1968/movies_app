
const watchedBtn = document.getElementById("watchedBtn");
const queueBtn = document.getElementById("queueBtn");
const watchedList = document.getElementById("watchedMovies").querySelector("ul");
const queueList = document.getElementById("queueMovies").querySelector("ul");
let watchedMovies = JSON.parse(localStorage.getItem("watchedMovies")) || [];
let queuedMovies = JSON.parse(localStorage.getItem("queuedMovies")) || [];

// Display watched movies by default
watchedList.style.display = "block";
queueList.style.display = "none";

// Display watched and queued movies
function displayMovies() {
  watchedList.innerHTML = "";
  queueList.innerHTML = "";

  watchedMovies.forEach(movie => {
    const li = document.createElement("li");
    li.textContent = movie.title;
    watchedList.appendChild(li);
  });

  queuedMovies.forEach(movie => {
    const li = document.createElement("li");
    li.textContent = movie.title;
    queueList.appendChild(li);
  });
}

displayMovies();

// Event listener for "watched" button
watchedBtn.addEventListener("click", () => {
  watchedList.style.display = "block";
  queueList.style.display = "none";
});

// Event listener for "queue" button
queueBtn.addEventListener("click", () => {
  watchedList.style.display = "none";
  queueList.style.display = "block";
});

// Get a reference to the "clear-storage" button
const clearStorageButton = document.getElementById("clearStorage");

// Add a click event listener to the button
clearStorageButton.addEventListener("click", function() {
  // Remove the values for the "watchedMovies" and "queuedMovies" keys from local storage
  localStorage.removeItem("watchedMovies");
  localStorage.removeItem("queuedMovies");
  watchedMovies = [];
  queuedMovies = [];
  displayMovies();
});

// Update movie lists and local storage when user adds movie to watched or queue
const addToWatchedButton = document.getElementById("watchedButton");
addToWatchedButton.addEventListener("click", () => {
  const movieTitle = addToWatchedButton.dataset.movieTitle;
  watchedMovies.push({ title: movieTitle });
  localStorage.setItem("watchedMovies", JSON.stringify(watchedMovies));
  displayMovies();
});

const addToQueueButton = document.getElementById("queueButton");
addToQueueButton.addEventListener("click", () => {
  const movieTitle = addToQueueButton.dataset.movieTitle;
  queuedMovies.push({ title: movieTitle });
  localStorage.setItem("queuedMovies", JSON.stringify(queuedMovies));
  displayMovies();
});