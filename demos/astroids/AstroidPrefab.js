import { Rollover } from "./Rollover";
import { Astroid } from "./Astroid";

const ASTROID_SPEED = 5; // max starting speed
const ASTROID_VERT = 10; // average num of verticies on each astroid
const ASTROID_JAG = 0.4; // jaggedness of astroids
const ASTROID_POINTS_LARGE = 20;
const ASTROID_POINTS_MEDIUM = 50;
const ASTROID_POINTS_SMALL = 100;

const ASTROID_LARGE = 50;
const ASTROID_MEDIUM = 25;
const ASTROID_SMALL = 12;

class AstroidPrefab extends Dna.GameObject {
  constructor(
    parent,
    position,
    level,
    shipHurtbox,
    astroidHurtboxes,
    r = ASTROID_LARGE
  ) {
    let levelMultiplier = 1 + 0.1 * level;
    super(parent, position, [
      new Dna.Components.Polygon({
        radius: r,
        vert: Math.floor(Math.random() * (ASTROID_VERT + 1) + ASTROID_VERT / 2),
        jaggedness: ASTROID_JAG
      }),
      new Dna.Components.Hitcircle({
        radius: r,
        hurtboxes: shipHurtbox,
        hitboxSet: astroidHurtboxes,
        onCollisionEnter: ship => {
          ship.gameObject.die();
        }
      }),
      //TODO regular physics class would make more sense here
      new Dna.Components.SimplePhysics({
        xv: (Math.random() - 0.5) * ASTROID_SPEED * levelMultiplier,
        yv: (Math.random() - 0.5) * ASTROID_SPEED * levelMultiplier
      }),
      new Rollover(r)
    ]);
    let astroid = new Astroid(this);
    this.addComponent(astroid);

    this.r = r; //TODO store as size??

    this.level = level;

    this.shipHurtbox = shipHurtbox;
    this.astroidHurtboxes = astroidHurtboxes;

    this.hurtbox = new Dna.Components.Hitcircle({ radius: r });
    this.addComponent(this.hurtbox);
  }

  //TODO this should be in astroids component, need way to access
  destroyAstroid() {
    let points = 0;
    if (this.r == ASTROID_LARGE) {
      new AstroidPrefab(
        this.parent,
        { x: this.transform.x, y: this.transform.y },
        this.level,
        this.shipHurtbox,
        this.astroidHurtboxes,
        ASTROID_MEDIUM
      );
      new AstroidPrefab(
        this.parent,
        { x: this.transform.x, y: this.transform.y },
        this.level,
        this.shipHurtbox,
        this.astroidHurtboxes,
        ASTROID_MEDIUM
      );
      points = ASTROID_POINTS_LARGE;
    } else if (this.r == ASTROID_MEDIUM) {
      new AstroidPrefab(
        this.parent,
        { x: this.transform.x, y: this.transform.y },
        this.level,
        this.shipHurtbox,
        this.astroidHurtboxes,
        ASTROID_SMALL
      );
      new AstroidPrefab(
        this.parent,
        { x: this.transform.x, y: this.transform.y },
        this.level,
        this.shipHurtbox,
        this.astroidHurtboxes,
        ASTROID_SMALL
      );
      points = ASTROID_POINTS_MEDIUM;
    } else {
      points = ASTROID_POINTS_SMALL;
    }

    //TODO check victory condition

    return points;
  }
}

export { AstroidPrefab };
