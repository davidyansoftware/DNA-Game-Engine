import { Degrees } from "./Utilities/Angle";

function updateContext(drawSettings) {
  let context = drawSettings.context;
  context.save();

  context.translate(drawSettings.x, drawSettings.y);
  context.rotate(drawSettings.rotation.radians);
  context.scale(drawSettings.xScale, drawSettings.yScale);
}

function restoreContext(drawSettings) {
  drawSettings.context.restore();
}

class Composite {
  constructor() {
    this.gameObjects = [];
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
    let currDraw = {
      context: context,

      x: this.transform.x,
      y: this.transform.y,

      rotation: this.transform.rotation || new Degrees(0),

      xScale: this.transform.xScale || 1,
      yScale: this.transform.yScale || 1
    };
    updateContext(currDraw);

    this.render(context);
    this.gameObjects.forEach(function(gameObject) {
      gameObject.renderAll(context);
    });

    restoreContext(currDraw);
  }
}

export { Composite };
