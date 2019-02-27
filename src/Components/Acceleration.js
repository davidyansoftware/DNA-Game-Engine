import { Component } from "../Component";
import { Degrees } from "../Utilities/Angle";

//TODO could be a subcomponent of physics??
class Acceleration extends Component {
  constructor(physics, options = {}) {
    super();

    this.physics = physics;

    //TODO these should be private
    //this.xa = options.xa || 0;
    //this.ya = options.ya || 0;
    //this.distanceTraveled = 0;

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

    /*
    this.distanceTraveled += Math.sqrt(
      Math.pow(this.xv, 2) + Math.pow(this.yv, 2)
    );
    if (this.distanceTraveled >= this.maxDistance.distance) {
      this.maxDistance.callback();
    }
    */
  }
}

export { Acceleration };
