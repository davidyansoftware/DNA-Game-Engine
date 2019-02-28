import { Component } from "../Component";

class HitEntity extends Component {
  constructor(options) {
    super();

    this.hurtboxes = options.hurtboxes || [];
    this.hitboxSet = options.hitboxSet || [];

    this.onCollision = options.onCollision || function() {};
    this.onCollisionEnter = options.onCollisionEnter || function() {};
    this.onCollisionExit = options.onCollisionExit || function() {};

    this.collidingWith = [];

    this.hitboxSet.push(this);
  }

  onDestroy() {
    let index = this.hitboxSet.indexOf(this);
    this.hitboxSet.splice(index, 1);
  }

  clearCollisions() {
    this.collidingWith = [];
  }
}

export { HitEntity };
