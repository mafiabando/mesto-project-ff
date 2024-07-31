import { openModal } from '../Modals/modal.js'

export const createCard = (link, name) => {
    const card = template.querySelector('.card').cloneNode(true); // клонировали содержимое template
    const cardImage = card.querySelector('.card__image');
    card.querySelector('.card__title').textContent = name;   
    const popupCaption = document.querySelector('.popup__caption');
    const cardLikeButton = card.querySelector('.card__like-button');
    const popupImage = document.querySelector('.popup__image');
    const cardDeleteButton = card.querySelector('.card__delete-button') // нашли кнопку удалить
    cardImage.src = link;
    cardImage.alt = name;
    cardImage.addEventListener('click', function(evt) { 
        openModal(popupCardImage);
        popupImage.src = link;
        popupImage.alt = name;
        popupCaption.textContent = name;
    }) 
    cardDeleteButton.addEventListener('click', deleteCard);
    cardLikeButton.addEventListener('click', likeCard)
    return card;
    }

export const template = document.querySelector('#card-template').content;

export const popupCardImage = document.querySelector('.popup_type_image');
    
export function deleteCard(evt) {
        evt.target.closest('.card').remove()
    }

export function likeCard(evt) {
        evt.target.classList.toggle('card__like-button_is-active')
    }