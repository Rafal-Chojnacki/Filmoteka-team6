const API_KEY = 'e7c806d7ce9bbdf1ef93bebcabbfe0f1';
const modalBackdrop = document.querySelector('.backdrop');
const btnClose = document.querySelector('.modal__btnClose');
const modalImg = document.querySelector('.modal__moviePoster');
const modalTitle = document.querySelector('.modal__title');
const modalAbout = document.querySelector('.modal__about');
const modalGenre = document.querySelector('.modal__genre');
const modalVote = document.querySelector('.modal__vote');
const modalVotes = document.querySelector('.modal__votes');
const modalPopularity = document.querySelector('.modal__popularity');
const modalOrgTitle = document.querySelector('.modal__originalTitle');
const gallery = document.querySelectorAll('.gallery');
const btnWatched = document.querySelector('.modal__btnWatched');
const btnQueued = document.querySelector('.modal__btnQueue');
let movieId;

function detailsHandler(clickedMovie) {
  //console.log(clickedMovie.target);

  if (clickedMovie.target.matches('img')) {
    movieId = clickedMovie.target.parentNode.id;
    //console.log(movieId);
    console.log(clickedMovie.currentTarget);
    if (clickedMovie.currentTarget.classList.contains('myLibrary--queue')) {
      btnQueued.classList.remove('is-hidden');
      btnWatched.classList.add('is-hidden');
    }
    if (clickedMovie.currentTarget.classList.contains('myLibrary--watched')) {
      btnWatched.classList.remove('is-hidden');
      btnQueued.classList.add('is-hidden');
    }
    fetchId(movieId).then(movieData => {
      modalImg.setAttribute('src', `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`);
      modalTitle.textContent = movieData.title;
      modalVote.textContent = `${movieData.vote_average.toFixed(1)}`;
      modalVotes.textContent = `${movieData.vote_count}`;
      modalPopularity.textContent = movieData.popularity.toFixed(1);
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
function removeFromWatched() {
  let tempArray = [];
  if (localStorage.getItem('watched-films')) {
    tempArray = JSON.parse(localStorage.getItem('watched-films'));
  }
  fetchId(movieId).then(data => {
    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].id === data.id) {
        const itemIndex = tempArray.findIndex(item => item.id === data.id);
        tempArray.splice(itemIndex, 1);
        localStorage.setItem('watched-films', JSON.stringify(tempArray));
        const objectToRemove = document.querySelector(`#${CSS.escape(data.id)}`);
        objectToRemove.parentNode.remove();
        return;
      }
    }
  });
}
function removeFromQueued() {
  let tempArray = [];
  if (localStorage.getItem('queued-films')) {
    tempArray = JSON.parse(localStorage.getItem('queued-films'));
  }
  fetchId(movieId).then(data => {
    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].id === data.id) {
        const itemIndex = tempArray.findIndex(item => item.id === data.id);
        tempArray.splice(itemIndex, 1);
        localStorage.setItem('queued-films', JSON.stringify(tempArray));
        const objectToRemove = document.querySelector(`#${CSS.escape(data.id)}`);
        objectToRemove.parentNode.remove();
        return;
      }
    }
  });
}

gallery.forEach(element => {
  element.addEventListener('click', detailsHandler);
});
btnClose.addEventListener('click', toggleModal);
document.addEventListener('keydown', EscapeCloseModal);
modalBackdrop.addEventListener('click', clickOffModal);
btnWatched.addEventListener('click', removeFromWatched);
btnQueued.addEventListener('click', removeFromQueued);
