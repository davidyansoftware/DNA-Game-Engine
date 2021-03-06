import { Gun } from "./Gun";
import { Bullet } from "./Bullet";

const SPEED = 3;
const CLIP_SIZE = 20;
const TOTAL_AMMO = 100;
const RELOAD_TIME = 2;

class Hero extends Dna.Component {
  constructor(
    image,
    announcer,
    hpBar,
    mouse,
    angle,
    physics,
    gun,
    audio,
    hitbox
  ) {
    super();

    this.keyboard = new Dna.Input.Keyboard({
      87: "up",
      83: "down",
      65: "left",
      68: "right"
    });

    this.image = image;

    this.announcer = announcer;
    this.hpBar = hpBar;

    this.mouse = mouse;
    this.angle = angle;
    this.physics = physics;
    this.gun = gun;
    this.audio = audio;

    this.hitbox = hitbox;

    this.dead = false;
    this.invulnerable = 0;

    this.coordinates = new Dna.Utilities.Coordinates(0, 0);
  }

  takeDamage(damage, source) {
    if (this.invulnerable > 0) return;

    console.log("taking damage: " + damage);
    this.hpBar.value -= damage;

    if (this.hpBar.value <= 0) {
      this.hpBar.value = 0;
      this.dead = true;
      this.physics.velocity.x = 0;
      this.physics.velocity.y = 0;

      this.announcer.text = "GAME OVER";
      this.announcer.gameObject.setActive(true);
    }

    let angle = source.transform.getAngleToTransform(this.transform);

    //TODO angle should be based on the angle the monster hit
    let knockbackPhysics = new Dna.Components.Physics({
      velocity: new Dna.Utilities.Vector(new Dna.Utilities.Radians(angle), 2),
      maxDistance: 20,
      callback: () => {
        this.gameObject.removeComponent(knockbackPhysics);
      }
    });
    this.gameObject.addComponent(knockbackPhysics);

    this.invulnerable = 2;

    this.hitbox.clearCollisions();
  }

  //TODO update this to use regular physics class
  update(deltaTime) {
    if (this.dead) return;

    this.coordinates.x = 0;
    this.coordinates.y = 0;
    if (this.keyboard.left)
      this.coordinates.add(Dna.Utilities.Vector.UNIT_LEFT);
    if (this.keyboard.right)
      this.coordinates.add(Dna.Utilities.Vector.UNIT_RIGHT);
    if (this.keyboard.up) this.coordinates.add(Dna.Utilities.Vector.UNIT_UP);
    if (this.keyboard.down)
      this.coordinates.add(Dna.Utilities.Vector.UNIT_DOWN);

    //TODO control this from gun class, but also disable when dead
    if (this.mouse.leftClick) this.gun.gun.shoot();

    if (this.coordinates.magnitude > 0) {
      this.coordinates.magnitude = SPEED;
      this.image.play = true;
    } else {
      this.image.play = false;
    }
    this.physics.velocity.x = this.coordinates.x;
    this.physics.velocity.y = this.coordinates.y;

    this.cooldown -= deltaTime;
    this.emptyCooldown -= deltaTime;
    this.invulnerable -= deltaTime;

    //TODO use enable/disable for this?
    if (this.invulnerable > 0) {
      let show = this.invulnerable % 0.2 > 0.1;
      this.image.gameObject.active = show;
    } else {
      this.image.gameObject.active = true;
    }
  }

  render() {
    //TODO flash if invulnerable
    super.render();
  }
}

export { Hero };
