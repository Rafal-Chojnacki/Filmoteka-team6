'use strict';

const myLibraryWatched = document.querySelector('.myLibrary--watched');
const myLibraryQueue = document.querySelector('.myLibrary--queue');
const watchedButton = document.querySelector('.watched');
const queueButton = document.querySelector('.queue');
const myLibraryTab = document.querySelector('.header_library');
let fetchedMovies;

function myLibraryWatchedGallery() {
  myLibraryWatched.innerHTML = '';
  myLibraryWatched.classList.remove('is-hidden');
  myLibraryQueue.classList.add('is-hidden');
  queueButton.classList.remove('aktiv');
  watchedButton.classList.add('aktiv');
  let fetchedMovies = localStorage.getItem('watched-films');
  let fetchedMoviesArray = JSON.parse(fetchedMovies);
  console.log(fetchedMoviesArray);
  if (fetchedMoviesArray && fetchedMoviesArray.length>0) {
    const fetchedWatchedMoviesGalery = fetchedMoviesArray
      .map(
        gallery =>
          `<a class="gallery__link">
        <div class="gallery__item" id="${gallery.id}">
          <img class="gallery__item-img" src="https://image.tmdb.org/t/p/w500/${
            gallery.poster_path
          }" />
          <h4 class="gallery__item-header">${gallery.title}</h4>
          <span class="gallery__item-info">${gallery.genres
            .map(gen => `${gen.name}`)
            .join(', ')}</span>
          <span class="gallery__item-info">${gallery.release_date.substring(0, 4)}</span>
        </div>
      </a>`,
      )
      .join('');
    myLibraryWatched.insertAdjacentHTML('afterbegin', fetchedWatchedMoviesGalery);
  } 
  else {
    myLibraryWatched.insertAdjacentHTML(
      'afterbegin',
      'There are no movies in your watched gallery',
    );
  }
}

watchedButton.addEventListener('click', myLibraryWatchedGallery);
myLibraryTab.addEventListener('click', myLibraryWatchedGallery);

function myLibraryQueueGallery() {
  myLibraryQueue.innerHTML = '';
  myLibraryWatched.classList.add('is-hidden');
  myLibraryQueue.classList.remove('is-hidden');
  watchedButton.classList.remove('aktiv');
  queueButton.classList.add('aktiv');
  let fetchedMovies = localStorage.getItem('queued-films');
  let fetchedMoviesArray = JSON.parse(fetchedMovies);
  console.log(fetchedMoviesArray);
  if (fetchedMoviesArray && fetchedMoviesArray.length>0) {
    
    const fetchedQueuedMoviesGalery = fetchedMoviesArray
      .map(
        gallery =>
          `<a class="gallery__link">
    <div class="gallery__item" id="${gallery.id}">
      <img class="gallery__item-img" src="https://image.tmdb.org/t/p/w500/${gallery.poster_path}" />
      <h4 class="gallery__item-header">${gallery.title}</h4>
      <span class="gallery__item-info">${gallery.genres.map(gen => `${gen.name}`).join(', ')}</span>
      <span class="gallery__item-info">${gallery.release_date.substring(0, 4)}</span>
    </div>
  </a>`,
      )
      .join('');
    myLibraryQueue.insertAdjacentHTML('afterbegin', fetchedQueuedMoviesGalery);
  } else {
    myLibraryQueue.insertAdjacentHTML('afterbegin', 'There are no queued movies in your gallery');
  }
}

queueButton.addEventListener('click', myLibraryQueueGallery);
window.addEventListener('load', myLibraryWatchedGallery);
