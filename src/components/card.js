const cardTemplate = document.querySelector('#card-template').content;

const deleteCard = cardElement => cardElement.remove();

const toggleLikeButton = likeButton => {
  if (likeButton.classList.contains('card__like-button')) {
    likeButton.classList.toggle('card__like-button_is-active');
  }
};

const createCard = ({ link, name }, deleteHandler, handleLike, handleZoom) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const [cardImage, cardTitle, deleteButton, likeButton] = [
    '.card__image',
    '.card__title',
    '.card__delete-button',
    '.card__like-button',
  ].map(selector => cardElement.querySelector(selector));

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  deleteButton.addEventListener('click', () => deleteHandler(cardElement));
  likeButton.addEventListener('click', e => handleLike(e.target));
  cardImage.addEventListener('click', () => handleZoom(link, name));

  return cardElement;
};

export { createCard, deleteCard, toggleLikeButton };
