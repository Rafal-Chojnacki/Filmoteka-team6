const API_KEY = 'e7c806d7ce9bbdf1ef93bebcabbfe0f1';
const modalBackdrop = document.querySelector('.backdrop');
const btnClose = document.querySelector('.modal__btnClose');
const btnWatched = document.querySelector('.modal__btnWatched');
const btnQueued = document.querySelector('.modal__btnQueue');
const modalImg = document.querySelector('.modal__moviePoster');
const modalTitle = document.querySelector('.modal__title');
const modalAbout = document.querySelector('.modal__about');

let movieId;
let queuedFilmsArray = [];
let watchedFilmsArray = [];
function detailsHandler(clickedMovie) {
  //console.log(clickedMovie.target);

  if (clickedMovie.target.matches('img')) {
    movieId = clickedMovie.target.parentNode.id;
    //console.log(movieId);
    fetchId(movieId).then(movieData => {
      modalImg.setAttribute('src', `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`);
      modalTitle.textContent = movieData.title;
      modalAbout.textContent = movieData.overview;
      // console.log(movieData);
    });
    toggleModal();
  } else return;
}

async function fetchId(movieId) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`,
    );
    const Data = await response.json();
    return Data;
  } catch (error) {
    console.log(error);
  }
}

function toggleModal() {
  modalBackdrop.classList.toggle('is-hidden');
}
function saveToWatched() {
  fetchId(movieId).then(data => {
    watchedFilmsArray.push(data);
    localStorage.setItem('watched-films', JSON.stringify(watchedFilmsArray));
  });
}
function saveToQueue() {
  fetchId(movieId).then(data => {
    queuedFilmsArray.push(data);
    localStorage.setItem('queued-films', JSON.stringify(queuedFilmsArray));
  });
}

gallery.addEventListener('click', detailsHandler);
btnClose.addEventListener('click', toggleModal);
btnWatched.addEventListener('click', saveToWatched);
btnQueued.addEventListener('click', saveToQueue);
