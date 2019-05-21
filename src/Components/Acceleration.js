import { Component } from "../Component";
import { Vector } from "../Utilities/Position";
import { Degrees } from "../Utilities/Angle";

//TODO could be a subcomponent of physics??
//TODO could also be handled as a position within physics, but may want multiple sources of acceleration (ex. movement + gravity)
class Acceleration extends Component {
  constructor(physics, options = {}) {
    super();

    this.physics = physics;

    this.active = options.active || true;
    this.acceleration =
      options.acceleration ||
      new Vector(options.angle || new Degrees(0), options.accel || 0);

    this._scaledAcceleration = new Vector(
      this.acceleration.angle,
      this.acceleration.magnitude
    );
  }

  update(deltaTime) {
    if (this.active) {
      //TODO find a way to set equal
      this._scaledAcceleration.angle = this.acceleration.angle;
      this._scaledAcceleration.magnitude = this.acceleration.magnitude;
      this._scaledAcceleration.scale(deltaTime);
      this.physics.velocity.add(this._scaledAcceleration);
    }
  }
}

export { Acceleration };
