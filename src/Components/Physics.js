import { Component } from "../Component";
import { Vector } from "../Utilities/Position";
import { Degrees } from "../Utilities/Angle";

class Physics extends Component {
  constructor(options = {}) {
    super();

    //TODO use position type
    //this.angle = options.angle || new Degrees(0);
    //this.speed = options.speed || 0;

    this.velocity = new Vector(
      options.angle || new Degrees(0),
      options.speed || 0
    );

    this.distanceTraveled = 0;
    this.maxDistance = options.maxDistance || Infinity;
    this.callback =
      options.callback ||
      (() => {
        this.gameObject.destroy();
      });
  }

  update(deltaTime) {
    //let xv = this.speed * Math.sin(this.angle.radians);
    //let yv = this.speed * -Math.cos(this.angle.radians);

    //this.gameObject.transform.position.x += xv;
    //this.gameObject.transform.position.y += yv;
    //this.gameObject.transform.position.x += this.velocity.x;
    //this.gameObject.transform.position.y += this.velocity.y;
    this.gameObject.transform.position.add(this.velocity);

    //TODO do we also want to track max x or max y?
    // this wont account for boundaries or other forces
    //this.distanceTraveled += this.speed;
    this.distanceTraveled += this.velocity.magnitude;
    if (this.distanceTraveled >= this.maxDistance) {
      this.callback();
    }
  }
}

export { Physics };
