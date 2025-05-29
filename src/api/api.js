const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-39',
  headers: {
    authorization: '88e74641-aed7-43b1-9daa-7ea2f76c6ff5',
    'Content-Type': 'application/json',
  },
};

export const getInitialCards = async () => {
  const res = await fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  });
  if (res.ok) {
    return res.json();
  }
  return await Promise.reject(`Error message: ${res.status}`);
};

export const getUserInfo = async () => {
  const res = await fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  });
  if (res.ok) {
    return res.json();
  }
  return await Promise.reject(`Error message: ${res.status}`);
};

export const changeUserInfo = (newName, newOccupation) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newOccupation,
    }),
  });
};

export const addNewCard = newCardData => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(newCardData),
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error message: ${res.status}`);
  });
};

export const removeCard = _id => {
  return fetch(`${config.baseUrl}/cards/${_id}`, {
    method: 'DELETE',
    headers: config.headers,
  });
};

export const addLiketoCard = _id => {
  return fetch(`${config.baseUrl}/cards/likes/${_id} `, {
    method: 'PUT',
    headers: config.headers,
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error message: ${res.status}`);
  });
};

export const removeLikefromCard = _id => {
  return fetch(`${config.baseUrl}/cards/likes/${_id} `, {
    method: 'DELETE',
    headers: config.headers,
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error message: ${res.status}`);
  });
};

export const updateUserAvatar = avatar => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ avatar: avatar }),
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error message: ${res.status}`);
  });
};
