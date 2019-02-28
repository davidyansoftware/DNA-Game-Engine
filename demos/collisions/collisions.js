import { Unit } from "./Unit";
import { Boundary, Alignments } from "./Boundary";

const RADIUS = 20;

let canvas = new Dna.Canvas(document.getElementById("canvas"));

function start() {
  let gravity = new Dna.Components.SimplePhysics({ xy: 5 });

  //TODO handle mouse input
  let circleInput = {
    87: "up",
    83: "down",
    65: "left",
    68: "right"
  };
  let circleKeyboard = new Dna.Input.Keyboard(circleInput);

  let rectInput = {
    38: "up",
    40: "down",
    37: "left",
    39: "right"
  };
  let rectKeyboard = new Dna.Input.Keyboard(rectInput);

  //let hero = new Hero(canvas, {}, circleKeyboard);

  let circle = new Dna.GameObject(canvas, { x: -30 }, [
    new Dna.Components.Polygon({ vert: 0, radius: RADIUS })
  ]);
  let circlePhysics = new Dna.Components.SimplePhysics();
  let circleHeroComponent = new Unit(circleKeyboard, circlePhysics);
  let circleHurtcircle = new Dna.Components.Hitcircle({ radius: RADIUS });
  circle.addComponent(circlePhysics);
  circle.addComponent(circleHeroComponent);
  circle.addComponent(circleHurtcircle);

  let rect = new Dna.GameObject(canvas, { x: 30 }, [
    new Dna.Components.Rectangle({ width: RADIUS * 2, height: RADIUS * 2 })
  ]);
  let rectPhysics = new Dna.Components.SimplePhysics();
  let rectHeroComponent = new Unit(rectKeyboard, rectPhysics);
  let rectHurtbox = new Dna.Components.Hitbox({
    width: RADIUS * 2,
    height: RADIUS * 2
  });
  rect.addComponent(rectPhysics);
  rect.addComponent(rectHeroComponent);
  rect.addComponent(rectHurtbox);

  let circleHitcircle = new Dna.Components.Hitcircle({
    radius: RADIUS,
    hurtboxes: [rectHurtbox],
    onCollision: function(hurtbox) {
      //TODO these should be using absolute positions
      let xOffset = this.radius + hurtbox.width / 2;
      let leftLimit = hurtbox.gameObject.transform.x - xOffset;
      let rightLimit = hurtbox.gameObject.transform.x + xOffset;
      if (
        this.gameObject.transform.prevX <= leftLimit &&
        this.gameObject.transform.x > leftLimit
      ) {
        this.gameObject.transform.x = leftLimit;
      }
      if (
        this.gameObject.transform.prevX >= rightLimit &&
        this.gameObject.transform.x < rightLimit
      ) {
        this.gameObject.transform.x = rightLimit;
      }

      let yOffset = this.radius + hurtbox.height / 2;
      let topLimit = hurtbox.gameObject.transform.y - yOffset;
      let bottomLimit = hurtbox.gameObject.transform.y + yOffset;
      if (
        this.gameObject.transform.prevY <= topLimit &&
        this.gameObject.transform.y > topLimit
      ) {
        this.gameObject.transform.y = topLimit;
      }
      if (
        this.gameObject.transform.prevY >= bottomLimit &&
        this.gameObject.transform.y < bottomLimit
      ) {
        this.gameObject.transform.y = bottomLimit;
      }
    }
  });

  let rectHitbox = new Dna.Components.Hitbox({
    width: RADIUS * 2,
    height: RADIUS * 2,
    hurtboxes: [circleHurtcircle]
  });
  rect.addComponent(rectHitbox);
  circle.addComponent(circleHitcircle);

  //TODO normalize callback by using alignment?? top, bottom, left, right
  const SHORT = 10;
  const LONG = 500;
  const OFFSET = 100;

  let hurtboxes = [circleHurtcircle, rectHurtbox];
  //let hurtboxes = [hero.hurtbox];
  let topBoundary = new Boundary(
    canvas,
    Alignments.TOP,
    -OFFSET,
    LONG,
    SHORT,
    hurtboxes
  );
  let bottomBoundary = new Boundary(
    canvas,
    Alignments.BOTTOM,
    OFFSET,
    LONG,
    SHORT,
    hurtboxes
  );

  let leftBoundary = new Boundary(
    canvas,
    Alignments.LEFT,
    -OFFSET,
    SHORT,
    LONG,
    hurtboxes
  );
  let rightBoundary = new Boundary(
    canvas,
    Alignments.RIGHT,
    OFFSET,
    SHORT,
    LONG,
    hurtboxes
  );
}

let scene = new Dna.Scene([canvas], new Dna.Assets(), start);
scene.load();
