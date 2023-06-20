const gallery = document.querySelector('.gallery');
const paginations = document.querySelector('.pagination');
const hidenPagination = document.querySelector('.hidenPagination');
const notitle = document.querySelector('.notitle');
function hideNoTitleMessage() {
  notitle.style.display = 'none';
}

const genreMap = {
    28: "Akcja",
    12: "Przygodowy",
    16: "Animowany",
    35: "Komedia",
    80: "Kryminał",
    99: "Dokumentalny",
    18: "Dramat",
    10751: "Rodzinny",
    14: "Fantasy",
    36: "Historyczny",
    27: "Horror",
    10402: "Muzyka",
    9648: "Mystery",
    10749: "Romans",
    878: "Science Fiction",
    10770: "Film TV",
    53: "Thriller",
    10752: "Wojenny",
    37: "Western"
  };
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
  <a class="gallery__link center">
  <div class="gallery__item" id="${id}">
    <img class="gallery__item-img" src="${posterUrl}" loading="lazy" />
    <h4 class="gallery__item-header">${title}</h4>
    <span class="gallery__item-info">${genresFormatted}</span>
    <span class="gallery__item-info">${productionYear}</span>
  </div>
</a>
  `;
}).join("")

  gallery.insertAdjacentHTML('beforeend', markup);
}

async function randomFilm() {

  try {
    hideNoTitleMessage();
    hidenPagination.classList.add('ukryj')
    const apiKey = 'e7c806d7ce9bbdf1ef93bebcabbfe0f1';
    const endpoint = 'https://api.themoviedb.org/3/discover/movie';

    const params = new URLSearchParams({
      api_key: apiKey,
      language: 'pl',
      sort_by: 'popularity.desc',
      include_adult: 'false',
      include_video: 'false',
      page: 1,
      'primary_release_date.lte': '2023-06-19',
    });

    const url = `${endpoint}?${params}`;

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      const results = data.results;

      if (results.length > 0) {
        const randomIndex = Math.floor(Math.random() * results.length);
        const selectedMovie = results[randomIndex];
        const films = [selectedMovie]; 
        renderGallery(films);
      } else {
        console.log('Brak dostępnych filmów.');
      }
    } else {
      console.log('Wystąpił problem podczas pobierania danych z API.');
    }
  } catch (error) {
    console.log('Wystąpił błąd:', error.message);
  }
}
const losuj = document.querySelector('.losuj')
const losuj2 = document.querySelector('.losuj2')

losuj.addEventListener('click',randomFilm);
losuj2.addEventListener('click',randomFilm);

