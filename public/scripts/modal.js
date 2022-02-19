export default function Modal() {
  const modalContainer = document.querySelector('.modal-wrapper');

  function open() {
    // functionality to open the modal
    modalContainer.classList.add('active');
  }
  function close() {
    // functionality to close the modal
    modalContainer.classList.remove('active');
  }

  return {
    open,
    close
  };
}
