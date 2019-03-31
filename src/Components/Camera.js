import { Component } from "../Component";
import { Degrees } from "../Utilities/Angle";

// these are reversed (if the camera moves right, everything in it should be rendered on the left)
function reverseContext(drawSettings) {
  let context = drawSettings.context;
  context.save();

  context.translate(-drawSettings.position.x, -drawSettings.position.y);
  context.rotate(-drawSettings.rotation.radians);
  context.scale(1 / drawSettings.scale.x, 1 / drawSettings.scale.y);
}

function restoreContext(drawSettings) {
  drawSettings.context.restore();
}

class Camera extends Component {
  constructor(options) {
    super();

    this.domCanvas = options.domCanvas;
    this.ctx = this.domCanvas.getContext("2d");

    this.root = options.root; //TODO default to scene object, but might not be attached to gameObject at this point

    this._currDraw = {};
  }

  update(deltaTime) {
    this.clear();
    //TODO since all of these are reference types now, could probably just set once and forget
    this._currDraw.context = this.ctx;
    this._currDraw.position = this.transform.position;
    this._currDraw.rotation = this.transform.rotation;
    this._currDraw.scale = this.transform.scale;
    reverseContext(this._currDraw);

    //TODO shouldn't render this, but some "root?"
    this.root.renderAll(this.ctx);

    restoreContext(this._currDraw);
  }

  //TODO how should clear be handled if multiple canvases use this camera?
  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}

export { Camera };
