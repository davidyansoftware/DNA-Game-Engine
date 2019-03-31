const SPEED = 1;

class AI extends Dna.Component {
  constructor(hero, attackRange) {
    super();

    this.hero = hero;
    //this.physics = physics;
    this.attackRange = attackRange;

    this.attacking = false;
  }

  update(deltaTime) {
    let distance = this.transform.position.x - this.hero.transform.position.x;
    if (this.attacking) return;

    if (Math.abs(distance) < this.attackRange) {
      this.gameObject.attack();
    } else {
      //TODO move
      let move = distance > 0 ? -SPEED : SPEED;
      this.transform.position.x += move;
    }
  }

  attack() {
    this.attacking = true;
  }

  endAttack() {
    this.attacking = false;
  }
}

class Facing extends Dna.Component {
  constructor(hero, imageObject) {
    super();

    this.hero = hero;
    this.imageObject = imageObject;
  }

  update() {
    //console.log(this.transform);
    let distance = this.transform.position.x - this.hero.transform.position.x;
    this.imageObject.transform.scale.x = distance > 0 ? -1 : 1;
  }
}

export { AI, Facing };
