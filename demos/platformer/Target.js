const SIZE = 20;

//TODO should have a physics component to prevent it from falling through the floor
class Target extends Dna.GameObject {
  constructor(parent, position, enemyHurtboxes) {
    super(parent, position, [
      new Dna.Components.Rectangle({ width: SIZE, height: SIZE }),
      new Dna.Components.Hitbox({
        width: SIZE,
        height: SIZE,
        hitboxSet: enemyHurtboxes
      })
    ]);
  }
}

export { Target };
