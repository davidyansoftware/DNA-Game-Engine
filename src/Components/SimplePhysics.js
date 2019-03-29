import { Component } from "../Component";
import { Coordinates } from "../Utilities/Position";

//TODO also want vector (angle + speed), consolidate this with physics
//TODO make vector and coodinates interchangable
class SimplePhysics extends Component {
  constructor(options = {}) {
    super();

    //TODO use position class (velocity?)
    //TODO can also add acceleration coordinates here
    //this.xv = options.xv || 0;
    //this.yv = options.yv || 0;

    //TODO should not accept xv/yv, will need to distinguish between angle/speed - should just take in coordinate
    //TODO this class is obsolete after switching physics to velocity component
    this.velocity = new Coordinates(options.xv || 0, options.yv || 0);
  }

  update(deltaTime) {
    //this.gameObject.transform.position.x += this.xv;
    //this.gameObject.transform.position.y += this.yv;
    //TODO could simply use add here
    this.gameObject.transform.position.x += this.velocity.x;
    this.gameObject.transform.position.y += this.velocity.y;
  }
}

export { SimplePhysics };
