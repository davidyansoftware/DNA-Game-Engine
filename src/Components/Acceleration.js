import { Component } from "../Component";
import { Vector } from "../Utilities/Position";
import { Degrees } from "../Utilities/Angle";

//TODO could be a subcomponent of physics??
//TODO could also be handled as a position within physics
class Acceleration extends Component {
  constructor(physics, options = {}) {
    super();

    this.physics = physics;

    this.active = options.active || true;
    this.acceleration =
      options.acceleration ||
      new Vector(options.angle || new Degrees(0), options.accel || 0);
    //TODO rename to drag
    this.friction = options.friction || 0;
  }

  update(deltaTime) {
    if (this.active) {
      this.physics.velocity.add(this.acceleration);
    } else {
      this.physics.velocity.scale(1 - this.friction);
    }
  }
}

export { Acceleration };
