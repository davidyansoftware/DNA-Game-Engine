import { ShipPrefab } from "./ShipPrefab";
import { AstroidPrefab } from "./AstroidPrefab";

const NUM_ASTROIDS = 4;
const ASTROID_SIZE = 100;

let canvas = new Dna.Canvas(document.getElementById("canvas"));

function start() {
  let input = {
    87: "up",
    83: "down",
    65: "left",
    68: "right",
    32: "primary"
    //up: 87,
    //down: 83,
    //left: 65,
    //right: 68,
    //primary: 32
    //secondary: 17
  };
  let keyboard = new Dna.Input.Keyboard(input);

  let level = 0;
  let astroids = [];

  let astroidHurtboxes = [];

  let ship = new ShipPrefab(canvas, keyboard, astroidHurtboxes);
  let shiphurtbox = [ship.hurtbox];

  //TODO function of transform?
  function distBetweenPoints(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  }
  createAstroidBelt(canvas);

  function createAstroidBelt(canvas) {
    astroids = [];
    //astroidsTotal = (NUM_ASTROIDS + level) * 7;
    //astroidsLeft = astroidsTotal;
    let domCanvas = canvas.getContext().canvas;
    let x, y;
    let dist;

    for (let i = 0; i < NUM_ASTROIDS + level; i++) {
      do {
        x = Math.random() * domCanvas.width - domCanvas.width / 2;
        y = Math.random() * domCanvas.height - domCanvas.height / 2;
        //TODO should use absolute distance
        dist = distBetweenPoints(ship.transform.position.x, ship.transform.position.y, x, y);
      } while (dist < ASTROID_SIZE + ship.r);
      astroids.push(
        new AstroidPrefab(
          canvas,
          {
            x: x,
            y: y
          },
          level,
          shiphurtbox,
          astroidHurtboxes
        )
      );
    }
  }
}

let scene = new Dna.Scene([canvas], new Dna.Assets({}), start);
scene.load();
