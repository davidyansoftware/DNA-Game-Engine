const RADIUS = 10;
const SPEED = 10;

class Hand extends Dna.Components.Polygon {
  constructor(canvas, body, handOffsets) {
    super({ radius: RADIUS });

    this.canvas = canvas;
    this.body = body;
    this.handOffsets = handOffsets;
    this.attached = true;
  }

  update(deltaTime) {
    //TODO abstract this to another component
    if (this.target) {
      let target = this.target();
      if (this.gameObject.transform.moveTo(target.x, target.y, SPEED)) {
        this.callback();
      }
    }
    super.update(deltaTime);
  }

  moveTo(x, y) {
    this.gameObject.setParent(this.canvas, true);
    this.attached = false;
    this.target = function() {
      return {
        x: x,
        y: y
      };
    };
    this.callback = this.comeBack;
  }

  comeBack() {
    //let self = this;
    this.target = () => {
      return this.body.transform.getAbsolutePosition(
        this.handOffsets.x,
        this.handOffsets.y
      );
    };
    this.callback = this.reattach;
  }

  reattach() {
    this.gameObject.setParent(this.body);
    this.gameObject.transform.x = this.handOffsets.x;
    this.gameObject.transform.y = this.handOffsets.y;
    this.attached = true;
    this.target = null;
    this.callback = null;
  }
}

export { Hand };
