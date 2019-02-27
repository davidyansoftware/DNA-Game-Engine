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

    this.physics.xv = xv;
    this.physics.yv = yv;
  }
}

/*
class Hero extends Dna.GameObject {
  constructor(parent, position, input) {
    super(parent, position, [
      new Dna.Components.Rectangle({ width: SIZE, height: SIZE })
    ]);

    this.physics = new Dna.Components.SimplePhysics();
    this.addComponent(this.physics);

    this.hurtbox = new Dna.Components.Hitbox({
      width: SIZE,
      height: SIZE
    });
    this.addComponent(this.hurtbox);

    this.addComponent(new HeroComponent(input, this.physics));
  }

  ground() {
    this.grounded = true;

    this.gravity.active = false;
    this.physics.xy = 0;

    console.log("on ground");
  }
}
*/

export { Unit };
