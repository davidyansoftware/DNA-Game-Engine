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

const RADIUS = 10;
let hero_default = {
  width: 20,
  height: 24,
  loop: true,
  numberOfFrames: 4,
  ticksPerFrame: 5
  //framesPerRow: 4
};
let heroUpImage = new Image();
heroUpImage.src = heroUpSheet;
let heroUp = {
  image: heroUpImage
};
let heroUpSideImage = new Image();
heroUpSideImage.src = heroUpSideSheet;
let heroUpSide = {
  image: heroUpSideImage
};
let heroSideImage = new Image();
heroSideImage.src = heroSideSheet;
let heroSide = {
  image: heroSideImage
};
let heroDownSideImage = new Image();
heroDownSideImage.src = heroDownSideSheet;
let heroDownSide = {
  image: heroDownSideImage
};
let heroDownImage = new Image();
heroDownImage.src = heroDownSheet;
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
  constructor(canvas, ammoText, mouse, crosshair, hurtboxes, heroHitbox) {
    super(canvas, {}, []);

    let image = new Dna.Components.Image(hero_default);
    image.updateOptions(heroDown);
    let heroImage = new Dna.GameObject(this, {}, [image]);

    let reloadingText = new Dna.GameObject(this, { y: -20 }, [
      new Dna.Components.Text({ text: "RELOADING" })
    ]);
    reloadingText.setActive(false);

    this.addComponent(
      new Dna.Components.Hitcircle({
        radius: RADIUS,
        hitboxSet: heroHitbox
      })
    );

    let unitAngle = new UnitAngle(crosshair);
    this.addComponent(unitAngle);

    this.addComponent(new ImageAngle(image, unitAngle.angle, spriteOptions, 1));

    let gun = new Gun(
      this,
      {},
      unitAngle.angle,
      hurtboxes,
      ammoText,
      reloadingText
    );

    let physics = new Dna.Components.SimplePhysics();
    this.addComponent(physics);

    let audio = new Dna.Components.Audio({ volume: 0.1 });
    this.addComponent(audio);

    this.unit = new Hero(
      heroImage,
      ammoText,
      reloadingText,
      mouse,
      unitAngle.angle,
      physics,
      hurtboxes,
      gun,
      audio
    );
    this.addComponent(this.unit);
  }
}

export { HeroPrefab };
