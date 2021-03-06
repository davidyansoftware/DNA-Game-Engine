//import { EnemyComponent } from "./Enemy";
import { Movement, Monster } from "./Monster";
import { UnitAngle } from "./UnitAngle";
import { ImageAngle } from "./ImageAngle";
import slimeUpSheet from "./assets/slime/slime1_back.png";
import slimeDownSheet from "./assets/slime/slime1_front.png";
import slimeLeftSheet from "./assets/slime/slime1_side.png";
let slimeUpImage = new Dna.Asset.Image(slimeUpSheet);
let slimeSideImage = new Dna.Asset.Image(slimeLeftSheet);
let slimeDownImage = new Dna.Asset.Image(slimeDownSheet);

let slimeAssets = new Dna.Assets({
  up: slimeUpImage,
  side: slimeSideImage,
  down: slimeDownImage
});

const RADIUS = 8;
const BASE_HP = 100;
const BASE_SPEED = 1;
const BASE_DAMAGE = 10;
const LEVEL_SCALING = 1.1;

//TODO consolidate shared state to 1 object, allow image to read from its own values
let slime_default = {
  width: 16,
  height: 16,
  loop: true,
  numberOfFrames: 4,
  ticksPerFrame: 5
  //framesPerRow: 4
};
let slimeUp = {
  image: slimeUpImage
};
let slimeSide = {
  image: slimeSideImage
};
let slimeDown = {
  image: slimeDownImage
};

const spriteOptions = [slimeUp, slimeSide, slimeDown, slimeSide];

class Slime extends Dna.GameObject {
  constructor(canvas, position, hero, heroHurtbox, enemyHurtboxes, spawner) {
    super(canvas, position, []);

    let image = new Dna.Components.Image(slime_default);
    image.updateOptions(slimeDown);
    new Dna.GameObject(this, {}, [image]);
    //this.addComponent(image);

    //let hpText = new Dna.Components.Text({});
    let hpSlider = new Dna.Components.Slider({
      width: 25,
      height: 5,
      emptyColor: "gray"
    });
    new Dna.GameObject(this, { y: -15 }, [hpSlider]);

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

    let speed = BASE_SPEED * Math.pow(LEVEL_SCALING, spawner.level);
    let physics = new Dna.Components.Physics({
      velocity: new Dna.Utilities.Vector(new Dna.Utilities.Radians(0), speed)
    });
    this.addComponent(physics);

    this.addComponent(new Movement(physics, unitAngle.angle));

    let maxHp = BASE_HP * Math.pow(LEVEL_SCALING, spawner.level);
    this.unit = new Monster(maxHp, hpSlider, spawner);
    this.addComponent(this.unit);

    //TODO this logic should be reveresed, onhit should happen on hero, these stored in monsterHitboxes
    //TODO add via component array
    let damage = BASE_DAMAGE * Math.pow(LEVEL_SCALING, spawner.level);
    this.addComponent(
      new Dna.Components.Hitcircle({
        radius: RADIUS,
        hurtboxes: heroHurtbox,
        onCollision: heroHurtbox => {
          hero.unit.takeDamage(damage, this);
        }
      })
    );

    this.audio = new Dna.Components.Audio({ volume: 0.1 });
    this.addComponent(this.audio);
  }
}

const spawnPositions = [
  { x: 200, y: 150 },
  { x: 200, y: -150 },
  { x: -200, y: 150 },
  { x: -200, y: -150 }
];

class SlimeSpawner {
  constructor(canvas, announcer, hero, heroHurtbox, enemyHurtboxes) {
    this.canvas = canvas;
    this.announcer = announcer;
    this.hero = hero;
    this.heroHurtbox = heroHurtbox;
    this.enemyHurtboxes = enemyHurtboxes;

    this.level = 0;
    this.monsters = [];
  }

  remove(slime) {
    let index = this.monsters.indexOf(slime);
    this.monsters.splice(index, 1);

    if (this.monsters.length <= 0) {
      this.level++;
      this.delayedSpawn();
    }
  }

  delayedSpawn() {
    setTimeout(() => {
      this.spawn();
    }, 2000);

    this.announcer.text = "LEVEL " + (this.level + 1);
    this.announcer.gameObject.setActive(true);
    setTimeout(() => {
      this.announcer.gameObject.setActive(false);
    }, 2000);
  }

  spawn() {
    for (let position of spawnPositions) {
      this.monsters.push(
        new Slime(
          this.canvas,
          position,
          this.hero,
          this.heroHurtbox,
          this.enemyHurtboxes,
          this
        )
      );
    }
  }
}

export { Slime, SlimeSpawner, slimeAssets };
