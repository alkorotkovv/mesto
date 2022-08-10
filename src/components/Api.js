export class Api {
  constructor(options)
  {
    this._baseUrl = options.baseUrl;
    this._authorization = options.headers.authorization;
  };

  console() {
    console.log(this._authorization);
  };



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
      return {name: result.name, job: result.about};
    })
  };

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






}
