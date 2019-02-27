import { Component } from "../Component";
import { Degrees } from "../Utilities/Angle";

class Physics extends Component {
  constructor(options = {}) {
    super();

    this.angle = options.angle || new Degrees(0);
    this.speed = options.speed || 0;

    this.distanceTraveled = {
      x: 0,
      y: 0,
      total: 0
    };

    this.totalDistanceTraveled = 0;
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

    //TODO this wont be updated correctly to account for walls
    this.distanceTraveled.x = xv;
    this.distanceTraveled.y = yv;
    this.distanceTraveled.total = this.speed;

    this.totalDistanceTraveled += this.speed;
    console.log(this.totalDistanceTraveled + ">=" + this.maxDistance);
    if (this.totalDistanceTraveled >= this.maxDistance) {
      this.callback();
    }
  }
}

export { Physics };
