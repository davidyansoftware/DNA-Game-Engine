class Component {
  constructor() {
    //this._gameObject - set in GameObject.addComponent()
  }

  get gameObject() {
    return this._gameObject;
  }

  get transform() {
    return this._gameObject.transform;
  }

  //TODO find a simple way to pass update/render functions in?
  //TODO handleInput()?
  update(deltaTime) {}
  render(context) {}

  onDestroy() {}
}

export { Component };
