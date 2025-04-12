const CardTemplate = document.querySelector('#card-template').content;
const CardsContainer = document.querySelector('.places__list');

const deleteCard = cardElement => cardElement.remove();

const createCard = ({ name, link }, deleteHandler) => {
  const cardElement = CardTemplate.querySelector('.card').cloneNode(true);
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
  CardsContainer.append(...cards.map(card => createCard(card, deleteCard)));
};

document.addEventListener('DOMContentLoaded', () => renderCards(initialCards));
