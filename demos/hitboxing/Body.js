const BODY_RADIUS = 20;

//TODO should have independant logic from polygon
class Body extends Dna.Components.Polygon {
  constructor(physics, keyboard, mouse) {
    super({ radius: BODY_RADIUS });

    this.physics = physics;

    this.keyboard = keyboard;
    this.mouse = mouse;

    //this.attached = true;
  }

  update(deltaTime) {
    this.physics.xv = 0;
    this.physics.yv = 0;
    if (this.keyboard.left) {
      this.physics.xv -= 5;
    }
    if (this.keyboard.right) {
      this.physics.xv += 5;
    }
    if (this.keyboard.up) {
      this.physics.yv -= 5;
    }
    if (this.keyboard.down) {
      this.physics.yv += 5;
    }

    /*
    if (this.keyboard.primary) {
      if (player.rightHand.attached) {
        this.rightHand.gameObject.setParent(canvas, true);
      } else {
        this.rightHand.gameObject.setParent(player, true);
      }
      this.rightHand.attached = !attached;
    }
    */

    super.update(deltaTime);
  }

  render() {
    let absoluteCenter = this.gameObject.transform.getAbsoluteCenter();
    let dx = this.mouse.x - absoluteCenter.x;
    let dy = this.mouse.y - absoluteCenter.y;
    this.gameObject.transform.rotation = new Dna.Utilities.Radians(
      Math.atan2(dy, dx) + Math.PI / 2
    );

    super.render();
  }
}

export { Body };
