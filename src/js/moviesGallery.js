'use strict';
const API_KEY = 'e7c806d7ce9bbdf1ef93bebcabbfe0f1';
const gallery = document.querySelector('.gallery');
function moviesGallery(movies, genres) {
  gallery.innerHTML = '';
  const markup = movies
    .sort((firstMovie, secondMovie) => secondMovie.popularity - firstMovie.popularity)
    .map(movie => {
      const { poster_path, id, title, release_date, genre_ids } = movie;
      const year = new Date(release_date).getFullYear();
      const movieGenres = genres
        .filter(genre => genre_ids.includes(genre.id))
        .map(genre => genre.name)
        .join(', ');
      return `
 <a class="gallery__link">
 <div class="gallery__item" id="${id}">
 <img class="gallery__item-img" src="https://image.tmdb.org/t/p/w500/${poster_path}"/>
 <h4 class="gallery__item-header">${title}</h4>
 <span class="gallery__item-info">${movieGenres}</span>
 <span class="gallery__item-info">${year}</span>
 </div>
 </a>
 `;
    })
    .join('');
  gallery.insertAdjacentHTML('afterbegin', markup);
}
export async function fetchMovies(pageNum) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${pageNum}`,
    );
    const data = await response.json();
    const genres = await fetchGenre();
    moviesGallery(data.results, genres);
    return data;
  } catch (error) {
    console.log(error);
  }
}
fetchMovies();
async function fetchGenre() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,
    );
    const data = await response.json();
    const genres = data.genres;
    return genres;
  } catch (error) {
    console.log(error);
  }
}

const btnUp = document.querySelector('.btnUp');
btnUp.style.display = 'none';
window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  if (document.documentElement.scrollTop > 200) {
    btnUp.style.display = 'block';
  } else {
    btnUp.style.display = 'none';
  }
  btnUp.addEventListener('click', scrollToTop);
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export {scrollToTop};