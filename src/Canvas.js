import { Composite } from "./Composite";
import { CanvasTransform } from "./Transform";

class StaticCanvas extends Composite {
  constructor(domCanvas, load = [], start = () => {}) {
    super();

    this.ctx = domCanvas.getContext("2d");

    this.transform = new CanvasTransform(domCanvas);

    //TODO this should be handled as part of scene class
    Promise.all(load).then(() => {
      start(this);
    });
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  getCanvas() {
    return this;
  }

  getContext() {
    return this.ctx;
  }

  //TODO this wont work when objects are added to the composites directly
  addGameObject(gameObject) {
    super.addGameObject(gameObject);
    this.clear();
    console.log(this);
    this.renderAll();
  }
}

class Canvas extends Composite {
  constructor(domCanvas) {
    super();
    //TODO probably dont need to reference game here, just handle canvases from the game itself
    //this.game = game;
    //this.scene = scene;
    this.ctx = domCanvas.getContext("2d");

    this.transform = new CanvasTransform(domCanvas);

    //this.prevTime;

    //let self = this;
    //window.requestAnimationFrame(function(currTime) {
    //  self.gameLoop(currTime);
    //});
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  //TODO move this out of this class (game class?)
  //TODO handle static canvas
  gameLoop(currTime) {
    if (!this.prevTime) this.prevTime = currTime;
    let deltaTime = (currTime - this.prevTime) / 1000;
    this.prevTime = currTime;

    this.clear();
    this.updateAll(deltaTime);
    this.renderAll();

    let self = this;
    window.requestAnimationFrame(function(currTime) {
      self.gameLoop(currTime);
    });
  }

  getScene() {
    return this.scene;
  }

  getCanvas() {
    return this;
  }

  getContext() {
    return this.ctx;
  }
}

export { Canvas, StaticCanvas };
