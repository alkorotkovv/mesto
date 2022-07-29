import {nameProfile, jobProfile} from './index.js';

//Класс для работы с данными пользователя
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

  //Метод заполняющий поля формы данными пользователя
  setUserInfo(name, job) {
    nameProfile.textContent = name;
    jobProfile.textContent = job;
  };

}
