import { addLiketoCard, removeCard, removeLikefromCard } from '../api/api';

const cardTemplate = document.querySelector('#card-template').content;

const deleteCard = (cardElement, _id) => {
  removeCard(_id)
    .then(() => cardElement.remove())
    .catch(error => console.error('Error message:', error));
};

const toggleLikeButton = (likeButton, _id, likeScore) => {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  const likeMethod = isLiked ? removeLikefromCard : addLiketoCard;
  likeMethod(_id)
    .then(card => {
      likeButton.classList.toggle('card__like-button_is-active');
      likeScore.textContent = card.likes ? card.likes.length : '0';
    })
    .catch(error => console.error('Error message:', error));
};

const createCard = (
  { link, name, likes, owner, _id },
  deleteHandler,
  handleLike,
  handleZoom,
  currentUserId
) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const [cardImage, cardTitle, deleteButton, likeButton, likeScore] = [
    '.card__image',
    '.card__title',
    '.card__delete-button',
    '.card__like-button',
    '.card__like-score',
  ].map(selector => cardElement.querySelector(selector));

  if (currentUserId === owner._id) {
    deleteButton.addEventListener('click', () =>
      deleteHandler(cardElement, _id)
    );
  } else {
    deleteButton.remove();
  }

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;
  likeScore.textContent = likes && Array.isArray(likes) ? likes.length : '0';

  if (likes && Array.isArray(likes)) {
    const isLiked = likes.some(like => like._id === currentUserId);
    if (isLiked) {
      likeButton.classList.add('card__like-button_is-active');
    }
  }

  likeButton.addEventListener('click', () =>
    handleLike(likeButton, _id, likeScore)
  );
  cardImage.addEventListener('click', () => handleZoom(link, name));

  return cardElement;
};

export { createCard, deleteCard, toggleLikeButton };
