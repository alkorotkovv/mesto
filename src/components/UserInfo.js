//Класс для работы с данными пользователя
export class UserInfo {
  constructor(nameSelector, jobSelector, avatarSelector)
  {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  };

  //Метод возвращающий объект пользователя
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      avatar: this._avatarElement.src,
      _id: this._id
    };
  };

  //Метод добавляющий в разметку информацию пользователя
  setUserInfo(infoObject) {
    this._nameElement.textContent = infoObject.name;
    this._jobElement.textContent = infoObject.about;
    this._id = infoObject._id;
  };

  //Метод добавляющий в разметку аватар пользователя (разбил установку аватара и информации на 2 разных метода,
  //чтобы при изменении только одних из данных, повторно не записывались вторые, тк попапы редактирования текстовой информации и аватара разные)
  setUserAvatar(infoObject) {
    this._avatarElement.src = infoObject.avatar;
  };
}
