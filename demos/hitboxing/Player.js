import { Hand } from "./Hand";
import { Body } from "./Body";
import { WorldCenter } from "./WorldCenter";

const BODY_RADIUS = 20;
const CENTER_RADIUS = 5;
const LEFT_HAND_OFFSET = { x: -12.5, y: -12.5 };
const RIGHT_HAND_OFFSET = { x: 12.5, y: -12.5 };

class Player extends Dna.GameObject {
  constructor(parent, keyboard, mouse) {
    super(parent, {}, []);

    let physics = new Dna.Components.Physics();
    this.addComponent(physics);

    let body = new Body(physics, keyboard, mouse);
    this.addComponent(body);

    let lHand = new Dna.GameObject(this, LEFT_HAND_OFFSET);
    let rHand = new Dna.GameObject(this, RIGHT_HAND_OFFSET);
    this.leftHand = new Hand(parent, this, LEFT_HAND_OFFSET);
    this.rightHand = new Hand(parent, this, RIGHT_HAND_OFFSET);
    lHand.addComponent(this.leftHand);
    rHand.addComponent(this.rightHand);

    new Dna.GameObject(parent, {}, [new WorldCenter(this)]);
    new Dna.GameObject(parent, {}, [new WorldCenter(lHand)]);
    new Dna.GameObject(parent, {}, [new WorldCenter(rHand)]);
  }
}

export { Player };
