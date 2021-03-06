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
    this.physics.velocity.x = 0;
    this.physics.velocity.y = 0;
    if (this.keyboard.left) {
      this.physics.velocity.x -= 5;
    }
    if (this.keyboard.right) {
      this.physics.velocity.x += 5;
    }
    if (this.keyboard.up) {
      this.physics.velocity.y -= 5;
    }
    if (this.keyboard.down) {
      this.physics.velocity.y += 5;
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

  render(ctx) {
    let absoluteCenter = this.transform.getAbsoluteCenter();
    let dx = this.mouse.position.x - absoluteCenter.x;
    let dy = this.mouse.position.y - absoluteCenter.y;
    this.transform.rotation = new Dna.Utilities.Radians(
      Math.atan2(dy, dx) + Math.PI / 2
    );

    super.render(ctx);
  }
}

export { Body };
