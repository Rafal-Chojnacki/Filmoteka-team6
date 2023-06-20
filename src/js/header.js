const searchForm = document.getElementById('search-form');
const searchInput = document.querySelector('.input');
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');
const notitle = document.querySelector('.notitle');
const API_KEY = 'e7c806d7ce9bbdf1ef93bebcabbfe0f1';
let genreMap = {};
const hidenPagination = document.querySelector('.hidenPagination');

hideLoader();

async function fetchGenres() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`,
    );
    const data = await response.json();
    const genres = data.genres;

    for (const genre of genres) {
      genreMap[genre.id] = genre.name;
    }
  } catch (error) {
    console.log(error.toString());
  }
}

async function searchMovies(query, page = 1, perPage = 20) {
  try {
    hidenPagination.classList.remove('ukryj');

    gallery.innerHTML = '';
    showLoader();

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&include_adult=false&page=${page}`,
    );
    const data = await response.json();
    const movies = data.results.slice(0, perPage);

    hideLoader();
    renderGallery(movies);

    if (movies.length === 0) {
      showNoTitleMessage();
      hidenPagination.classList.add('ukryj');

      gallery.innerHTML = '<p class="myfriend"></p>';
    } else {
      hidenPagination.classList.remove('ukryj');

      hideNoTitleMessage();
    }
  } catch (error) {
    console.log(error.toString());
    hideLoader();
    showNoTitleMessage();
  }
}

function dynamicSearch(event) {
  const query = event.target.value;
  if (query.length >= 1) {
    searchMovies(query);
  }
}

searchInput.addEventListener('input', dynamicSearch);

function renderGallery(movies) {
  gallery.innerHTML = '';
  const markup = movies
    .map(movie => {
      const { id, poster_path, title, release_date, genre_ids } = movie;

      if (!release_date || !poster_path || genre_ids.length === 0) {
        return '';
      }

      const posterUrl = `https://image.tmdb.org/t/p/w500/${poster_path}`;
      const productionYear = new Date(release_date).getFullYear();
      const genresFormatted = genre_ids
        .map(genreId => genreMap[genreId])
        .slice(0, 2)
        .join(', ');

      return `
  <a class="gallery__link">
  <div class="gallery__item" id="${id}">
    <img class="gallery__item-img" src="${posterUrl}" loading="lazy" />
    <h4 class="gallery__item-header">${title}</h4>
    <span class="gallery__item-info">${genresFormatted}</span>
    <span class="gallery__item-info">${productionYear}</span>
  </div>
</a>
  `;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}

function showLoader() {
  loader.style.display = 'flex';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showNoTitleMessage() {
  notitle.innerText = 'Search result not successful. Enter the correct movie name.';
  notitle.style.display = 'block';
}

function hideNoTitleMessage() {
  notitle.style.display = 'none';
}

searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const query = searchInput.value;
  searchMovies(query);
  searchInput.value = '';
});

fetchGenres();

export { showNoTitleMessage };
export { showLoader };
export { hideLoader };
export { fetchGenres };
export { renderGallery };
export { hideNoTitleMessage };
export { searchMovies };
