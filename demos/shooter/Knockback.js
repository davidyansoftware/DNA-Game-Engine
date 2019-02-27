//TODO this should be a tween of physics
class Knockback extends Dna.Component {
  constructor(physics, maxDistance) {
    super();

    this.physics = physics;
    this.maxDistance = maxDistance;

    this.distanceTraveled = 0;
  }

  update(deltaTime) {
    this.distanceTraveled += this.physics.distanceTraveled.total;
    if (this.distanceTraveled >= this.maxDistance) {
      this.gameObject.removeComponent(this.physics);
      this.gameObject.removeComponent(this);
    }
  }
}

export { Knockback };
