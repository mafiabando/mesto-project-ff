export function closeModal(popup) {
    popup.classList.remove('popup_is-opened'); // функция закрытия попапа
    document.removeEventListener('keydown', closeEscKey);
}

export function closeEscKey(evt) {
    if (evt.key === 'Escape') { 
        const currentPopup = document.querySelector(".popup_is-opened");
        closeModal(currentPopup); // функция закрытия попапа через esc
    }
}
  
export function closeOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closeModal(evt.target); // функция закрытия попапа кликом по overlay
    }
}

export function closeButton(evt) {
    if (evt.target.classList.contains("popup__close")) {
      closeModal(evt.currentTarget); // функция закрытия попапа кликом по кнопке
    }
}

export function openModal(popup){
    popup.classList.add('popup_is-opened', 'popup_is-animated'); // функция открытия попапа
    document.addEventListener('keydown', closeEscKey);
}