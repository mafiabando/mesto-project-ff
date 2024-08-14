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
  return request(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  });
}; // получение данных пользователя

const getCardsRequest = () => {
  return request(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  });
}; // получение карточек

const postCard = (name, link) => {
  return request(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    })
  });
}; // добавление новой карточки

const patchProfile = (name, about) => {
  return request(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    })
  })
}; // редактирование профиля

const patchProfileImg = (link) => {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    })
  })
}; // редактирование аватарки профиля

const deleteCardApi = (id) => {
  return request(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  });
}; // удаление карточки

const addLike = (id) => {
  return request(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  });
};

const removeLike = (id) => {
  return request(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  });
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

function request(url, options) {
  return fetch(url, options).then(handleData)
}