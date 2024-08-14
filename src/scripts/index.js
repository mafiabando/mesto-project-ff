import "../pages/index.css";
import {
  closeEscKey,
  closeOverlay,
  closeButton,
  openModal,
  closeModal,
} from "../components/Modals/modal.js";
import { createCard, deleteCard, likeCard } from "../components/Cards/card.js";
import {
  handleData,
  getUserRequest,
  getCardsRequest,
  patchProfile,
  patchProfileImg,
  postCard,
  deleteCardApi,
} from "./api.js";
import { clearValidation, enableValidation } from "./validation.js";

const gallery = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const profileAddButton = document.querySelector(".profile__add-button");
const formProfile = document.querySelector('.popup__form[name="edit-profile"]');
const formEditProfileImage = document.querySelector(
  '.popup__form[name="edit-profileImage"]'
);
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const titleProfile = document.querySelector(".profile__title");
const description = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
const addCardForm = document.querySelector('.popup__form[name="new-place"]');
const popupAddCard = document.querySelector(".popup_type_new-card");
const cardNameInput = document.querySelector(".popup__input_type_card-name");
const cardLinkInput = document.querySelector(".popup__input_type_url");
const popupEditProfileImage = document.querySelector(".popup_type_avatar");
const popupCardImage = document.querySelector(".popup_type_image");
const popupImageCaption = document.querySelector(".popup__caption");
const popupImage = document.querySelector(".popup__image");
const popups = document.querySelectorAll('.popup')

profileImage.addEventListener("click", (evt) => {
  openModal(popupEditProfileImage);
  clearValidation(formEditProfileImage, validationConfig);
});

formEditProfileImage.addEventListener("submit", (evt) => {
  evt.preventDefault();
  popupEditProfileImage.querySelector(".button").textContent = "Сохранение...";
  patchProfileImg(formEditProfileImage.link.value)
    .then(() => {
      profileImage.style.backgroundImage = `url(${formEditProfileImage.link.value})`;
      closeModal(popupEditProfileImage);
    })
    .finally(() => {
      popupEditProfileImage.querySelector(".button").textContent = "Сохранить";
    });
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  patchProfile(nameInput.value, jobInput.value)
    .then((data) => {
      titleProfile.textContent = data.name;
      description.textContent = data.about;
      closeModal(popupEditProfile);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      popupEditProfile.querySelector(".button").textContent = "Сохранить";
    });
} // редактирование профиля

formProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  popupEditProfile.querySelector(".button").textContent = "Сохранение...";
  handleProfileFormSubmit(evt);
}); // уведомление о загрузке

profileEditButton.addEventListener("click", (evt) => {
  clearValidation(formProfile, validationConfig);
  nameInput.value = titleProfile.textContent;
  jobInput.value = description.textContent;
  openModal(popupEditProfile);
}); // повесили слушатель на кнопку

// Cards

function addCard(card) {
  gallery.prepend(card);
}

profileAddButton.addEventListener("click", function (evt) {
  cardNameInput.value = "";
  cardLinkInput.value = "";
  clearValidation(addCardForm, validationConfig);
  openModal(popupAddCard);
}); // повесили слушатель на кнопку

addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;
  popupAddCard.querySelector(".button").textContent = "Сохранение...";
  postCard(cardName, cardLink)
    .then((card) => {
      const newCard = createCard(
        card.link,
        card.name,
        card.owner,
        card.owner._id,
        card._id,
        card.likes,
        card.likes.length,
        deleteCard,
        likeCard,
        openImagePopup
      );
      addCard(newCard, true);
      addCardForm.reset();
      closeModal(popupAddCard);
    })
    .catch((error) => console.log(error))
    .finally(() => {
      addCardForm.querySelector(".button").textContent = "Сохранить";
    });
});

// Popup

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_is-opened')) {
          closeModal(popup)
      }
      if (evt.target.classList.contains('popup__close')) {
        closeModal(popup)
      }
  })
})

function openImagePopup(name, link) {
  openModal(popupCardImage);
  popupImage.src = link;
  popupImage.alt = name;
  popupImageCaption.textContent = name;
}

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

enableValidation(validationConfig);

Promise.all([getUserRequest(), getCardsRequest()]) // метод для загрузки данных пользователя и карточек
  .then(([userData, cards]) => {
    titleProfile.textContent = userData.name;
    description.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    cards.forEach((card) => {
      const newCard = createCard(
        card.link,
        card.name,
        userData,
        card.owner._id,
        card._id,
        card.likes,
        card.likes.length,
        deleteCard,
        likeCard,
        openImagePopup
      );
      addCard(newCard);
    });
  }) // Обработка данных
  .catch((error) => console.log(error)); // Выводим ошибку в консоль
