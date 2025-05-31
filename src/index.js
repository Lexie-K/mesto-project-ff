import './pages/index.css';
import { createCard, deleteCard, toggleLikeButton } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import {
  getInitialCards,
  getUserInfo,
  changeUserInfo,
  addNewCard,
  updateUserAvatar,
} from './api/api.js';

const popups = document.querySelectorAll('.popup');
const cardsContainer = document.querySelector('.places__list');
const editProfileButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__input_type_name');
const descriptionInput = document.querySelector(
  '.popup__input_type_description'
);
const profileForm = document.querySelector('.popup__form[name="edit-profile"]');
const cardForm = document.querySelector('.popup__form[name="new-place"]');
const avatarForm = document.querySelector('.popup__form[name="new-avatar"]');
const addCard = document.querySelector('.profile__add-button');
const newCard = document.querySelector('.popup_type_new-card');
const newAvatar = document.querySelector('.popup_type_edit-avatar');
const avatarUrlInput = document.querySelector('.popup__input_type_avatar_url');
const profileCard = document.querySelector('.popup_type_edit');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');
const cardImage = document.querySelector('.popup_type_image');
const zoomImg = document.querySelector('.popup__image');
const zoomImgDescription = document.querySelector('.popup__caption');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const avatarEditIconButton = document.querySelector(
  '.profile__image-edit-icon'
);

let currentUserId = null;

const fillUserInfo = ({ avatar, name, about, _id }) => {
  profileTitle.textContent = name;
  profileDescription.textContent = about;
  profileAvatar.style.backgroundImage = `url(${avatar})`;
  currentUserId = _id;
};

const renderCards = cards => {
  cardsContainer.append(
    ...cards.map(card =>
      createCard(card, deleteCard, toggleLikeButton, zoomPic, currentUserId)
    )
  );
};

document.addEventListener('DOMContentLoaded', () => {
  Promise.all([getUserInfo(), getInitialCards()])
    .then(([user, cards]) => {
      fillUserInfo(user);
      renderCards(cards);
    })
    .catch(error => {
      console.error('Error message:', error);
    });
});

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
  clearValidation(profileForm, validationConfig);
  openModal(profileCard);
});

avatarEditIconButton.addEventListener('click', () => {
  clearValidation(avatarForm, validationConfig);
  openModal(newAvatar);
});

popups.forEach(popup => {
  popup.addEventListener('mousedown', e => {
    if (
      e.target.classList.contains('popup_is-opened') ||
      e.target.classList.contains('popup__close') ||
      (e.target === popup && !e.target.closest('.popup_is-opened'))
    ) {
      closeModal(popup);
    }
  });
});

const handleProfileFormSubmit = e => {
  e.preventDefault();
  const submitButton = e.target.querySelector('.popup__button');

  const newName = nameInput.value;
  const newOccupation = descriptionInput.value;

  renderLoading(true, submitButton);

  changeUserInfo(newName, newOccupation)
    .then(data => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;

      e.target.reset();
      closeModal(profileCard);
    })
    .catch(error => {
      console.error('Error message:', error);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
};

profileForm.addEventListener('submit', handleProfileFormSubmit);

addCard.addEventListener('click', () => {
  clearValidation(cardForm, validationConfig);
  openModal(newCard);
});

const handleFormSubmitCard = e => {
  e.preventDefault();
  const submitButton = e.target.querySelector('.popup__button');
  const newCardData = {
    name: cardNameInput.value,
    link: cardUrlInput.value,
  };

  e.target.reset();
  renderLoading(true, submitButton);
  addNewCard(newCardData)
    .then(serverData => {
      if (!serverData || !serverData._id) {
        throw new Error('Invalid new card!');
      }

      const newCardElement = createCard(
        serverData,
        deleteCard,
        toggleLikeButton,
        zoomPic,
        currentUserId
      );

      cardsContainer.prepend(newCardElement);
      closeModal(newCard);
    })
    .catch(error => {
      console.error('Error message:', error);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
};
cardForm.addEventListener('submit', handleFormSubmitCard);

const handleAvatarFormSubmit = e => {
  e.preventDefault();
  const submitButton = e.target.querySelector('.popup__button');
  renderLoading(true, submitButton);

  const avatar = avatarUrlInput.value;
  updateUserAvatar(avatar)
    .then(updatedUser => {
      fillUserInfo(updatedUser);
      e.target.reset();
      closeModal(newAvatar);
    })
    .catch(error => {
      console.error('Error message:', error);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
};
avatarForm.addEventListener('submit', handleAvatarFormSubmit);

const renderLoading = (isLoading, submitButton) => {
  submitButton.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
};

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

enableValidation(validationConfig);
