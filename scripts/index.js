const createCard = initialCards => {
  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.places__item').cloneNode(true);
  card.querySelector('.card__image').src = initialCards.link;
  card.querySelector('.card__title').textContent = initialCards.name;
  card
    .querySelector('.card__delete-button')
    .addEventListener('click', () => HandleDeleteButton(card));
  return card;
};

const HandleDeleteButton = initialCards => initialCards.remove();

const CreateCards = initialCards => {
  const cardContainer = document.querySelector('.places__list');
  initialCards.map(item => {
    const cardItem = createCard(item);
    cardContainer.appendChild(cardItem);
  });
};

CreateCards(initialCards);
