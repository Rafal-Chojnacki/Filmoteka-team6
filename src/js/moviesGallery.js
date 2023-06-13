'use strict';
const API_KEY = 'e7c806d7ce9bbdf1ef93bebcabbfe0f1';
const gallery = document.querySelector('.gallery');

function moviesGallery(movies) {
  const markup = movies
    .sort((firstMovie, secondMovie) => secondMovie.popularity - firstMovie.popularity)
    .map(movie => {
      const { poster_path, id, title, release_date, genre_ids } = movie;
      const year = new Date(release_date).getFullYear();

      return `
          <a class="gallery__link>
            <div class="gallery__item" id="${id}">
              <img class="gallery__item-img" src="https://image.tmdb.org/t/p/w500/${poster_path}"/>
              <h4 class="gallery__item-header"><b>${title}</b></h4>
              <span class="gallery__item-info"><b>${genre_ids}</b></span>
              
              <span class="gallery__item-info"><b>${year}</b></span>
              
            </div>
          </a>
        `;
    })
    .join('');

  gallery.insertAdjacentHTML('afterbegin', markup);
}

async function fetchMovies() {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();

    moviesGallery(data.results);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function fetchGenre() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,
    );
    const data = await response.json();
    const genres = data.genres;
    console.log(genres);
    return genres;
  } catch (error) {
    console.log(error);
  }
}

fetchMovies();
fetchGenre();
