class UnitAngle extends Dna.Component {
  constructor(target) {
    super();

    this.target = target;

    this.angle = new Dna.Utilities.Radians(0);
  }

  update(deltaTime) {
    this.angle.radians = this.transform.getAngleToTransform(
      this.target.transform
    );
  }
}
export { UnitAngle };
