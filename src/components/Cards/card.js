import { addLike, removeLike, deleteCardApi } from "../../scripts/api";

function createCard(
  link,
  name,
  userData,
  userId,
  cardId,
  likesData,
  likeCounter,
  deleteCard,
  likeCard,
  openImagePopup
) {
  const template = document.querySelector("#card-template").content;
  const card = template.querySelector(".card").cloneNode(true); // клонировали содержимое template
  const cardImage = card.querySelector(".card__image");
  card.querySelector(".card__title").textContent = name;
  const cardLikeButton = card.querySelector(".card__like-button");
  const cardDeleteButton = card.querySelector(".card__delete-button"); // нашли кнопку удалить
  const likeCount = card.querySelector(".like__counter"); // нашли счетчик лайков
  cardImage.src = link;
  cardImage.alt = name;
  likeCount.textContent = likeCounter;
  if (userData._id === userId) {
    cardDeleteButton.addEventListener("click", () => {
      deleteCard(card, cardId);
    });
  }
  cardImage.addEventListener("click", () => openImagePopup(name, link));

  if (likesData) {
    likesData.forEach((user) => {
      if (user._id === userData._id) {
        cardLikeButton.classList.toggle("card__like-button_is-active");
      }
    });
  }
  cardLikeButton.addEventListener("click", () =>
    likeCard(cardLikeButton, cardId, likeCount)
  );
  return card;
}

function deleteCard(card, cardId) {
  deleteCardApi(cardId)
    .then(() => {
      card.remove();
    })
    .catch((error) => console.log(error));
}

function likeCard(card, cardId, likeCount) {
  if (card.classList.contains("card__like-button_is-active")) {
    removeLike(cardId)
      .then((res) => {
        likeCount.textContent = res.likes.length;
        card.classList.remove("card__like-button_is-active");
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    addLike(cardId)
      .then((res) => {
        likeCount.textContent = res.likes.length;
        card.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

export { createCard, deleteCard, likeCard };
