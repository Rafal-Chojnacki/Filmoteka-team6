'use strict';
import { scrollToTop } from './moviesGallery.js';
import { fetchMovies } from './moviesGallery.js';
import { fetchMoviesByGenre } from './choose.js';
import { searchMovies } from './header.js';
const searchInput = document.querySelector('.input');
let query = searchInput.value;
const gallery = document.querySelector('.gallery')
// const API_KEY = 'e7c806d7ce9bbdf1ef93bebcabbfe0f1';
const genreSelect = document.querySelector('.genre')
// Selecting DOM elements
const prevBtn = document.getElementById('prevBtn'),
  nextBtn = document.getElementById('nextBtn'),
  // prevNext = document.querySelectorAll('.prevNext'),
  numbers = document.querySelectorAll('.link');
// Setting an initial step
let currentStep = 1;
// Function to update the button states

const dots = document.querySelectorAll('.dots');


genreSelect.addEventListener('change', () => {
  numbers.forEach(number => {
    number.classList.remove('active');
  });
  numbers[0].classList.add('active');

  gallery.innerHTML = '';
  fetchMoviesByGenre(1);

  searchInput.value = '';

  query = '';

  currentStep = 1;

  updateBtnBehaviour();

  disappearingBtns();
});



const updateBtnBehaviour = () => {
  // If we are at the last step
  if (currentStep == 20) {
    nextBtn.disabled = true;
    prevBtn.disabled = false;
  } else if (currentStep == 1) {
    nextBtn.disabled = false;
    prevBtn.disabled = true;
    // prevNext[0].disabled = true;
  } else {
    prevBtn.disabled = false;
    // prevNext[1].disabled = false;
    nextBtn.disabled = false;
    // prevNext[0].disabled = false;
  }
};

// Add event listeners to the number links

numbers.forEach((number, numIndex) => {
  number.addEventListener('click', e => {
    e.preventDefault();
    // Set the current step to the clicked number link

    currentStep = numIndex + 1;
    // console.log(currentStep);
    // Remove the "active" class from the previously active number link
    document.querySelector('.active').classList.remove('active');
    // Add the "active" class to the clicked number link
    number.classList.add('active');
    if (genreSelect.value !== 'Choose genre') {
      gallery.innerHTML='';
      fetchMoviesByGenre(currentStep);
    } 
    else if (searchInput.value.length !== 0 ){
      gallery.innerHTML='';

      searchMovies(query , currentStep)
        } else {
      gallery.innerHTML='';
      fetchMovies(currentStep);
    }
    scrollToTop();
    updateBtnBehaviour(); // Update the button states
    disappearingBtns();
  });
});

prevBtn.addEventListener('click', () => {
  let index = currentStep - 1;
  numbers[index].classList.remove('active');
  numbers[--index].classList.add('active');
  currentStep = currentStep - 1;
  // console.log(currentStep);
  if (genreSelect.value !== 'Choose genre') {
    gallery.innerHTML='';
    fetchMoviesByGenre(currentStep);
  } 
  else if (searchInput.value.length !== 0 ){
    gallery.innerHTML='';
    searchMovies(query , currentStep)
      } else {
    gallery.innerHTML='';
    fetchMovies(currentStep);
  }
  scrollToTop();
  updateBtnBehaviour();
  disappearingBtns();
});

nextBtn.addEventListener('click', () => {
  let index = currentStep - 1;
  numbers[index].classList.remove('active');
  numbers[++index].classList.add('active');
  currentStep = currentStep + 1;
  // console.log(currentStep);
  if (genreSelect.value !== 'Choose genre') {
    gallery.innerHTML='';
    fetchMoviesByGenre(currentStep);
  } 
  else if (searchInput.value.length !== 0 ){
    gallery.innerHTML='';
    searchMovies(query , currentStep)
      } else {
    gallery.innerHTML='';
    fetchMovies(currentStep);
  }
  scrollToTop();
  disappearingBtns();
  updateBtnBehaviour();
});

function disappearingBtns() {
  let condition;
  let rest;

  numbers.forEach(element => {
    element.classList.remove('invisible');
  });

  if (currentStep >= numbers.length / 2) {
    condition = numbers.length - (currentStep + 3);
    rest = currentStep - 3 - 1;

    if (condition >= 0) {
      for (let i = 0; i < condition; i++) {
        numbers[currentStep + 2 + i].classList.add('invisible');
      }
    }

    if (rest >= 0) {
      for (let i = 0; i < rest; i++) {
        numbers[currentStep - 4 - i].classList.add('invisible');
      }
    }
  } else {
    condition = currentStep - 3 - 1;
    rest = numbers.length - (currentStep + 3);

    if (condition >= 0) {
      for (let i = 0; i < condition; i++) {
        numbers[currentStep - 4 - i].classList.add('invisible');
      }
    }

    if (rest >= 0) {
      for (let i = 0; i < rest; i++) {
        numbers[currentStep + 2 + i].classList.add('invisible');
      }
    }
  }
}
disappearingBtns();
// 1 ... 34567 ... 9 (5)
// 12345 ... 9 (1,2,3,4)
// 1 ... 56789 (6,7,8,9)
