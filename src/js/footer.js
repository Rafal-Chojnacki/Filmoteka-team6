const modal = document.querySelector('.modal-footer');
const closeButton = document.querySelector('.close-footer');

const openModalElement = document.querySelector('.open-modal');
const closeModalElement = document.querySelector('.close-modal');

// Obsługa otwierania modala
openModalElement.addEventListener('click', () => {
  modal.style.display = 'block';
});

// Obsługa zamykania modala
closeModalElement.addEventListener('click', () => {
  modal.style.display = 'none';
});
