import { Hitentity } from "./Hitentity";

class Hitcircle extends Hitentity {
  constructor(options) {
    super(options);

    this.radius = options.radius || 10;
  }

  update(deltaTime) {
    let num = this.hurtboxes.length;
    for (let i = 0; i < num; i++) {
      let hurtbox = this.hurtboxes[i];
      let prevColliding = this.collidingWith[hurtbox];
      if (hurtbox.collidingWithHitcircle(this)) {
        if (!prevColliding) {
          this.collidingWith[hurtbox] = true;
          this.onCollisionEnter(hurtbox);
        }
        this.onCollision(hurtbox);
      } else {
        if (prevColliding) {
          this.collidingWith[hurtbox] = false;
          this.onCollisionExit(hurtbox);
        }
      }
    }
  }

  //TODO handle rotation??
  collidingWithHitbox(hitbox) {
    let thisCenter = this.transform.getAbsoluteCenter();
    let hitboxCenter = hitbox.transform.getAbsoluteCenter();
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
    let thisCenter = this.transform.getAbsoluteCenter();
    let hitcircleCenter = hitcircle.transform.getAbsoluteCenter();
    let distanceBetween = Math.sqrt(
      Math.pow(thisCenter.x - hitcircleCenter.x, 2) +
        Math.pow(thisCenter.y - hitcircleCenter.y, 2)
    );
    return distanceBetween < this.radius + hitcircle.radius;
  }

  collidingWithHitpoint(hitpoint) {
    let thisCenter = this.transform.getAbsoluteCenter();
    let hitpointCenter = hitpoint.transform.getAbsoluteCenter();
    let distanceBetween = Math.sqrt(
      Math.pow(thisCenter.x - hitpointCenter.x, 2) +
        Math.pow(thisCenter.y - hitpointCenter.y, 2)
    );
    return distanceBetween < this.radius;
  }
}

export { Hitcircle };
