const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.close');

// Obsługa otwierania modala
const openModal = function () {
  modal.style.display = 'block';
};

// Obsługa zamykania modala
const closeModal = function () {
  modal.style.display = 'none';
};
