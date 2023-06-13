const API_KEY = 'e7c806d7ce9bbdf1ef93bebcabbfe0f1';

function detailsHandler(clickedMovie) {
  console.log(clickedMovie.target);
  const movieId = clickedMovie.target.parentNode.id;
  console.log(movieId);
  fetchId(movieId).then(movieData => {
    console.log(movieData);
    console.log(movieData.popularity);
  });
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

gallery.addEventListener('click', detailsHandler);
