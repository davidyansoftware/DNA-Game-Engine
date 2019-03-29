import { Radians } from "./Angle";

function recalculateVector(position) {
  position._angle.radians = Math.atan2(position._y, position._x) + Math.PI / 2;
  position._magnitude = Math.sqrt(
    Math.pow(position._x, 2) + Math.pow(position._y, 2)
  );
  position._dirtyVector = false;
}
function recalculateCoordinates(position) {
  position._x = Math.sin(position._angle.radians) * position._magnitude;
  position._y = -Math.cos(position._angle.radians) * position._magnitude;
  position._dirtyCoordinates = false;
  position._prevRadians = position._angle.radians;
}

class Position {
  constructor() {
    this._x;
    this._y;

    this._angle = new Radians(0);
    this._magnitude;

    this._dirtyCoordinates;
    this._dirtyVector;
    this._prevRadians = this._angle.radians;
  }

  add(position) {
    this.x += position.x;
    this.y += position.y;
  }
  subtract(position) {
    this.x -= position.x;
    this.y -= position.y;
  }

  //TODO need to check if angle is dirty too
  get x() {
    if (this._dirtyCoordinates || this._angle.radians != this._prevRadians) {
      recalculateCoordinates(this);
    }
    return this._x;
  }
  set x(x) {
    this._x = x;
    this._dirtyVector = true;
  }

  get y() {
    if (this._dirtyCoordinates || this._angle.radians != this._prevRadians) {
      recalculateCoordinates(this);
    }
    return this._y;
  }
  set y(y) {
    this._y = y;
    this._dirtyVector = true;
  }

  get angle() {
    if (this._dirtyVector) {
      recalculateVector(this);
    }
    return this._angle;
  }
  set angle(angle) {
    this._angle = angle;
    this._dirtyCoordinates = true;
  }

  get magnitude() {
    if (this._dirtyVector) {
      recalculateVector(this);
    }
    return this._magnitude;
  }
  set magnitude(magnitude) {
    this._magnitude = magnitude;
    this._dirtyCoordinates = true;
  }

  static get UNIT_LEFT() {
    return UNIT_LEFT;
  }
  static get UNIT_RIGHT() {
    return UNIT_RIGHT;
  }
  static get UNIT_UP() {
    return UNIT_UP;
  }
  static get UNIT_DOWN() {
    return UNIT_DOWN;
  }
}

//TODO defaults, including zero angle
class Coordinates extends Position {
  constructor(x, y) {
    super();
    this._x = x;
    this._y = y;
    this._dirtyVector = true;
  }
}

class Vector extends Position {
  constructor(angle, magnitude) {
    super();
    this._angle = angle;
    this._magnitude = magnitude;
    this._dirtyCoordinates = true;
  }
}

const UNIT_LEFT = new Coordinates(-1, 0);
const UNIT_RIGHT = new Coordinates(1, 0);
const UNIT_UP = new Coordinates(0, -1);
const UNIT_DOWN = new Coordinates(0, 1);

export { Coordinates, Vector };
