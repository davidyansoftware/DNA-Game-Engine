const RADIUS = 5;

class WorldCenter extends Dna.Components.Polygon {
  constructor(target) {
    super({ radius: RADIUS });
    this.target = target;
  }

  render(ctx) {
    let absoluteCenter = this.target.transform.getAbsoluteCenter();
    this.gameObject.transform.position.x = absoluteCenter.x;
    this.gameObject.transform.position.y = absoluteCenter.y;

    super.render(ctx);
  }
}

export { WorldCenter };
