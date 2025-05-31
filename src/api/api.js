const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-39',
  headers: {
    authorization: '88e74641-aed7-43b1-9daa-7ea2f76c6ff5',
    'Content-Type': 'application/json',
  },
};

const handleResponse = res => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error message: ${res.status}`);
};

export const getInitialCards = async () => {
  const res = await fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  });
  return handleResponse(res);
};

export const getUserInfo = async () => {
  const res = await fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  });
  return handleResponse(res);
};

export const changeUserInfo = (newName, newOccupation) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newOccupation,
    }),
  }).then(handleResponse);
};

export const addNewCard = newCardData => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(newCardData),
  }).then(handleResponse);
};

export const removeCard = _id => {
  return fetch(`${config.baseUrl}/cards/${_id}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then(handleResponse);
};

export const addLiketoCard = _id => {
  return fetch(`${config.baseUrl}/cards/likes/${_id} `, {
    method: 'PUT',
    headers: config.headers,
  }).then(handleResponse);
};

export const removeLikefromCard = _id => {
  return fetch(`${config.baseUrl}/cards/likes/${_id} `, {
    method: 'DELETE',
    headers: config.headers,
  }).then(handleResponse);
};

export const updateUserAvatar = avatar => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar: avatar }),
  }).then(handleResponse);
};
