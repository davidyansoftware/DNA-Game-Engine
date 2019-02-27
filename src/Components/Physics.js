import { Component } from "../Component";
import { Degrees } from "../Utilities/Angle";

class Physics extends Component {
  constructor(options = {}) {
    super();

    this.angle = options.angle || new Degrees(0);
    this.speed = options.speed || 0;

    this.distanceTraveled = 0;
    this.maxDistance = options.maxDistance || Infinity;
    this.callback =
      options.callback ||
      (() => {
        //this.gameObject.removeComponent(this);
        this.gameObject.destroy();
      });
  }

  //TODO radians vs degrees?
  update(deltaTime) {
    let xv = this.speed * Math.sin(this.angle.radians);
    let yv = this.speed * -Math.cos(this.angle.radians);

    this.gameObject.transform.x += xv;
    this.gameObject.transform.y += yv;

    // this wont account for boundaries or other forces
    this.distanceTraveled += this.speed;
    console.log(this.distanceTraveled + ">=" + this.maxDistance);
    if (this.distanceTraveled >= this.maxDistance) {
      this.callback();
    }
  }
}

export { Physics };
