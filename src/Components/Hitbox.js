import { HitEntity } from "./HitEntity";

class Hitbox extends HitEntity {
  constructor(options) {
    super(options);

    this.width = options.width || 10;
    this.height = options.height || 10;
  }

  update(deltaTime) {
    let num = this.hurtboxes.length;
    for (let i = 0; i < num; i++) {
      let hurtbox = this.hurtboxes[i];
      let prevColliding = this.collidingWith[hurtbox];
      if (hurtbox.collidingWithHitbox(this)) {
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

  //TODO handle rotation?? use absoluteposition(x,y)
  collidingWithHitbox(hitbox) {
    let thisCenter = this.transform.getAbsoluteCenter();
    let hitboxCenter = hitbox.transform.getAbsoluteCenter();
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
    let thisCenter = this.transform.getAbsoluteCenter();
    let hitcircleCenter = hitcircle.transform.getAbsoluteCenter();
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

  collidingWithHitpoint(hitpoint) {
    let thisCenter = this.transform.getAbsoluteCenter();
    let hitpointCenter = hitpoint.transform.getAbsoluteCenter();

    let topBound = thisCenter.y + this.height / 2;
    if (hitpointCenter.y > topBound) return false;
    let bottomBound = thisCenter.y - this.height / 2;
    if (hitpointCenter.y > bottomBound) return false;

    let leftBound = thisCenter.x - this.width / 2;
    if (hitpointCenter.x < leftBound) return false;
    let rightBound = thisCenter.x + this.width / 2;
    if (hitpointCenter.x > rightBound) return false;

    return true;
  }
}

export { Hitbox };
