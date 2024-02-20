import { deleteCard, addCardLike, removeCardLike } from './api.js'

export const createCard = (userId, cardData, cardDeletFn, cardLikeFn, cardClickFn, cardTemplate) => {
  const cardItem = cardTemplate.content.querySelector('.places__item');
  const cardElement = cardItem.cloneNode(true);

  const cardImg = cardElement.querySelector('.card__image');
  const cardDeletBtn = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeBtn = cardElement.querySelector('.card__like-button');
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');

  cardImg.src = cardData.link;
  cardImg.alt = `Фотография ${cardData.name}`;
  cardTitle.textContent = cardData.name;
  cardLikeCounter.textContent = cardData.likes.length;

  if(userId !== cardData.owner._id) cardDeletBtn.remove();

  if(cardData.likes.some(elem => elem._id === userId)) cardLikeBtn.classList.add('card__like-button_is-active');

  cardDeletBtn.addEventListener('click', () => cardDeletFn(cardData._id, cardElement));

  cardLikeBtn.addEventListener('click', () => cardLikeFn(cardData._id, cardLikeBtn, cardLikeCounter));

  cardImg.addEventListener('click', () => cardClickFn(cardData.name, cardData.link));

  return cardElement;
}

export const deletCard = (cardId, card) => {
  deleteCard(cardId)
  .then(() => {
    card.remove();
  })
  .catch((err) => console.log(err));
}

export const likeCard = (cardId, likeButton, likeCounter) => {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    removeCardLike(cardId)
      .then((cardData) => {
        likeButton.classList.remove('card__like-button_is-active');
        likeCounter.textContent = cardData.likes.length;
      })
      .catch((err) => console.log(err));
  } else {
    addCardLike(cardId)
      .then((cardData) => {
        likeButton.classList.add('card__like-button_is-active');
        likeCounter.textContent = cardData.likes.length;
      })
      .catch((err) => console.log(err));
  }
};
