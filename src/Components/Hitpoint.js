import { HitEntity } from "./HitEntity";

class Hitpoint extends HitEntity {
  constructor(options) {
    super(options);

    // depends on transform for positional information
  }

  update(deltaTime) {
    let num = this.hurtboxes.length;
    for (let i = 0; i < num; i++) {
      let hurtbox = this.hurtboxes[i];
      let prevColliding = this.collidingWith[hurtbox];
      if (hurtbox.collidingWithHitpoint(this)) {
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
  //TODO double check boundaries touching
  collidingWithHitbox(hitbox) {
    let thisCenter = this.transform.getAbsoluteCenter();
    let hitboxCenter = hitbox.transform.getAbsoluteCenter();

    let topBound = hitboxCenter.y + hitbox.height / 2;
    if (thisCenter.y > topBound) return false;
    let bottomBound = hitboxCenter.y - hitbox.height / 2;
    if (thisCenter.y < bottomBound) return false;

    let leftBound = hitboxCenter.x - hitbox.width / 2;
    if (thisCenter.x < leftBound) return false;
    let rightBound = hitboxCenter.x + hitbox.width / 2;
    if (thisCenter.x > rightBound) return false;

    return true;
  }

  collidingWithHitcircle(hitcircle) {
    let thisCenter = this.transform.getAbsoluteCenter();
    let hitcircleCenter = hitcircle.transform.getAbsoluteCenter();
    let distanceBetween = Math.sqrt(
      Math.pow(thisCenter.x - hitcircleCenter.x, 2) +
        Math.pow(thisCenter.y - hitcircleCenter.y, 2)
    );
    return distanceBetween < hitcircle.radius;
  }

  collidingWithHitpoint(hitpoint) {
    let hitpointCenter = hitpoint.transform.getAbsoluteCenter();
    let thisCenter = this.transform.getAbsoluteCenter();
    return thisCenter.x == hitpointCenter.x && thisCenter.y == hitpointCenter.y;
  }
}

export { Hitcircle };
