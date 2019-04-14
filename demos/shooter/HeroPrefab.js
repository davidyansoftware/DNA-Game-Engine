import { Hero } from "./Hero";
import { Gun } from "./Gun";
import { UnitAngle } from "./UnitAngle";
import { ImageAngle } from "./ImageAngle";
import { Pistol, Shotgun, Flamethrower } from "./GunData";
//TODO need to impliment idle animation when hero is not moving
//import heroIdleSheet from "./assets/hero/idle.png";
import heroUpSheet from "./assets/hero/up.png";
import heroUpSideSheet from "./assets/hero/upside.png";
import heroSideSheet from "./assets/hero/side.png";
import heroDownSideSheet from "./assets/hero/downside.png";
import heroDownSheet from "./assets/hero/down.png";
let heroUpImage = new Dna.Asset.Image(heroUpSheet);
let heroUpSideImage = new Dna.Asset.Image(heroUpSideSheet);
let heroSideImage = new Dna.Asset.Image(heroSideSheet);
let heroDownSideImage = new Dna.Asset.Image(heroDownSideSheet);
let heroDownImage = new Dna.Asset.Image(heroDownSheet);

let heroAssets = new Dna.Assets({
  up: heroUpImage,
  upSide: heroUpSideImage,
  side: heroSideImage,
  downSide: heroDownSideImage,
  down: heroDownImage
});

const RADIUS = 10;
let hero_default = {
  width: 20,
  height: 24,
  loop: true,
  numberOfFrames: 4,
  ticksPerFrame: 5
  //framesPerRow: 4
};

let heroUp = {
  image: heroUpImage
};
let heroUpSide = {
  image: heroUpSideImage
};
let heroSide = {
  image: heroSideImage
};
let heroDownSide = {
  image: heroDownSideImage
};
let heroDown = {
  image: heroDownImage
};

const spriteOptions = [
  heroUp,
  heroUpSide,
  heroSide,
  heroDownSide,
  heroDown,
  heroDownSide,
  heroSide,
  heroUpSide
];

class HeroPrefab extends Dna.GameObject {
  constructor(
    canvas,
    announcer,
    hpBar,
    gunText,
    ammoText,
    mouse,
    crosshair,
    hurtboxes,
    heroHitbox
  ) {
    super(canvas, {}, []);

    let image = new Dna.Components.Image(hero_default);
    image.updateOptions(heroDown);
    new Dna.GameObject(this, {}, [image]);

    let reloadingText = new Dna.GameObject(this, { y: -20 }, [
      new Dna.Components.Text({ text: "RELOADING" })
    ]);
    reloadingText.setActive(false);

    let hitbox = new Dna.Components.Hitcircle({
      radius: RADIUS,
      hitboxSet: heroHitbox
    });
    this.addComponent(hitbox);

    let unitAngle = new UnitAngle(crosshair);
    this.addComponent(unitAngle);

    this.addComponent(new ImageAngle(image, unitAngle.angle, spriteOptions, 1));

    let gun = new Gun(
      this,
      {},
      crosshair,
      unitAngle.angle,
      hurtboxes,
      gunText,
      ammoText,
      reloadingText
    );

    let physics = new Dna.Components.Physics();
    this.addComponent(physics);

    let audio = new Dna.Components.Audio({ volume: 0.1 });
    this.addComponent(audio);

    this.unit = new Hero(
      image,
      announcer,
      hpBar,
      mouse,
      unitAngle.angle,
      physics,
      gun,
      audio,
      hitbox
    );
    this.addComponent(this.unit);
  }
}

export { HeroPrefab, heroAssets };
