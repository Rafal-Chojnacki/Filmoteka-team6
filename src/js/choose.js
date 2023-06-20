import { showLoader } from './header';
import { hideLoader } from './header';
import { hideNoTitleMessage } from './header';

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

const gallery = document.querySelector('.gallery');

const genreSelect = document.querySelector('.genre');

const API_KEY = '6fc014c055bacb8460b83603c43b9093';

let genre = '';

genreSelect.addEventListener('change', handleGenreChange);

async function handleGenreChange(event, page) {
  gallery.innerHTML = '';
  hideNoTitleMessage();
  genre = event.target.value;
  return fetchMoviesByGenre(genre, page);
  // console.log(selectedGenre);
}

async function fetchMoviesByGenre(choosedGenre, page) {
  function getGenreId(genre) {
    const genreMap = {
      Action: 28,
      Adventure: 12,
      Animation: 16,
      Comedy: 35,
      Crime: 80,
      Documentary: 99,
      Drama: 18,
      Family: 10751,
      Fantasy: 14,
      History: 36,
      Horror: 27,
      Music: 10402,
      Mystery: 9648,
      Romance: 10749,
      'Science Fiction': 878,
      'TV Movie': 10770,
      Thriller: 53,
      War: 10752,
      Western: 37,
    };
    return genreMap[genre];
  }
  try {
    showLoader();
    const genreId = getGenreId(choosedGenre);
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`,
    );
    const data = await response.json();
    const genres = await fetchGenre();
    const slajs = data.results.slice(0, 20);
    moviesGallery(slajs, genres);
    hideLoader();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function getGenreId(genre) {
  const genreMap = {
    Action: 28,
    Adventure: 12,
    Animation: 16,
    Comedy: 35,
    Crime: 80,
    Documentary: 99,
    Drama: 18,
    Family: 10751,
    Fantasy: 14,
    History: 36,
    Horror: 27,
    Music: 10402,
    Mystery: 9648,
    Romance: 10749,
    'Science Fiction': 878,
    'TV Movie': 10770,
    Thriller: 53,
    War: 10752,
    Western: 37,
  };
  return genreMap[genre];
}

let currentPage = 1;
const moviesPerPage = 20;

function moviesGallery(movies, genres) {
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

export { fetchMoviesByGenre, handleGenreChange };
