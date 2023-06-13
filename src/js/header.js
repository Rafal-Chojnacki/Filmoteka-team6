const searchForm = document.getElementById('search-form');
const searchInput = document.querySelector('.input');
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');
const notitle = document.querySelector('.notitle');
const API_KEY = 'e7c806d7ce9bbdf1ef93bebcabbfe0f1';
let genreMap = {};


hideLoader();

async function fetchGenres() {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    const genres = data.genres;

    for (const genre of genres) {
      genreMap[genre.id] = genre.name;
    }
  } catch (error) {
    console.log(error.toString());
  }
}

async function searchMovies(query) {
  try {
    showLoader(); 
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`);
    const data = await response.json();
    const movies = data.results;
    hideLoader(); 
    renderGallery(movies);

    if (movies.length === 0) {
      hideLoader();
      showNoTitleMessage();
    } else {
      hideNoTitleMessage();
    }
  } catch (error) {
    console.log(error.toString());
    hideLoader(); 
    showNoTitleMessage();
  }
}



function renderGallery(movies) {
  gallery.innerHTML = '';
const markup = movies.map(movie =>{ 
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
    <p class="gallery__item-info">${genresFormatted}</p>
    <p class="gallery__item-info">${productionYear}</p>
  </div>
</a>
  `;
}).join("")

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
