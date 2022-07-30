//Класс Секшен
export class Section {
  constructor({items, renderer}, containerSelector)
  {
    this._renderedItems = items;
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
  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  };

}
