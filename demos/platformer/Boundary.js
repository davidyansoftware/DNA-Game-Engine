//TODO should not use hitboxes for this, doens't account for condition where unit moves past boundary in single frame
//TODO axis-aligned bounding box
class Boundary extends Dna.GameObject {
  constructor(parent, alignment, offset, width, height, hurtboxes) {
    super(parent, alignment.getPosition(offset), [
      new Dna.Components.Rectangle({ width: width, height: height })
    ]);

    let hitbox = new Dna.Components.Hitbox({
      width: width,
      height: height,
      hurtboxes: hurtboxes,
      onCollision: alignment.onCollision
    });
    this.addComponent(hitbox);
  }
}

//TODO this offset logic is jank
let Alignments = {
  TOP: {
    getPosition: offset => {
      return { y: offset };
    },
    onCollision: function(hurtbox) {
      //TODO set absolute
      let offset = hurtbox.radius || hurtbox.height / 2;
      hurtbox.transform.position.y =
        this.transform.position.y + this.height / 2 + offset;
      console.log("collision detected");
    }
  },
  BOTTOM: {
    getPosition: offset => {
      return { y: offset };
    },
    onCollision: function(hurtbox) {
      //TODO set absolute
      let offset = hurtbox.radius || hurtbox.height / 2;
      hurtbox.transform.position.y =
        this.transform.position.y - this.height / 2 - offset;
      hurtbox.gameObject.ground();
    },
    onCollisionExit: hurtbox => {
      console.log("onCollisionExit");
      hurtbox.gameObject.unground();
    }
  },
  LEFT: {
    getPosition: offset => {
      return { x: offset };
    },
    onCollision: function(hurtbox) {
      //TODO set absolute
      let offset = hurtbox.radius || hurtbox.width / 2;
      hurtbox.transform.position.x =
        this.transform.position.x + this.width / 2 + offset;
    }
  },
  RIGHT: {
    getPosition: offset => {
      return { x: offset };
    },
    onCollision: function(hurtbox) {
      //TODO set absolute
      let offset = hurtbox.radius || hurtbox.width / 2;
      hurtbox.transform.position.x =
        this.transform.position.x - this.width / 2 - offset;
    }
  }
};

export { Boundary, Alignments };
