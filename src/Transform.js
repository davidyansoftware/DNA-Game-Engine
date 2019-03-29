import { Radians } from "./Utilities/Angle";
import { Coordinates } from "./Utilities/Position";

const defaults = {
  x: 0,
  y: 0,
  depth: 0,

  //TODO having a default as a reference object is problematic
  //rotation: new Degrees(0),

  xScale: 1,
  yScale: 1
};

class Transform {
  //TODO setup anchors, base center and origin on these
  constructor(options = {}) {
    //TODO use position here
    //this.x = options.x || defaults.x;
    //this.y = options.y || defaults.y;
    //TODO probably dont want to take in redundant params
    this.position =
      options.position ||
      new Coordinates(options.x || defaults.x, options.y || defaults.y);
    //this.position = options.position || new Coordinates(0, 0);
    this.depth = options.depth || defaults.depth;

    //this.rotation = options.rotation || defaults.rotation;
    this.rotation = options.rotation || new Radians(0);

    this.xScale = options.xScale || defaults.xScale;
    this.yScale = options.yScale || defaults.yScale;

    //TODO store and modify a different position class
    //this.prevX;
    //this.prevY;
    this.update();

    //TODO this is used to avoid generating garbage, should properly cache
    //TODO altering this reference could cause problems for components that store this
    this.globalPosition = new Coordinates(0, 0);
  }

  update(deltaTime) {
    //TODO also want to keep track of absolute positions here???? many extra computations per frame
    //TODO remove this from transform class - impliment in platform class
    this.prevX = this.position.x;
    this.prevY = this.position.y;
  }

  //TODO consolidate these to GetVectorToTransform?
  getAngleToTransform(other) {
    let thisCenter = this.getAbsoluteCenter();
    let otherCenter = other.getAbsoluteCenter();

    let dx = thisCenter.x - otherCenter.x;
    let dy = thisCenter.y - otherCenter.y;
    return Math.atan2(dy, dx) - Math.PI / 2;
  }

  getDistanceToTransform(other) {
    let thisCenter = this.getAbsoluteCenter();
    let otherCenter = other.getAbsoluteCenter();

    return Math.sqrt(
      Math.pow(thisCenter.x - otherCenter.x, 2) +
        Math.pos(thisCenter.y - otherCenter.y, 2)
    );
  }

  getAbsoluteRotation() {
    return this.gameObject.parent.transform
      .getAbsoluteRotation()
      .addDegrees(this.rotation.degrees);
  }

  //TODO should use physics
  //TODO include this with point
  moveTo(x, y, distance) {
    let dx = x - this.position.x;
    let dy = y - this.position.y;

    let hypotenuse = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    if (distance > hypotenuse) {
      this.position.x = x;
      this.position.y = y;
      return true;
    } else {
      let angle = Math.atan2(dy, dx) + Math.PI / 2;
      this.position.x += distance * Math.sin(angle);
      this.position.y += distance * -Math.cos(angle);
      return false;
    }
  }

  setAbsoluteRotation(rotation) {
    this.rotation = rotation.addDegrees(
      -this.gameObject.parent.transform.getAbsoluteRotation().degrees
    );
  }

  getAbsolutePosition(x, y) {
    let center = this.getAbsoluteCenter();
    let rotation = this.getAbsoluteRotation();
    let rad = rotation.radians;

    this.globalPosition.x = center.x + x * Math.cos(rad) - y * Math.sin(rad);
    this.globalPosition.y = center.y + x * Math.sin(rad) + y * Math.cos(rad);

    return this.globalPosition;
  }

  getAbsoluteCenter() {
    let parentCenter = this.gameObject.parent.transform.getAbsoluteCenter();
    let parentRotation = this.gameObject.parent.transform.getAbsoluteRotation();
    let rad = parentRotation.radians;

    let x = this.position.x * this.xScale;
    let y = this.position.y * this.yScale;

    return {
      x: parentCenter.x + x * Math.cos(rad) - y * Math.sin(rad),
      y: parentCenter.y + x * Math.sin(rad) + y * Math.cos(rad)
    };
  }

  //TODO handle scale, reference above
  setAbsoluteCenter(center) {
    let parentCenter = this.gameObject.parent.transform.getAbsoluteCenter();
    let parentRotation = this.gameObject.parent.transform.getAbsoluteRotation();
    let rad = new Radians(-parentRotation.radians).radians; // negative to negate rotation

    center.x -= parentCenter.x;
    center.y -= parentCenter.y;

    this.position.x = center.x * Math.cos(rad) - center.y * Math.sin(rad);
    this.position.y = center.x * Math.sin(rad) + center.y * Math.cos(rad);
  }
}

class CanvasTransform extends Transform {
  constructor(domCanvas) {
    super();

    this.width = domCanvas.width;
    this.height = domCanvas.height;

    this.position.x = this.width / 2;
    this.position.y = this.height / 2;
  }

  getAbsoluteCenter() {
    return {
      x: 0,
      y: 0
    };
  }

  getAbsoluteRotation() {
    return new Radians(0);
  }
}

export { Transform, CanvasTransform };
