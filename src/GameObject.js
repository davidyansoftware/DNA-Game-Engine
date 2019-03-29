import { Composite } from "./Composite";
import { Transform } from "./Transform";

class GameObject extends Composite {
  constructor(parent, transform = {}, components = []) {
    super();

    // flags
    //TODO use underscore?
    this.active = true;
    this.dead = false;
    //this.dirty = false;

    this._transform = new Transform(transform);
    this._transform._gameObject = this;

    this.components = [];
    for (let i = 0; i < components.length; i++) {
      this.addComponent(components[i]);
    }

    this.setParent(parent);
  }

  get gameObject() {
    return this;
  }
  get transform() {
    return this._transform;
  }

  // mark for destroy, to be called at end of update
  destroy() {
    this.dead = true;
  }

  destroyNow() {
    this.components.forEach(function(component) {
      component.onDestroy();
    });
    this.parent.removeGameObject(this);
  }

  addComponent(component) {
    component._gameObject = this;
    this.components.push(component);
  }

  removeComponent(component) {
    //TODO use dead flag???
    let index = this.components.indexOf(component);
    this.components.splice(index, 1);
  }

  render(ctx) {
    if (!this.active) return;
    this.components.forEach(function(component) {
      component.render(ctx);
    });
  }
  update(deltaTime) {
    if (!this.active) return;
    this.transform.update(deltaTime);
    this.components.forEach(function(component) {
      component.update(deltaTime);
    });
  }

  setActive(active) {
    this.active = active;
    //if (active) {
    //  this.render();
    //}
  }

  setParent(parent, maintainAbsolutePosition) {
    let prevCenter;
    if (this.parent) {
      if (maintainAbsolutePosition) {
        prevCenter = this.transform.getAbsoluteCenter();
      }

      this.parent.removeGameObject(this);
    }
    this.parent = parent;
    parent.addGameObject(this);

    //TODO should also make these changes to rotation, scale etc
    if (maintainAbsolutePosition) {
      this.transform.setAbsoluteCenter(prevCenter);
    }
  }

  getScene() {
    return this.parent.getScene();
  }

  getCanvas() {
    return this.parent.getCanvas();
  }

  getContext() {
    return this.parent.getContext();
  }
}

export { GameObject };
