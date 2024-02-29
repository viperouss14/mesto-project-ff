const fetchConfig = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-7',
  headers: {
    authorization: '61fe5dc4-81a4-42d7-b6c1-02a3a0f89cbb',
    'Content-Type': 'application/json'
  }
}

const getResponseData = (res) => {
  if(res.ok) {
    return res.json();
  }
    return Promise.reject(`Упс: ${res.status}`);
  }

export const getProfileData = () => {
  return fetch(`${fetchConfig.baseUrl}/users/me`, {
    headers: fetchConfig.headers,
  })
  .then(res => getResponseData(res))
}

export const getCards = () => {
  return fetch(`${fetchConfig.baseUrl}/cards`, {
    headers: fetchConfig.headers,
  })
  .then(res => getResponseData(res))
}

export const updateProfile = (name, description) => {
  return fetch(`${fetchConfig.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: fetchConfig.headers,
    body: JSON.stringify({
      name: name,
      about: description
    })
  })
  .then(res => getResponseData(res))
}

export const addNewCard = (cardData) => {
  return fetch(`${fetchConfig.baseUrl}/cards`, {
    method: 'POST',
    headers: fetchConfig.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link
    })
  })
  .then(res => getResponseData(res))
}

export const deleteCardByApi = (id) => {
  return fetch(`${fetchConfig.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: fetchConfig.headers,
  })
  .then(res => getResponseData(res))
}

export const addCardLike = (id) => {
  return fetch(`${fetchConfig.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: fetchConfig.headers,
  })
  .then(res => getResponseData(res))
}

export const removeCardLike = (id) => {
  return fetch(`${fetchConfig.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: fetchConfig.headers,
  })
  .then(res => getResponseData(res))
}

export const updateAvatar = (avatar) => {
  return fetch(`${fetchConfig.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: fetchConfig.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  })
  .then(res => getResponseData(res))
}

export const checkImageUrl = (url) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    const corsProxyUrl = 'https://corsproxy.io/?';

    request.open('HEAD', corsProxyUrl + url, true);
    request.onload = () => {
      if(request.status === 200 && request.getResponseHeader('Content-Type').startsWith('image/')) {
        resolve(true);
      } else {
        reject(false);
      }
    }
    request.onerror = reject;
    request.send();
  })
}
