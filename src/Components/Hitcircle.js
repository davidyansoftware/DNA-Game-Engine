import { Component } from "../Component";

class Hitcircle extends Component {
  constructor(options) {
    super();

    this.radius = options.radius || 10;

    //TODO generalize this behavior in a superclass
    this.hurtboxes = options.hurtboxes || [];
    this.hitboxSet = options.hitboxSet || [];

    this.onCollision = options.onCollision || function() {};
    this.onCollisionEnter = options.onCollisionEnter || function() {};
    this.onCollisionExit = options.onCollisionExit || function() {};

    this.collidingWith = [];

    this.hitboxSet.push(this);
  }

  update(deltaTime) {
    let num = this.hurtboxes.length;
    for (let i = 0; i < num; i++) {
      let hurtbox = this.hurtboxes[i];
      //TODO maybe use a hash, not array
      let collidingWithIndex = this.collidingWith.indexOf(hurtbox);
      let prevColliding = collidingWithIndex >= 0;
      if (hurtbox.collidingWithHitcircle(this)) {
        if (!prevColliding) {
          this.collidingWith.push(hurtbox);
          this.onCollisionEnter(hurtbox);
        }
        this.onCollision(hurtbox);
      } else {
        if (prevColliding) {
          this.collidingWith.splice(collidingWithIndex, 1);
          this.onCollisionExit(hurtbox);
        }
      }
    }
  }

  onDestroy() {
    let index = this.hitboxSet.indexOf(this);
    this.hitboxSet.splice(index, 1);
  }

  //TODO handle rotation??
  collidingWithHitbox(hitbox) {
    let thisCenter = this.gameObject.transform.getAbsoluteCenter();
    let hitboxCenter = hitbox.gameObject.transform.getAbsoluteCenter();
    if (thisCenter.x < hitboxCenter.x - hitbox.width / 2 - this.radius)
      return false;
    if (thisCenter.x > hitboxCenter.x + hitbox.width / 2 + this.radius)
      return false;
    if (thisCenter.y < hitboxCenter.y - hitbox.height / 2 - this.radius)
      return false;
    if (thisCenter.y > hitboxCenter.y + hitbox.height / 2 + this.radius)
      return false;

    return true;
  }

  collidingWithHitcircle(hitcircle) {
    let thisCenter = this.gameObject.transform.getAbsoluteCenter();
    let hitcircleCenter = hitcircle.gameObject.transform.getAbsoluteCenter();
    let distanceBetween = Math.sqrt(
      Math.pow(thisCenter.x - hitcircleCenter.x, 2) +
        Math.pow(thisCenter.y - hitcircleCenter.y, 2)
    );
    return distanceBetween < this.radius + hitcircle.radius;
  }

  clearCollisions() {
    this.collidingWith = [];
  }
}

export { Hitcircle };
