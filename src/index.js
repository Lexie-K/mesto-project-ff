import './pages/index.css'
import {initialCards} from './scripts/cards.js';
import {createCard, deleteCard, toggleLikeButton} from './components/card.js'

const cardsContainer = document.querySelector('.places__list');

const renderCards = cards => {
  cardsContainer.append(...cards.map(card => createCard(card, deleteCard, toggleLikeButton)));
};

document.addEventListener('DOMContentLoaded', () => renderCards(initialCards));
