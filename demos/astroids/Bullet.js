class Bullet extends Dna.Component {
  constructor(physics, maxDistance) {
    super();
    this.physics = physics;
    this.distanceTraveled = 0;
    this.maxDistance = maxDistance;
  }

  update(deltaTime) {
    this.distanceTraveled += this.physics.distanceTraveled.total;
    if (this.distanceTraveled >= this.maxDistance) {
      this.gameObject.destroy();
    }
  }
}

export { Bullet };
