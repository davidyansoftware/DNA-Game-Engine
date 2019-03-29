const WIDTH = 100;
const HEIGHT = 10;

class Platform extends Dna.GameObject {
  constructor(parent, position, hurtboxes) {
    super(parent, position, [
      new Dna.Components.Rectangle({ width: WIDTH, height: HEIGHT })
    ]);

    let hitbox = new Dna.Components.Hitbox({
      width: WIDTH,
      height: HEIGHT,
      hurtboxes: hurtboxes,
      onCollision: function(hurtbox) {
        let hurtboxOffset = hurtbox.radius || hurtbox.height / 2;
        let yOffset = this.gameObject.transform.position.y - HEIGHT / 2 - hurtboxOffset;
        //TODO this should be less than, but is still affected by gravity????
        if (hurtbox.gameObject.transform.prevPosition.y <= yOffset) {
          hurtbox.gameObject.transform.position.y = yOffset;
          hurtbox.gameObject.ground();
        }
      },
      onCollisionExit: hurtbox => {
        console.log("onCollisionExit");
        hurtbox.gameObject.unground();
      }
    });
    this.addComponent(hitbox);
  }
}

export { Platform };
