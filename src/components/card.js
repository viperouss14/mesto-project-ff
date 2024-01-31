
export const createCard = (cardData, cardDeletFn, cardLikeFn, cardClickFn, cardTemplate) => {
  const cardItem = cardTemplate.content.querySelector('.places__item');
  const cardElement = cardItem.cloneNode(true);

  const cardImg = cardElement.querySelector('.card__image');
  const cardDeletBtn = cardElement.querySelector('.card__delete-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeBtn = cardElement.querySelector('.card__like-button');

  cardImg.src = cardData.link;
  cardImg.alt = `Фотография ${cardData.name}`;
  cardTitle.textContent = cardData.name;

  cardDeletBtn.addEventListener('click', () => cardDeletFn(cardElement));

  cardLikeBtn.addEventListener('click', cardLikeFn);

  cardImg.addEventListener('click', () => cardClickFn(cardData.name, cardData.link));

  return cardElement;
}

export const deletCard = card => {
  card.remove();
}

export const likeCard = evt => {
  evt.target.classList.toggle('card__like-button_is-active')
};
