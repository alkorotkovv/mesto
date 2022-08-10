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
      //UserObject = {name: result.name, job: result.about};
      //console.log(UserObject);
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
        console.log(result);
        return result;
        //UserObject = {name: result.name, job: result.about};
        //console.log(UserObject);
        //return {name: result.name, job: result.about};
      })

  };












}
