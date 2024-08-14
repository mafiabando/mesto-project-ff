const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-20/",
  headers: {
    authorization: "3cd92c4a-9d9a-4493-9368-7e98dd64d0eb",
    "Content-Type": "application/json",
  },
}; // для авторизации

const handleData = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}; // обработка ответа от сервера

const getUserRequest = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then(handleData);
}; // получение данных пользователя

const getCardsRequest = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then(handleData);
}; // получение карточек

const postCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => res.json());
}; // добавление новой карточки

const patchProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(handleData);
}; // редактирование профиля

const patchProfileImg = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    }),
  }).then(handleData);
}; // редактирование аватарки профиля

const deleteCardApi = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleData);
}; // удаление карточки

const addLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  }).then(handleData);
};

const removeLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleData);
};

export {
  handleData,
  getUserRequest,
  getCardsRequest,
  patchProfile,
  patchProfileImg,
  postCard,
  deleteCardApi,
  addLike,
  removeLike,
};
