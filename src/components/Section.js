//Класс Секшен
export class Section {
  constructor({renderer}, containerSelector)
  {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  };

  //Метод добавления элемента в разметку
  addItem(element) {
    this._container.prepend(element);
  };

  //Метод очистки контейнера
  clear() {
    this._container.innerHTML = '';
  };

  //Метод рендеринга
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  };

}
