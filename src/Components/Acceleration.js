import { Component } from "../Component";
import { Degrees } from "../Utilities/Angle";

//TODO could be a subcomponent of physics??
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

    this.maxDistance = options.maxDistance || {
      distance: Infinity,
      callback: () => {}
    };
  }

  update(deltaTime) {
    if (this.active) {
      this.physics.xv += this.accel * Math.sin(this.angle.radians);
      this.physics.yv += this.accel * -Math.cos(this.angle.radians);
    } else {
      //TODO this friction value is affected for side to side even for down friction
      this.physics.xv -= this.physics.xv * this.friction;
      this.physics.yv -= this.physics.yv * this.friction;
    }
  }
}

export { Acceleration };
