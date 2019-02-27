import { Component } from "../Component";

class Hitbox extends Component {
  constructor(options) {
    super();

    this.width = options.width || 10;
    this.height = options.height || 10;

    //TODO generalize this behavior in a superclass
    this.hurtboxes = options.hurtboxes || [];
    this.hitboxSet = options.hitboxSet || [];
    //TODO rename to onCollision
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
      if (hurtbox.collidingWithHitbox(this)) {
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

  //TODO handle rotation?? use absoluteposition(x,y)
  collidingWithHitbox(hitbox) {
    let thisCenter = this.gameObject.transform.getAbsoluteCenter();
    let hitboxCenter = hitbox.gameObject.transform.getAbsoluteCenter();
    if (thisCenter.x < hitboxCenter.x - hitbox.width / 2 - this.width / 2)
      return false;
    if (thisCenter.x > hitboxCenter.x + hitbox.width / 2 + this.width / 2)
      return false;
    if (thisCenter.y < hitboxCenter.y - hitbox.height / 2 - this.height / 2)
      return false;
    if (thisCenter.y > hitboxCenter.y + hitbox.height / 2 + this.height / 2)
      return false;

    return true;
  }

  collidingWithHitcircle(hitcircle) {
    let thisCenter = this.gameObject.transform.getAbsoluteCenter();
    let hitcircleCenter = hitcircle.gameObject.transform.getAbsoluteCenter();
    if (thisCenter.x < hitcircleCenter.x - hitcircle.radius - this.width / 2)
      return false;
    if (thisCenter.x > hitcircleCenter.x + hitcircle.radius + this.width / 2)
      return false;
    if (thisCenter.y < hitcircleCenter.y - hitcircle.radius - this.height / 2)
      return false;
    if (thisCenter.y > hitcircleCenter.y + hitcircle.radius + this.height / 2)
      return false;

    return true;
  }

  clearCollisions() {
    this.collidingWith = [];
  }
}

export { Hitbox };
