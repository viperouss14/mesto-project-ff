export const openModal = popup => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handlerEscKey);
  popup.addEventListener('click', closePopupOverlay);
}

export const closeModal = popup => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handlerEscKey);
  popup.removeEventListener('click', closePopupOverlay);
}

const closePopupOverlay = evt => {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target.closest('.popup'));
  }
}

const handlerEscKey = evt => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}
