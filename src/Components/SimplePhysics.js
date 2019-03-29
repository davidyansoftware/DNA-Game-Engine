import { Component } from "../Component";

//TODO also want vector (angle + speed), consolidate this with physics
//TODO make vector and coodinates interchangable
class SimplePhysics extends Component {
  constructor(options = {}) {
    super();

    this.xv = options.xv || 0;
    this.yv = options.yv || 0;
  }

  update(deltaTime) {
    this.gameObject.transform.position.x += this.xv;
    this.gameObject.transform.position.y += this.yv;
  }
}

export { SimplePhysics };
