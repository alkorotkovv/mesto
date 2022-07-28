import {nameProfile, jobProfile} from './index.js';

export class UserInfo {
  constructor(nameSelector, jobSelector)
  {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
  };

  //Метод возвращающий объект имя,работа
  getUserInfo() {
    return {
      name: document.querySelector(this._nameSelector).textContent,
      job: document.querySelector(this._jobSelector).textContent
    };
  };

  setUserInfo(name, job) {
    nameProfile.textContent = name;
    jobProfile.textContent = job;
  };

}

const user = new UserInfo('.profile__title','.profile__subtitle');
console.log(user.getUserInfo())
