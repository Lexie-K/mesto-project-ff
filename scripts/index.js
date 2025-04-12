const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

const deleteCard = cardElement => cardElement.remove();

const createCard = ({ name, link }, deleteHandler) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const [cardImage, cardTitle, deleteButton] = [
    '.card__image',
    '.card__title',
    '.card__delete-button',
  ].map(selector => cardElement.querySelector(selector));

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  deleteButton.addEventListener('click', () => deleteHandler(cardElement));

  return cardElement;
};

const renderCards = cards => {
  cardsContainer.append(...cards.map(card => createCard(card, deleteCard)));
};

document.addEventListener('DOMContentLoaded', () => renderCards(initialCards));
