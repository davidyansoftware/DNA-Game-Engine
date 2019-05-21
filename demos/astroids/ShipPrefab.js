import { Triangle } from "./Triangle";
import { Ship } from "./Ship";
import { Rollover } from "./Rollover";
import { BulletPrefab } from "./BulletPrefab";

const SHIP_COLOR = "black";
const SHIP_SIZE = 30;
const SHIP_DRAG = 0.01;
const TURN_SPEED = 360; // degrees per second
const SHIP_RADIUS = SHIP_SIZE / 2;
const SHIP_THRUST = 0.1;
const SHOOT_COOLDOWN = 0.5;

class ShipPrefab extends Dna.GameObject {
  constructor(parent, keyboard, astroidHurtboxes) {
    super(parent, {}, [
      new Triangle({ size: SHIP_SIZE, stroke: SHIP_COLOR }),
      new Rollover(SHIP_RADIUS)
      //new Dna.Components.Text({ text: "shipship" })
    ]);

    this.ship = new Ship(this, keyboard, SHOOT_COOLDOWN);
    this.addComponent(this.ship);

    let physics = new Dna.Components.Physics();
    this.addComponent(physics);

    this.acceleration = new Dna.Components.Acceleration(physics, {
      acceleration: new Dna.Utilities.Vector(
        Dna.Utilities.Degrees.DOWN,
        SHIP_THRUST
      ),
      drag: SHIP_DRAG
    });
    this.addComponent(this.acceleration);

    this.hurtbox = new Dna.Components.Hitcircle({ radius: SHIP_RADIUS });
    this.addComponent(this.hurtbox);

    this.thrusting = false;
    this.thruster = new Dna.GameObject(this, { y: SHIP_SIZE * 0.75 }, [
      new Triangle({
        size: SHIP_RADIUS,
        stroke: "yellow",
        fill: "red"
      })
    ]);
    this.thruster.setActive(false);

    this.astroidHurtboxes = astroidHurtboxes;
  }

  toggleThruster(thrusterToggle) {
    this.thrusting = thrusterToggle;
    this.thruster.setActive(thrusterToggle);
  }

  shoot() {
    let radians = this.transform.rotation.radians;
    let bullet = new BulletPrefab(
      this.parent,
      {
        x:
          this.transform.position.x + (4 / 3) * SHIP_RADIUS * Math.sin(radians),
        y: this.transform.position.y - (4 / 3) * SHIP_RADIUS * Math.cos(radians)
      },
      new Dna.Utilities.Radians(this.transform.rotation.radians),
      //radians,
      this.astroidHurtboxes
    );
  }

  die() {
    //TODO explode, remove a life, sound, etc
    console.log("ship dying");
  }
}

export { ShipPrefab };
