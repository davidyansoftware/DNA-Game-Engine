//import { EnemyComponent } from "./Enemy";
import { Movement, Monster } from "./Monster";
import { UnitAngle } from "./UnitAngle";
import { ImageAngle } from "./ImageAngle";
import slimeUpSheet from "./assets/slime/slime1_back.png";
import slimeDownSheet from "./assets/slime/slime1_front.png";
import slimeLeftSheet from "./assets/slime/slime1_side.png";

const MAX_HP = 100;
const RADIUS = 8;
const SPEED = 1;
const DAMAGE = 10;

//TODO consolidate shared state to 1 object, allow image to read from its own values
let slime_default = {
  width: 16,
  height: 16,
  loop: true,
  numberOfFrames: 4,
  ticksPerFrame: 5
  //framesPerRow: 4
};
let slimeUpImage = new Image();
slimeUpImage.src = slimeUpSheet;
let slimeUp = {
  image: slimeUpImage
};
let slimeDownImage = new Image();
slimeDownImage.src = slimeDownSheet;
let slimeDown = {
  image: slimeDownImage
};
let slimeSideImage = new Image();
slimeSideImage.src = slimeLeftSheet;
let slimeSide = {
  image: slimeSideImage
};

const spriteOptions = [slimeUp, slimeSide, slimeDown, slimeSide];

class Slime extends Dna.GameObject {
  constructor(canvas, position, hero, heroHurtbox, enemyHurtboxes) {
    super(canvas, position, []);

    let image = new Dna.Components.Image(slime_default);
    image.updateOptions(slimeDown);
    new Dna.GameObject(this, {}, [image]);
    //this.addComponent(image);

    let hpText = new Dna.Components.Text({});
    new Dna.GameObject(this, { y: -20 }, [hpText]);

    let hurtbox = new Dna.Components.Hitcircle({
      radius: RADIUS,
      hitboxSet: enemyHurtboxes
    });
    this.addComponent(hurtbox);

    let unitAngle = new UnitAngle(hero);
    this.addComponent(unitAngle);

    this.addComponent(
      new ImageAngle(image, unitAngle.angle, spriteOptions, -1)
    );

    let physics = new Dna.Components.Physics({ speed: SPEED });
    this.addComponent(physics);

    this.addComponent(new Movement(physics, unitAngle.angle));

    this.unit = new Monster(MAX_HP, hpText);
    this.addComponent(this.unit);

    //TODO this logic should be reveresed, onhit should happen on hero, these stored in monsterHitboxes
    //TODO add via component array
    this.addComponent(
      new Dna.Components.Hitcircle({
        radius: RADIUS,
        hurtboxes: heroHurtbox,
        onCollisionEnter: heroHurtbox => {
          hero.unit.takeDamage(10, this);
        }
      })
    );

    this.audio = new Dna.Components.Audio({ volume: 0.1 });
    this.addComponent(this.audio);
  }
}

export { Slime };
