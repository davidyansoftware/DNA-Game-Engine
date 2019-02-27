import { Rollover } from "./Rollover";
import { Bullet } from "./Bullet";

const BULLET_SPEED = 5;
const BULLET_RADIUS = 2;
const BULLET_DISTANCE = 500;

class BulletPrefab extends Dna.GameObject {
  constructor(parent, position, angle, astroidHurtboxes) {
    super(parent, position, [
      new Dna.Components.Polygon({ radius: BULLET_RADIUS }),
      new Rollover(BULLET_RADIUS)
    ]);

    let physics = new Dna.Components.Physics({
      speed: BULLET_SPEED,
      angle: angle
    });
    this.addComponent(physics);
    this.addComponent(new Bullet(physics, BULLET_DISTANCE));

    let hitbox = new Dna.Components.Hitcircle({
      radius: BULLET_RADIUS,
      hurtboxes: astroidHurtboxes,
      onCollisionEnter: astroid => {
        this.destroy();
        astroid.gameObject.destroy();
      }
    });
    this.addComponent(hitbox);
  }
}

export { BulletPrefab };
