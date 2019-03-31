import { Degrees } from "./Utilities/Angle";

function updateContext(drawSettings) {
  let context = drawSettings.context;
  context.save();

  context.translate(drawSettings.position.x, drawSettings.position.y);
  context.rotate(drawSettings.rotation.radians);
  context.scale(drawSettings.scale.x, drawSettings.scale.y);
}

function restoreContext(drawSettings) {
  drawSettings.context.restore();
}

class Composite {
  constructor() {
    this.gameObjects = [];

    this._currDraw = {};
  }

  //TODO these shouldn't be exposed to user, use setParent
  addGameObject(gameObject) {
    this.gameObjects.push(gameObject);
  }

  removeGameObject(gameObject) {
    let index = this.gameObjects.indexOf(gameObject);
    if (index >= 0) this.gameObjects.splice(index, 1);
  }

  //TODO do not need update/render functions here, remove from composite entirely
  render(context) {}
  update() {}

  updateAll(deltaTime) {
    this.update(deltaTime);
    this.gameObjects.forEach(function(gameObject) {
      gameObject.updateAll(deltaTime);
    });
    this.gameObjects.forEach(function(gameObject) {
      if (gameObject.dead) {
        gameObject.destroyNow();
      }
    });
  }

  /*
  handleAllFlags() {
    this.gameObjects.forEach(function(gameObject) {
      if (gameObject.dead) {
        gameObject.destroyNow();
      }
    });
  }
  */

  renderAll(context) {
    //TODO since all of these are reference types now, could probably just set once and forget
    this._currDraw.context = context;
    this._currDraw.position = this.transform.position;
    this._currDraw.rotation = this.transform.rotation;
    this._currDraw.scale = this.transform.scale;
    updateContext(this._currDraw);

    this.render(context);
    this.gameObjects.forEach(function(gameObject) {
      gameObject.renderAll(context);
    });

    restoreContext(this._currDraw);
  }
}

export { Composite };
