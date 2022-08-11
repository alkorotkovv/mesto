//Класс для работы с данными пользователя
export class UserInfo {
  constructor(nameSelector, jobSelector, avatarSelector)
  {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  };

  //Метод возвращающий объект имя,работа
  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    };
  };

  setUserInfo(infoObject) {
    this._name.textContent = infoObject.name;
    this._job.textContent = infoObject.about;
    this._avatar.src = infoObject.avatar;
  };

}
