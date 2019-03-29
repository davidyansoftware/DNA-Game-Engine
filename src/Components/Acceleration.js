import { Component } from "../Component";
import { Degrees } from "../Utilities/Angle";

//TODO could be a subcomponent of physics??
//TODO could also be handled as a position within physics
class Acceleration extends Component {
  constructor(physics, options = {}) {
    super();

    this.physics = physics;

    this.active = options.active || true;
    //TODO vector class
    this.angle = options.angle || new Degrees(0);
    this.accel = options.accel || 0;
    //TODO rename to drag
    this.friction = options.friction || 0;
  }

  update(deltaTime) {
    if (this.active) {
      this.physics.velocity.x += this.accel * Math.sin(this.angle.radians);
      this.physics.velocity.y += this.accel * -Math.cos(this.angle.radians);
    } else {
      //TODO this friction value is affected for side to side even for down friction
      this.physics.velocity.x -= this.physics.velocity.x * this.friction;
      this.physics.velocity.y -= this.physics.velocity.y * this.friction;
    }
  }
}

export { Acceleration };
