import { Gun } from "./Gun";
import { Bullet } from "./Bullet";
import { Knockback } from "./Knockback";

const SPEED = 3;
const CLIP_SIZE = 20;
const TOTAL_AMMO = 100;
const RELOAD_TIME = 2;

class Hero extends Dna.Component {
  constructor(
    image,
    ammoText,
    reloadingText,
    mouse,
    angle,
    physics,
    hurtboxes,
    gun,
    audio
  ) {
    super();

    this.keyboard = new Dna.Input.Keyboard({
      87: "up",
      83: "down",
      65: "left",
      68: "right"
    });

    this.image = image;

    this.mouse = mouse;
    this.angle = angle;
    this.physics = physics;
    //this.hurtboxes = hurtboxes;
    //TODO dont need this if shooting is handled from gun component
    this.gun = gun;
    this.audio = audio;

    this.invulnerable = 0;

    this.coordinates = new Dna.Utilities.Coordinates(0, 0);
  }

  takeDamage(damage, source) {
    if (this.invulnerable > 0) return;

    console.log("taking damage: " + damage);

    //TODO angle should be based on the angle the monster hit
    let knockbackPhysics = new Dna.Components.Physics({
      angle: source.transform.getCurrentDirection(),
      speed: 2
    });
    this.gameObject.addComponent(knockbackPhysics);
    let knockback = new Knockback(knockbackPhysics, 20);
    this.gameObject.addComponent(knockback);

    this.invulnerable = 0.5;
  }

  //TODO update this to use regular physics class
  update(deltaTime) {
    this.coordinates.x = 0;
    this.coordinates.y = 0;
    if (this.keyboard.left)
      this.coordinates.add(Dna.Utilities.Vector.UNIT_LEFT);
    if (this.keyboard.right)
      this.coordinates.add(Dna.Utilities.Vector.UNIT_RIGHT);
    if (this.keyboard.up) this.coordinates.add(Dna.Utilities.Vector.UNIT_UP);
    if (this.keyboard.down)
      this.coordinates.add(Dna.Utilities.Vector.UNIT_DOWN);

    //TODO control this from gun class
    if (this.mouse.leftClick) this.gun.gun.shoot();

    if (this.coordinates.magnitude > 0) this.coordinates.magnitude = SPEED;
    this.physics.xv = this.coordinates.x;
    this.physics.yv = this.coordinates.y;

    this.cooldown -= deltaTime;
    this.emptyCooldown -= deltaTime;
    this.invulnerable -= deltaTime;
  }

  render() {
    //TODO flash if invulnerable
    super.render();
  }
}

export { Hero };
