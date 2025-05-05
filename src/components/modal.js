const closeEscape = e => {
  const modal = document.querySelector('.popup_is-opened');
  if (e.key === 'Escape') {
    closeModal(modal);
  }
};

export const openModal = popupElement => {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEscape);
};

export const closeModal = popupElement => {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEscape);
};
