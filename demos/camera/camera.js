let domCanvas = document.getElementById("canvas");
let canvas = new Dna.Canvas(domCanvas);

//TODO remove dependence on otehr canvas
let realCanvas = document.getElementById("realcanvas");

const SPEED = 5;
class Controls extends Dna.Component {
  constructor(physics) {
    super();

    this.physics = physics;

    let keyboardInput = {
      87: "up",
      83: "down",
      65: "left",
      68: "right"
    };
    this.keyboard = new Dna.Input.Keyboard(keyboardInput);
  }

  update(deltaTime) {
    let xv = 0;
    let yv = 0;
    if (this.keyboard.left) xv -= SPEED;
    if (this.keyboard.right) xv += SPEED;
    if (this.keyboard.up) yv -= SPEED;
    if (this.keyboard.down) yv += SPEED;

    this.physics.velocity.x = xv;
    this.physics.velocity.y = yv;
  }
}

//TODO make scene not depend on "canvas" component, just composite gameobjects
let scene = new Dna.Scene([], undefined, start);
scene.load();

function start() {
  new Dna.GameObject(scene, {}, [
    new Dna.Components.Text({ text: "Hello world!" })
  ]);

  let physics = new Dna.Components.Physics();
  new Dna.GameObject(scene, {}, [
    new Dna.Components.Camera({
      root: scene,
      domCanvas: realCanvas
    }),
    physics,
    new Controls(physics)
  ]);
}
