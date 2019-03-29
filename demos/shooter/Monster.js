class Movement extends Dna.Component {
  constructor(physics, angle) {
    super();

    this.physics = physics;
    this.angle = angle;
  }

  update(deltaTime) {
    this.physics.velocity.angle.radians = this.angle.radians;
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
      this.transform.getDistanceToTransform(this.hero.transform) <=
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
  constructor(hp, hpSlider, spawner) {
    super();

    this.maxHp = hp;
    this.hp = hp;

    this.hpSlider = hpSlider;

    this.spawner = spawner;

    this.setHpText();
  }

  setHpText() {
    //this.hpText.text = this.hp + "/" + this.maxHp;
    this.hpSlider.value = this.hp;
    this.hpSlider.maxValue = this.maxHp;
  }

  takeDamage(damage) {
    this.hp = Math.max(0, this.hp - damage);
    this.setHpText();

    if (this.hp <= 0) {
      this.die();
    }
  }

  die() {
    this.spawner.remove(this.gameObject);
    this.gameObject.destroy();
  }

  knockback(direction) {
    let knockbackPhysics = new Dna.Components.Physics({
      velocity: new Dna.Utilities.Vector(direction, 2),
      maxDistance: 20,
      callback: () => {
        this.gameObject.removeComponent(knockbackPhysics);
      }
    });
    this.gameObject.addComponent(knockbackPhysics);
  }
}

export { Movement, Ai, Monster };
