'use strict';

import { fetchMovies } from './moviesGallery';
const ulTag = document.querySelector('.pagination ul');
const moviesContainer = document.querySelector('.gallery');
const paginationContainer = document.querySelector('.pagination');
const MOVIES_API_URL = 'https://api.themoviedb.org/3/movie/popular';
const APIKey = 'e7c806d7ce9bbdf1ef93bebcabbfe0f1';
const defaultMoviesURL =
  'https://api.themoviedb.org/3/trending/movie/week?api_key=e7c806d7ce9bbdf1ef93bebcabbfe0f1';
let totalPages;
// async function fetchMovies(page) {
//   try {
//     const response = await fetch(`${MOVIES_API_URL}?api_key=${APIKey}&page=${page}`);
//     const data = await response.json();
//     paginationBtns(data.total_pages, page);
//     return data;
//   } catch (error) {
//     console.log(error.toString());
//   }
// }
// function buildUpGallery() {
//   fetchMovies(1);
//   paginationBtns(data.total_pages, page);
// }
// totalPages = 20;
// paginationBtns(totalPages, 1);
const BuildGallery = async page => {
const data = await fetchMovies(page, paginationContainer);
  // totalPages = data.total_pages;
  totalPages = 500;
  paginationBtns(totalPages, page);
};
BuildGallery(1);
async function searchMovies(page) {
  try {
    const searchText = document.querySelector('input[name="search"]').value;
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&query=${searchText}&page=${page}`,
    );
    return response.json();
  } catch (error) {
    console.error(error.toString());
  }
}
function paginationBtns(total_pages, page) {
  let pageLimit = 500;
  let liTag = '';
  let activeLi;
  let beforePages = page - 1;
  let afterPages = page + 1;
  if (pageLimit)
    if (page > 1) {
      liTag += `<li class="btn prev" onclick="paginationClick(${total_pages}, ${
        page - 1
      })"><span class="arrow prev-arrow">&#129128;</span></li>`;
    }
  if (page > 2) {
    liTag += `<li class="pageNumber" onclick="paginationClick(${total_pages}, 1)"><span>1</span></li>`;
    if (page > 3) {
      liTag += `<li class="dots"><span>&#8226;&#8226;&#8226;</span></li>`;
    }
  }
  if (page === total_pages) {
    beforePages = beforePages - 4;
  } else if (page === total_pages - 1) {
    beforePages = beforePages - 1;
  } else if (page === total_pages - 2) {
    afterPages = afterPages - 1;
  }
  if (page === 1) {
    afterPages = afterPages + 4;
  } else if (page === 2) {
    afterPages = afterPages + 1;
  } else if (page === 3) {
    beforePages = beforePages + 1;
  }
  for (let pageLength = beforePages - 1; pageLength <= afterPages + 1; pageLength++) {
    if (pageLength < 0) {
      continue;

    }
    if (pageLength > total_pages || pageLength > total_pages + 1) {
      continue;
    }
    if (pageLength === 0) {
      pageLength = pageLength + 1;
    }
    if (page === pageLength) {
      activeLi = 'active';
    } else {
      activeLi = '';
    }
    liTag += `<li class="pageNumber ${activeLi}" onclick="paginationClick(${total_pages}, ${pageLength})"><span>${pageLength}</span></li>`;
  }
  if (page < total_pages - 1) {
    if (page < total_pages - 2) {
      liTag += `<li class="dots"><span>&#8226;&#8226;&#8226;</span></li>`;
    }
    liTag += `<li class="pageNumber" onclick="paginationClick(${total_pages}, ${total_pages})"><span>${total_pages}</span></li>`;
  }
  if (page < total_pages) {
    liTag += `<li class="btn next" onclick="paginationClick(${total_pages}, ${
      page + 1
    })"><span class="arrow next-arrow">&#129130;</span></li>`;
  }
  ulTag.innerHTML = liTag;
}
window.paginationClick = function (total_pages, page) {
  paginationBtns(total_pages, page);
  BuildGallery(page);
};
paginationContainer.addEventListener('click', e => {
  if (e.target.localName === 'li' || e.target.localName === 'span') {
    clearPageContent();
    if (searchText === '') {
      const URLBuild = defaultMoviesURL + '&page=' + e.target.textContent;
      getDataFromAPI(URLBuild);
    } else {
      const URLBuild =
        MOVIES_API_URL +
        '?api_key=' +
        APIKey +
        '&query=' +
        searchText +
        '&page=' +
        e.target.textContent;
      console.log(URLBuild);
      getDataFromAPI(URLBuild);
    }
  }
});
const clearPageContent = () => {
  moviesContainer.innerHTML = '';
};
async function getDataFromAPI(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    // Process the received data here
  } catch (error) {
    console.log(error.toString());
  }
}
