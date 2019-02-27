import { Knockback } from "./Knockback";

class Movement extends Dna.Component {
  constructor(physics, angle) {
    super();

    this.physics = physics;
    this.angle = angle;
  }

  update(deltaTime) {
    this.physics.angle.radians = this.angle.radians;
  }
}

//TODO need to test this
class Ai extends Dna.Component {
  constructor(hero, range, cooldown, attack) {
    super();

    this.range = range;
    this.cooldown = 0;
  }

  canAttack() {
    if (this.cooldown > 0 || this.range <= 0) return false;

    return (
      this.gameObject.transform.getDistanceToTransform(this.hero.transform) <=
      this.range
    );
  }

  attack() {
    //TODO
    // call callback
    // set cooldown
  }
}

class Monster extends Dna.Component {
  constructor(hp, hpText) {
    super();

    this.maxHp = hp;
    this.hp = hp;

    this.hpText = hpText;

    this.setHpText();
  }

  setHpText() {
    this.hpText.text = this.hp + "/" + this.maxHp;
  }

  takeDamage(damage) {
    this.hp = Math.max(0, this.hp - damage);
    this.setHpText();

    if (this.hp <= 0) {
      this.gameObject.destroy();
    }
  }

  knockback(direction) {
    let knockbackPhysics = new Dna.Components.Physics({
      angle: direction,
      speed: 2
    });
    this.gameObject.addComponent(knockbackPhysics);
    let knockback = new Knockback(knockbackPhysics, 20);
    this.gameObject.addComponent(knockback);
  }
}

export { Movement, Ai, Monster };
