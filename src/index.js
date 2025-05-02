import {initialCards} from './scripts/cards.js';
import './pages/index.css'

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

const deleteCard = cardElement => cardElement.remove();

const createCard = ( initialCards,  deleteHandler) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const [cardImage, cardTitle, deleteButton] = [
    '.card__image',
    '.card__title',
    '.card__delete-button',
  ].map(selector => cardElement.querySelector(selector));

  cardImage.src = initialCards.link;
  cardImage.alt = initialCards.name;
  cardTitle.textContent = initialCards.name;
  deleteButton.addEventListener('click', () => deleteHandler(cardElement));

  return cardElement;
};

const renderCards = cards => {
  cardsContainer.append(...cards.map(card => createCard(card, deleteCard)));
};

document.addEventListener('DOMContentLoaded', () => renderCards(initialCards));
