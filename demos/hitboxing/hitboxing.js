import { Player } from "./Player";

let canvas = new Dna.Canvas(document.getElementById("canvas"));

function start() {
  let input = {
    87: "up",
    83: "down",
    65: "left",
    68: "right"
    //up: 87,
    //down: 83,
    //left: 65,
    //right: 68
  };
  let keyboard = new Dna.Input.Keyboard(input);

  function onLeftClick(mouse) {
    player.leftHand.moveTo(mouse.x, mouse.y);
  }
  function onRightClick(mouse) {
    player.rightHand.moveTo(mouse.x, mouse.y);
  }
  let mouse = new Dna.Input.Mouse(canvas, onLeftClick, onRightClick);

  let player = new Player(canvas, keyboard, mouse);
}

let scene = new Dna.Scene([canvas], new Dna.Assets(), start);
scene.load();
