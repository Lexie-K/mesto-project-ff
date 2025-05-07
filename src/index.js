import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, toggleLikeButton } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';


const popups = document.querySelectorAll('.popup');
const cardsContainer = document.querySelector('.places__list');
const editProfileButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector(
  '.popup__input_type_description'
);
const profileForm = document.querySelector('.popup__form[name="edit-profile"]');
const cardForm = document.querySelector('.popup__form[name="new-place"]');
const addCard = document.querySelector('.profile__add-button');
const newCard = document.querySelector('.popup_type_new-card');
const profileCard = document.querySelector('.popup_type_edit');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');
const cardImage = document.querySelector('.popup_type_image');
const zoomImg = document.querySelector('.popup__image');
const zoomImgDescription = document.querySelector('.popup__caption');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const renderCards = cards => {
  cardsContainer.append(
    ...cards.map(card =>
      createCard(card, deleteCard, toggleLikeButton, zoomPic)
    )
  );
};

document.addEventListener('DOMContentLoaded', () => renderCards(initialCards));

const zoomPic = (link, name) => {
  zoomImg.src = link;
  zoomImg.alt = name;
  zoomImgDescription.textContent = name;

  openModal(cardImage);
};

popups.forEach(popup => {
  popup.classList.add('popup_is-animated');
});

editProfileButton.addEventListener('click', () => {
  const profileName = profileTitle.textContent;
  const profileOccupation = profileDescription.textContent;

  nameInput.value = profileName;
  descriptionInput.value = profileOccupation;
  openModal(profileCard);
});

popups.forEach(popup => {
  popup.addEventListener('mousedown', e => {
    if (e.target.classList.contains('popup_is-opened')) {
      closeModal(popup);
    }
    if (e.target.classList.contains('popup__close')) {
      closeModal(popup);
    }
    if (e.target === popup && !e.target.closest('popup_is-opened')) {
      closeModal(popup);
    }
  });
});

const handleProfileFormSubmit = e => {
  e.preventDefault();
  const newName = nameInput.value;
  const newOccupation = descriptionInput.value;

  profileTitle.textContent = newName;
  profileDescription.textContent = newOccupation;
  closeModal(profileCard);
};

profileForm.addEventListener('submit', handleProfileFormSubmit);

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

  e.target.reset();
  cardsContainer.prepend(newCardElement);
  closeModal(newCard);
};

cardForm.addEventListener('submit', handleFormSubmitCard);
