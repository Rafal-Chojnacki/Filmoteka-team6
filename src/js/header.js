const searchForm = document.getElementById('search-form');
const searchInput = document.querySelector('.input');
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');
const notitle = document.querySelector('.notitle');


hideLoader();


async function searchMovies(query) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=e7c806d7ce9bbdf1ef93bebcabbfe0f1&language=en-US&query=${query}&page=1&include_adult=false`);
    const data = await response.json();
    const movies = data.results;

    if (movies.length === 0) {
      showNoTitleMessage();
      hideLoader();
      return;
    }

    const moviePromises = movies.map(movie => {
      return Promise.all([
        getGenreNames(movie.genre_ids),
        movie
      ]);
    });

    showLoader();

    const moviesWithGenres = await Promise.all(moviePromises);
    const moviesWithGenresFormatted = moviesWithGenres.map(([genres, movie]) => {
      const { id, poster_path, title, release_date } = movie;
      if (!release_date || !poster_path || genres.length === 0) {
        return '';
      }
      const posterUrl = `https://image.tmdb.org/t/p/w500/${poster_path}`;
      const productionYear = new Date(release_date).getFullYear();
      const genresFormatted = genres.slice(0, 2).join(', ');

      return `
        <a class="gallery__link">
          <div class="gallery-item" id="${id}">
            <img class="gallery-item__img" src="${posterUrl}" loading="lazy" />
            <p class="info-item">${title}</p>
            <p class="info-item">${genresFormatted}</p>
            <p class="info-item">${productionYear}</p>
          </div>
        </a>
      `;
    });

    hideLoader();
    renderGallery(moviesWithGenresFormatted);
    hideNoTitleMessage();
  } catch (error) {
    console.log(error.toString());
    hideLoader();
    showNoTitleMessage();
  }
}

async function getGenreNames(genreIds) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=e7c806d7ce9bbdf1ef93bebcabbfe0f1&language=en-US`);
    const data = await response.json();
    const genres = data.genres;

    const genreNames = genreIds.map(genreId => {
      const genre = genres.find(genre => genre.id === genreId);
      return genre ? genre.name : '';
    });

    return genreNames.filter(name => name !== '');
  } catch (error) {
    console.log(error.toString());
    return [];
  }
}

function renderGallery(movies) {
  gallery.innerHTML = '';

  const markup = movies.join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}

function showLoader() {
  loader.style.display = 'flex';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showNoTitleMessage() {
  notitle.innerText = 'Search result not successful. Enter the correct movie name';
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
