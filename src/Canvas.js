import { Composite } from "./Composite";
import { CanvasTransform } from "./Transform";
import { Assets } from "./Scene";

class StaticCanvas extends Composite {
  constructor(domCanvas, assets = new Assets(), start = () => {}) {
    super();

    this.ctx = domCanvas.getContext("2d");

    this.transform = new CanvasTransform(domCanvas);

    assets.load.then(() => {
      start(this);
      this.renderAll(this.ctx);
    });
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  get canvas() {
    return this;
  }

  //TODO this wont work when objects are added to the composites directly
  addGameObject(gameObject) {
    super.addGameObject(gameObject);
    this.clear();
    console.log(this);
    this.renderAll(this.ctx);
  }
}

class Canvas extends Composite {
  constructor(domCanvas) {
    super();

    this.ctx = domCanvas.getContext("2d");

    this.transform = new CanvasTransform(domCanvas);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  get scene() {
    return this._scene;
  }

  get canvas() {
    return this;
  }
}

export { Canvas, StaticCanvas };
