export class Api {
  constructor(options)
  {
    this._baseUrl = options.baseUrl;
    this._authorization = options.headers.authorization;
  };

  console() {
    console.log(this._authorization);
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
    //console.log("fff");
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
        name: `${cardData.name}`,
        link: `${cardData.link}`
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
  deleteCard(cardID) {
    return fetch(this._baseUrl + 'cards/' + cardID, {
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
  }

  //Метод установки/снятия лайка
  toggleLikeCard(cardID, isLiked) {
    let method = isLiked ? 'DELETE':'PUT';
    return fetch(this._baseUrl + 'cards/' + cardID + '/likes', {
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
  }


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
  }

}
