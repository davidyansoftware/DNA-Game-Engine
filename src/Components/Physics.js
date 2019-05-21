import { Component } from "../Component";
import { Coordinates } from "../Utilities/Position";

class Physics extends Component {
  constructor(options = {}) {
    super();

    this.velocity = options.velocity || new Coordinates(0, 0);

    this.drag = options.drag || 0;

    this.distanceTraveled = 0;
    this.maxDistance = options.maxDistance || Infinity;
    this.callback =
      options.callback ||
      (() => {
        this.gameObject.destroy();
      });
  }

  update(deltaTime) {
    this.velocity.scale(1 - this.drag * deltaTime);

    this.transform.position.add(this.velocity);

    //TODO do we also want to track max x or max y?
    // this wont account for boundaries or other forces
    this.distanceTraveled += this.velocity.magnitude;
    if (this.distanceTraveled >= this.maxDistance) {
      this.callback();
    }
  }
}

export { Physics };
