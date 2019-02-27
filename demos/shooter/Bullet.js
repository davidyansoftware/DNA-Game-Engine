//import { Knockback } from "./Knockback";
//TODO store onhitclip in monsterdata
import gunHit from "./assets/sounds/gun_hit.wav";

const SPEED = 5;
const RADIUS = 2;
//const MAX_DISTANCE = 500;
const DAMAGE = 10;

let audio = new Dna.Components.Audio({ volume: 0.05 });

//TODO this should just be a physics tween
class BulletComponent extends Dna.Component {
  constructor(physics, maxDistance) {
    super();

    this.physics = physics;
    //this.distanceTraveled = 0;
    this.maxDistance = maxDistance;
    this.damage = DAMAGE;
  }

  update(deltaTime) {
    //this.distanceTraveled += this.physics.distanceTraveled.total;
    //if (this.distanceTraveled > this.maxDistance) {
    //  this.gameObject.destroy();
    //}
  }
}

class Bullet extends Dna.GameObject {
  constructor(parent, position, image, angle, hurtboxes, maxDistance) {
    //position.rotation = angle.addRadians(-Math.PI / 2);
    super(parent, position, [
      //new Dna.Components.Polygon({ radius: RADIUS, fillStyle: color })
      //new Dna.Components.Image({ image: image })
      //image
    ]);

    this.addGameObject(
      new Dna.GameObject(
        this,
        {
          rotation: new Dna.Utilities.Radians(angle.radians - Math.PI / 2)
        },
        [image]
      )
    );

    let physics = new Dna.Components.Physics({
      speed: SPEED,
      angle: angle,
      maxDistance: maxDistance,
      callback: () => {
        this.destroy();
      }
    });
    this.addComponent(physics);

    let bullet = new BulletComponent(physics, maxDistance);
    this.addComponent(bullet);

    //TODO reverse this logic, keep track of bullet array in hero
    this.addComponent(
      new Dna.Components.Hitcircle({
        radius: RADIUS,
        hurtboxes: hurtboxes,
        onCollisionEnter: hurtbox => {
          this.destroy();

          //audio.play(gunHit);
          hurtbox.gameObject.audio.play(gunHit);

          hurtbox.gameObject.unit.takeDamage(bullet.damage);

          hurtbox.gameObject.unit.knockback(
            this.transform.getCurrentDirection()
          );
        }
      })
    );
  }
}

export { Bullet };
