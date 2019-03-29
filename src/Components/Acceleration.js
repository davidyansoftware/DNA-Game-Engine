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
      //TODO this friction value is affected for side to side even for down friction
      //TODO probably want some sort of 'scale' function in vector
      this.physics.velocity.x -= this.physics.velocity.x * this.friction;
      this.physics.velocity.y -= this.physics.velocity.y * this.friction;
    }
  }
}

export { Acceleration };
