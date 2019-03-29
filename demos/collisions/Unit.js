const SPEED = 5;

class Unit extends Dna.Component {
  constructor(keyboard, physics) {
    super();

    this.keyboard = keyboard;
    this.physics = physics;
  }

  update(deltaTime) {
    let xv = 0;
    let yv = 0;
    if (this.keyboard.left) xv -= SPEED;
    if (this.keyboard.right) xv += SPEED;
    if (this.keyboard.up) yv -= SPEED;
    if (this.keyboard.down) yv += SPEED;

    this.physics.velocity.x = xv;
    this.physics.velocity.y = yv;
  }
}

export { Unit };
