//TODO store onhitclip in monsterdata
import gunHit from "./assets/sounds/gun_hit.wav";

const SPEED = 5;
const RADIUS = 2;
//const MAX_DISTANCE = 500;
const DAMAGE = 10;

let audio = new Dna.Components.Audio({ volume: 0.05 });

class Bullet extends Dna.GameObject {
  constructor(parent, position, image, angle, hurtboxes, maxDistance) {
    super(parent, position, []);

    // this is a nested object to handle rotation seperate from physics
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

    //TODO reverse this logic, keep track of bullet array in hero
    this.addComponent(
      new Dna.Components.Hitcircle({
        radius: RADIUS,
        hurtboxes: hurtboxes,
        onCollisionEnter: hurtbox => {
          this.destroy();

          hurtbox.gameObject.audio.play(gunHit);

          hurtbox.gameObject.unit.takeDamage(DAMAGE);

          hurtbox.gameObject.unit.knockback(physics.angle);
        }
      })
    );
  }
}

export { Bullet };
