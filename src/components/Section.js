class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(data) {
        this._container.prepend(this._renderer(data));
    };

    renderItems(items) {
        items.reverse().forEach(item => this.addItem(item));
    };
}

export default Section 