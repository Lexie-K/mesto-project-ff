import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import {
  createCard,
  deleteCard,
  toggleLikeButton,
  zoomPic,
} from './components/card.js';
import { openModal, closeModal } from './components/modal.js';

const modal = document.querySelector('.popup');
const modals = document.querySelectorAll('.popup');
const cardsContainer = document.querySelector('.places__list');
const editProfileButton = document.querySelector('.profile__edit-button');
const closeModalButtons = document.querySelectorAll('.popup__close');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector(
  '.popup__input_type_description'
);
const formElement = document.querySelector('.popup__form');
const saveButtons = document.querySelectorAll('.popup__button');
const addCard = document.querySelector('.profile__add-button');
const newCard = document.querySelector('.popup_type_new-card');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');

const renderCards = cards => {
  cardsContainer.append(
    ...cards.map(card =>
      createCard(card, deleteCard, toggleLikeButton, zoomPic)
    )
  );
};

document.addEventListener('DOMContentLoaded', () => renderCards(initialCards));

modals.forEach(modal => {
  modal.classList.add('popup_is-animated');
});

editProfileButton.addEventListener('click', () => {
  const profileName = document.querySelector('.profile__title').textContent;
  const profileOccupation = document.querySelector(
    '.profile__description'
  ).textContent;

  nameInput.value = profileName;
  descriptionInput.value = profileOccupation;
  openModal(modal);
});

saveButtons.forEach(button => {
  button.addEventListener('click', e => {
    let modal = button.closest('.popup_type_edit');
    if (modal) {
      handleFormSubmit(e);
      closeModal(modal);
    } else {
      let modal = button.closest('.popup_type_new-card');
      if (modal) {
        handleFormSubmitCard(e);
        closeModal(modal);
      }
    }
  });
});

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.popup');
    if (modal) {
      closeModal(modal);
    }
  });
});

document.addEventListener('click', e => {
  if (e.target === modal && !e.target.closest('.popup')) {
    closeModal(modal);
  }
});

const handleFormSubmit = e => {
  e.preventDefault();
  const newName = nameInput.value;
  const newOccupation = descriptionInput.value;

  document.querySelector('.profile__title').textContent = newName;
  document.querySelector('.profile__description').textContent = newOccupation;
};

formElement.addEventListener('submit', handleFormSubmit);

addCard.addEventListener('click', () => openModal(newCard));

const handleFormSubmitCard = e => {
  e.preventDefault();

  const newCardData = {
    name: cardNameInput.value,
    link: cardUrlInput.value,
  };

  const newCardElement = createCard(
    newCardData,
    deleteCard,
    toggleLikeButton,
    zoomPic
  );

  cardsContainer.prepend(newCardElement);
  cardNameInput.value = '';
  cardUrlInput.value = '';
};

formElement.addEventListener('submit', handleFormSubmitCard);
