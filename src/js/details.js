const API_KEY = 'e7c806d7ce9bbdf1ef93bebcabbfe0f1';
const modalBackdrop = document.querySelector('.backdrop');
const btnClose = document.querySelector('.modal__btnClose');
const btnWatched = document.querySelector('.modal__btnWatched');
const btnQueued = document.querySelector('.modal__btnQueue');
const modalImg = document.querySelector('.modal__moviePoster');
const modalTitle = document.querySelector('.modal__title');
const modalAbout = document.querySelector('.modal__about');
const modalGenre = document.querySelector('.modal__genre');
const modalVotes = document.querySelector('.modal__votes');
const modalPopularity = document.querySelector('.modal__popularity');
const modalOrgTitle = document.querySelector('.modal__originalTitle');

let movieId;

function detailsHandler(clickedMovie) {
  //console.log(clickedMovie.target);

  if (clickedMovie.target.matches('img')) {
    movieId = clickedMovie.target.parentNode.id;
    //console.log(movieId);
    fetchId(movieId).then(movieData => {
      modalImg.setAttribute('src', `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`);
      modalTitle.textContent = movieData.title;
      modalVotes.textContent = `${movieData.vote_average}/ ${movieData.vote_count}`;
      modalPopularity.textContent = movieData.popularity;
      modalOrgTitle.textContent = movieData.original_title;
      modalAbout.textContent = movieData.overview;
      modalGenre.textContent = movieData.genres[0].name;
      //console.log(movieData);
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
function EscapeCloseModal(e) {
  if (e.keyCode === 27 && !modalBackdrop.classList.contains('is-hidden')) toggleModal();
}
function clickOffModal(e) {
  if (e.target === modalBackdrop) toggleModal();
}

function saveToWatched() {
  let tempArray = [];
  if (localStorage.getItem('watched-films')) {
    tempArray = JSON.parse(localStorage.getItem('watched-films'));
  }
  fetchId(movieId).then(data => {
    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].id === data.id) {
        alert('Movie is already in library');
        return;
      }
    }
    tempArray.push(data);
    localStorage.setItem('watched-films', JSON.stringify(tempArray));
  });
}

function saveToQueue() {
  let tempArray = [];
  if (localStorage.getItem('queued-films')) {
    tempArray = JSON.parse(localStorage.getItem('queued-films'));
  }
  fetchId(movieId).then(data => {
    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].id === data.id) {
        alert('Movie is already in library');
        return;
      }
    }
    tempArray.push(data);
    localStorage.setItem('queued-films', JSON.stringify(tempArray));
  });
}

gallery.addEventListener('click', detailsHandler);
btnClose.addEventListener('click', toggleModal);
btnWatched.addEventListener('click', saveToWatched);
btnQueued.addEventListener('click', saveToQueue);
document.addEventListener('keydown', EscapeCloseModal);
modalBackdrop.addEventListener('click', clickOffModal);
