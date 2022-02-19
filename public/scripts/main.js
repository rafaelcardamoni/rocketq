import Modal from './modal.js';
const modal = Modal();

// Getting all the elements inside the modal
const modalTitle = document.querySelector('.modal h2');
const modalText = document.querySelector('.modal p');
const modalRedButton = document.querySelector('.buttons > .red');
// Select the markAsRead buttons
const markAsReadButtons = document.querySelectorAll('.actions a.check');
// Add an event listener to each button that has the check class - then call the function handleClick
markAsReadButtons.forEach(button => {
  button.addEventListener('click', event => handleClick(event, true));
});

// Select the delete buttons
const deleteButtons = document.querySelectorAll('.actions a.delete');
// Add an event listener to each button that has the delete class - then call the function handleClick
deleteButtons.forEach(button => {
  button.addEventListener('click', event => handleClick(event, false));
});

// Select the cancel buttons
const cancelButtons = document.querySelector('.button.cancel');
// Add an event listener to each button that has the cancel class - then give modal.close() functionality to it
cancelButtons.addEventListener('click', () => {
  modal.close();
});

const handleClick = (event, check) => {
  event.preventDefault();
  // Getting the div with id 'room-id'
  const slug = check ? 'check' : 'delete';
  const roomId = document.querySelector('#room-id').dataset.id;
  const questionId = event.target.dataset.id;

  const modalForm = document.querySelector('.modal form');
  modalForm.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`);

  if (check === true) {
    modalTitle.innerHTML = 'Mark as read';
    modalText.innerHTML = 'Are you sure you want to mark the message as read?';
    modalRedButton.classList.remove('red');
    modalRedButton.classList.add('blue');
    modalRedButton.innerHTML = 'Confirm';
  } else {
    modalTitle.innerHTML = 'Delete';
    modalText.innerHTML = 'Are you sure you want to delete this question?';
    modalRedButton.classList.remove('blue');
    modalRedButton.classList.add('red');
    modalRedButton.innerHTML = 'Delete';
  }
  modal.open();
};

// copying the roomId text to clipboard
const roomIdButton = document.getElementById('room-id');
const tooltipText = document.getElementById('myTooltip');
const styleElem = document.head.appendChild(document.createElement('style'));
roomIdButton.addEventListener('click', () => {
  /* Copy the text inside the text field */
  navigator.clipboard.writeText(roomIdButton.dataset.id);
  tooltipText.innerHTML = 'Copied';
  tooltipText.style.width = '80%';
  tooltipText.style.left = '8.5rem';
  styleElem.innerHTML = '.tooltip .tooltiptext::after {left: 5.501rem;}';
});

// reset tooltip styling after mouseout event type
roomIdButton.addEventListener('mouseout', () => {
  tooltipText.innerHTML = 'Copy to clipboard';
  tooltipText.style.width = '150%';
  tooltipText.style.left = '4rem';
  styleElem.innerHTML = '.tooltip .tooltiptext::after {left: 10rem;}';
});
