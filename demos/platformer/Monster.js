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
    let distance = this.gameObject.transform.x - this.hero.transform.x;
    if (this.attacking) return;

    if (Math.abs(distance) < this.attackRange) {
      this.gameObject.attack();
    } else {
      //TODO move
      let move = distance > 0 ? -SPEED : SPEED;
      this.gameObject.transform.x += move;
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
    //console.log(this.gameObject.transform);
    let distance = this.gameObject.transform.x - this.hero.transform.x;
    this.imageObject.transform.xScale = distance > 0 ? -1 : 1;
  }
}

export { AI, Facing };