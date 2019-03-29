const GRAVITY = 0.5;

// these function are handled as part of the game object for easy access from boundary onCollisions. May want to refactor
class Unit extends Dna.GameObject {
  constructor(parent, position, components) {
    super(parent, position, components);

    this.physics = new Dna.Components.Physics();
    this.addComponent(this.physics);

    this.gravity = new Dna.Components.Acceleration(this.physics, {
      acceleration: new Dna.Utilities.Vector(
        Dna.Utilities.Degrees.DOWN,
        GRAVITY
      )
    });
    this.addComponent(this.gravity);
  }

  ground() {
    this.grounded = true;
    this.gravity.active = false;
    this.physics.velocity.y = 0;
  }

  unground() {
    console.log("UNGROUNDED");

    this.grounded = false;
    this.gravity.active = true;
  }
}

export { Unit };
