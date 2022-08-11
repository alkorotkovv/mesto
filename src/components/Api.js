//Класс для формирования запросов к серверу
export class Api {
  constructor(options)
  {
    this._baseUrl = options.baseUrl;
    this._authorization = options.headers.authorization;
  };

  //Метод получения данных пользователя
  getUserInfo() {
    return fetch(this._baseUrl + 'users/me', {
    method: 'GET',
    headers: {
      authorization: this._authorization
      }
    })
    .then(res => {
      if (res.ok)
        return res.json()
      }
    )
    .then(result => {
      //console.log(result);
      return result;
    })
  };

  //Метод получения инициализируемых карточек
  getInitialCards() {
    return fetch(this._baseUrl + 'cards', {
      method: 'GET',
      headers: {
        authorization: this._authorization
      }
    })
    .then(res => {
      if (res.ok)
        return res.json()
      }
    )
    .then(result => {
      //console.log(result);
      return result;
    })
  };

  //Метод изменения данных пользователя
  setUserInfo(inputValuesObject) {
    return fetch(this._baseUrl + 'users/me', {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${inputValuesObject.name}`,
        about: `${inputValuesObject.job}`
      })
    })
    .then(res => {
      if (res.ok)
        return res.json()
      }
    )
    .then(result => {
      //console.log(result);
      return result;
    })
  };

  //Метод добавления новой карточки
  addCard(cardData) {
    return fetch(this._baseUrl + 'cards', {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${cardData.place}`,
        link: `${cardData.url}`
      })
    })
    .then(res => {
      if (res.ok)
        return res.json()
      }
    )
    .then(result => {
      //console.log(result);
      return result;
    })
  };

  //Метод удаления карточки
  deleteCard(cardData) {
    return fetch(this._baseUrl + 'cards/' + cardData._id, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
    })
    .then(res => {
      if (res.ok)
        return res.json()
      }
    )
    .then(result => {
      //console.log(result);
      return result;
    })
  };

  //Метод установки/снятия лайка
  toggleLikeCard(cardData) {
    let method = cardData._userLiked ? 'DELETE':'PUT';
    return fetch(this._baseUrl + 'cards/' + cardData._id + '/likes', {
      method: method,
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
    })
    .then(res => {
      if (res.ok)
        return res.json()
      }
    )
    .then(result => {
      //console.log(result);
      return result;
    })
  };

  //Метод установки аватара пользователя
  setUserAvatar(avatar) {
    return fetch(this._baseUrl + 'users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: `${avatar.url}`
      })
    })
    .then(res => {
      if (res.ok)
        return res.json()
      }
    )
    .then(result => {
      //console.log(result);
      return result;
    })
  };

}
