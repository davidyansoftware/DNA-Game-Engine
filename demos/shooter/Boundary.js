//TODO should not use hitboxes for this, doens't account for condition where unit moves past boundary in single frame
class Boundary extends Dna.GameObject {
  constructor(parent, alignment, offset, width, height, hurtboxes) {
    super(parent, alignment.getPosition(offset), [
      new Dna.Components.Rectangle({ width: width, height: height })
    ]);

    //TODO reverse this logic, use callback on hero to handle collision detection
    this.addComponent(
      new Dna.Components.Hitbox({
        width: width,
        height: height,
        hurtboxes: hurtboxes,
        onCollision: alignment.onCollision
      })
    );
  }
}

let Alignments = {
  TOP: {
    getPosition: offset => {
      return {
        //position: new Dna.Utilities.Coordinates(0, offset)
        y: offset
      };
    },
    onCollision: function(hurtbox) {
      //TODO set absolute
      let offset = hurtbox.radius || hurtbox.height / 2;
      hurtbox.gameObject.transform.position.y =
        this.gameObject.transform.position.y + this.height / 2 + offset;
    }
  },
  BOTTOM: {
    getPosition: offset => {
      return {
        //position: new Dna.Utilities.Coordinates(0, offset)
        y: offset
      };
    },
    onCollision: function(hurtbox) {
      //TODO set absolute
      let offset = hurtbox.radius || hurtbox.height / 2;
      hurtbox.gameObject.transform.position.y =
        this.gameObject.transform.position.y - this.height / 2 - offset;
    }
  },
  LEFT: {
    getPosition: offset => {
      return {
        //position: new Dna.Utilities.Coordinates(offset, 0)
        x: offset
      };
    },
    onCollision: function(hurtbox) {
      //TODO set absolute
      let offset = hurtbox.radius || hurtbox.width / 2;
      hurtbox.gameObject.transform.position.x =
        this.gameObject.transform.position.x + this.width / 2 + offset;
    }
  },
  RIGHT: {
    getPosition: offset => {
      return {
        //position: new Dna.Utilities.Coordinates(offset, 0)
        x: offset
      };
    },
    onCollision: function(hurtbox) {
      //TODO set absolute
      let offset = hurtbox.radius || hurtbox.width / 2;
      hurtbox.gameObject.transform.position.x =
        this.gameObject.transform.position.x - this.width / 2 - offset;
    }
  }
};

export { Boundary, Alignments };
