//import { Coordinates } from "./Position";

function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function radiansToDegrees(radians) {
  return (radians * 180) / Math.PI;
}

class Angle {
  constructor(degrees, radians) {
    this._degrees = degrees;
    this._radians = radians;

    //TODO dirty flags
  }

  get degrees() {
    return this._degrees;
  }
  get radians() {
    return this._radians;
  }

  set degrees(degrees) {
    this._degrees = degrees;
    this._radians = degreesToRadians(degrees);
  }
  set radians(radians) {
    this._radians = radians;
    this._degrees = radiansToDegrees(radians);
  }

  add(angle) {
    this.radians += angle.radians;
    return this;
  }

  addRadians(radians) {
    this.radians += radians;
    return this;
  }

  addDegrees(degrees) {
    this.degrees += degrees;
    return this;
  }

  getNewAngle(spread) {
    let radians = this.radians;
    radians -= spread.radians / 2;
    radians += Math.random() * spread.radians;
    return new Radians(radians);
  }

  /*
  getUnitCoordinates(scale = 1) {
    return new Coordinates(
      Math.sin(this.radians) * scale,
      -Math.cos(this.radians) * scale
    );
  }
  */

  static get UP() {
    return UP;
  }
  static get LEFT() {
    return LEFT;
  }
  static get DOWN() {
    return DOWN;
  }
  static get RIGHT() {
    return RIGHT;
  }
}

class Degrees extends Angle {
  constructor(degrees) {
    //return new Angle(degrees, degreesToRadians(degrees));
    super(degrees, degreesToRadians(degrees));
  }
}

class Radians extends Angle {
  constructor(radians) {
    //return new Angle(radiansToDegrees(radians), radians);
    super(radiansToDegrees(radians), radians);
  }
}

const UP = new Radians(0);
const LEFT = new Radians(Math.PI / 2);
const DOWN = new Radians(Math.PI);
const RIGHT = new Radians((3 * Math.PI) / 2);

export { Degrees, Radians };
