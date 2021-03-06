import { Radians } from "./Utilities/Angle";
import { Coordinates } from "./Utilities/Position";

const defaults = {
  x: 0,
  y: 0,
  depth: 0,

  //TODO having a default as a reference object is problematic
  //TODO can use getter as part of object? (return new Degrees(0));
  //rotation: new Degrees(0),

  xScale: 1,
  yScale: 1
};

//TODO can extend to incorporate shape? will need to check valid shapes within components
class Transform {
  //TODO setup anchors, base center and origin on these
  constructor(options = {}) {
    //this._gameObject - set in GameObject constructor

    this.position =
      options.position ||
      new Coordinates(options.x || defaults.x, options.y || defaults.y);

    this.depth = options.depth || defaults.depth;

    this.rotation = options.rotation || new Radians(0);

    this.scale =
      options.scale ||
      new Coordinates(
        options.xScale || defaults.xScale,
        options.yScale || defaults.yScale
      );

    this.prevPosition = new Coordinates(this.position.x, this.position.y);

    //TODO this is used to avoid generating garbage, should properly cache
    this.globalPosition = new Coordinates(0, 0);
  }

  get gameObject() {
    return this._gameObject;
  }
  get transform() {
    return this;
  }

  update(deltaTime) {
    //TODO also want to keep track of absolute positions here???? many extra computations per frame
    //TODO remove this from transform class - impliment in platform class
    this.prevPosition.x = this.position.x;
    this.prevPosition.y = this.position.y;
  }

  getAbsoluteRotation() {
    return this.gameObject.parent.transform
      .getAbsoluteRotation()
      .add(this.rotation);
  }
  setAbsoluteRotation(rotation) {
    this.rotation = rotation.add(
      -this.gameObject.parent.transform.getAbsoluteRotation()
    );
  }

  getAbsoluteCenter() {
    let parentCenter = this.gameObject.parent.transform.getAbsoluteCenter();
    let parentRotation = this.gameObject.parent.transform.getAbsoluteRotation();
    let rad = parentRotation.radians;

    let x = this.position.x * this.scale.x;
    let y = this.position.y * this.scale.y;

    return {
      x: parentCenter.x + x * Math.cos(rad) - y * Math.sin(rad),
      y: parentCenter.y + x * Math.sin(rad) + y * Math.cos(rad)
    };
  }
  //TODO handle scale, reference above
  setAbsoluteCenter(center) {
    let parentCenter = this.gameObject.parent.transform.getAbsoluteCenter();
    let parentRotation = this.gameObject.parent.transform.getAbsoluteRotation();
    let rad = -parentRotation.radians; // negative to negate rotation

    center.x -= parentCenter.x;
    center.y -= parentCenter.y;

    this.position.x = center.x * Math.cos(rad) - center.y * Math.sin(rad);
    this.position.y = center.x * Math.sin(rad) + center.y * Math.cos(rad);
  }

  //TODO consolidate these to GetVectorToTransform? - will generate garbage
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

  getAbsolutePosition(x, y) {
    let center = this.getAbsoluteCenter();
    let rotation = this.getAbsoluteRotation();
    let rad = rotation.radians;

    this.globalPosition.x = center.x + x * Math.cos(rad) - y * Math.sin(rad);
    this.globalPosition.y = center.y + x * Math.sin(rad) + y * Math.cos(rad);

    return this.globalPosition;
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
}

class CanvasTransform extends Transform {
  constructor(domCanvas) {
    super();

    this.width = domCanvas.width;
    this.height = domCanvas.height;

    this.position.x = this.width / 2;
    this.position.y = this.height / 2;
  }

  //TODO return this as a const position
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

class SceneTransform extends Transform {
  constructor() {
    super();
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

export { Transform, CanvasTransform, SceneTransform };
