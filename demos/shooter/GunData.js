import { Bullet } from "./Bullet";
import { Assets } from "../../src/Scene";

import pistolCrosshair from "./assets/crosshairs/pistol.png";
import shotgunCrosshair from "./assets/crosshairs/shotgun.png";
import flamethrowerCrosshair from "./assets/crosshairs/flamethrower.png";
let pistolCrosshairAsset = new Dna.Dom.Image(pistolCrosshair);
let shotgunCrosshairAsset = new Dna.Dom.Image(shotgunCrosshair);
let flamethrowerCrosshairAsset = new Dna.Dom.Image(flamethrowerCrosshair);
let crosshairAssets = new Assets({
  pistol: pistolCrosshairAsset,
  shotgun: shotgunCrosshairAsset,
  flamethrower: flamethrowerCrosshairAsset
});

import pistolShoot from "./assets/sounds/pistol_shoot.wav";
import shotgunShoot from "./assets/sounds/shotgun_shoot.wav";
import flamethrowerShoot from "./assets/sounds/flamethrower_shoot.wav";
import pistolEmpty from "./assets/sounds/gun_empty.wav";
import pistolReload from "./assets/sounds/gun_reload.mp3";

import bulletSprite from "./assets/bullets/bullet.png";
import flameSprite from "./assets/bullets/flame.png";
let bulletImage = new Dna.Dom.Image(bulletSprite);
let flameImage = new Dna.Dom.Image(flameSprite);

let bulletAssets = new Assets({
  bullet: bulletImage,
  flame: flameImage
});

//TODO this forces 1 component onto many objects
let bullet = new Dna.Components.Image({
  width: 6,
  height: 6,
  image: bulletImage
});

import pistolUpSprite from "./assets/pistol/up.png";
import pistolDiagUpSprite from "./assets/pistol/diagup.png";
import pistolSideSprite from "./assets/pistol/side.png";
import pistolDiagDownSprite from "./assets/pistol/diagdown.png";
import pistolDownSprite from "./assets/pistol/down.png";
let pistolUpImage = new Dna.Dom.Image(pistolUpSprite);
let pistolDiagUpImage = new Dna.Dom.Image(pistolDiagUpSprite);
let pistolSideImage = new Dna.Dom.Image(pistolSideSprite);
let pistolDiagDownImage = new Dna.Dom.Image(pistolDiagDownSprite);
let pistolDownImage = new Dna.Dom.Image(pistolDownSprite);

let pistolAssets = new Assets({
  up: pistolUpImage,
  diagUp: pistolDiagUpImage,
  side: pistolSideImage,
  diagDown: pistolDiagDownImage,
  down: pistolDownImage
});

let pistolUp = {
  width: 14,
  height: 12,
  image: pistolUpImage
};
let pistolDiagUp = {
  width: 14,
  height: 12,
  image: pistolDiagUpImage
};
let pistolSide = {
  width: 16,
  height: 8,
  image: pistolSideImage
};
let pistolDiagDown = {
  width: 14,
  height: 11,
  image: pistolDiagDownImage
};
let pistolDown = {
  width: 14,
  height: 12,
  image: pistolDownImage
};

let Pistol = {
  name: "Pistol",
  crosshair: pistolCrosshairAsset,
  shootClip: pistolShoot,
  emptyClip: pistolEmpty,
  reloadClip: pistolReload,
  //bulletImage: bulletImage,
  clipSize: 20,
  extraAmmo: 100,
  cooldown: 0.5,
  //cooldown: 500,
  //default option for ui and initialization?
  spriteOptions: [
    pistolUp,
    pistolDiagUp,
    pistolSide,
    pistolDiagDown,
    pistolDown,
    pistolDiagDown,
    pistolSide,
    pistolDiagUp
  ],
  spread: new Dna.Utilities.Radians(Math.PI / 16),
  generateBullets(gun, hurtboxes) {
    new Bullet(
      gun.getCanvas(),
      gun.transform.getAbsoluteCenter(),
      bullet,
      gun.angle.getNewAngle(this.spread),
      hurtboxes,
      600
    );
  }
};

import shotgunUpSprite from "./assets/shotgun/up.png";
import shotgunDiagUpSprite from "./assets/shotgun/diagup.png";
import shotgunSideSprite from "./assets/shotgun/side.png";
import shotgunDiagDownSprite from "./assets/shotgun/diagdown.png";
import shotgunDownSprite from "./assets/shotgun/down.png";
let shotgunUpImage = new Dna.Dom.Image(shotgunUpSprite);
let shotgunDiagUpImage = new Dna.Dom.Image(shotgunDiagUpSprite);
let shotgunSideImage = new Dna.Dom.Image(shotgunSideSprite);
let shotgunDiagDownImage = new Dna.Dom.Image(shotgunDiagDownSprite);
let shotgunDownImage = new Dna.Dom.Image(shotgunDownSprite);

let shotgunAssets = new Assets({
  up: shotgunUpImage,
  diagUp: shotgunDiagUpImage,
  side: shotgunSideImage,
  diagDown: shotgunDiagDownImage,
  down: shotgunDownImage
});

let shotgunUp = {
  width: 8,
  height: 12,
  image: shotgunUpImage
};
let shotgunDiagUp = {
  width: 14,
  height: 14,
  image: shotgunDiagUpImage
};
let shotgunSide = {
  width: 18,
  height: 9,
  image: shotgunSideImage
};
let shotgunDiagDown = {
  width: 17,
  height: 10,
  image: shotgunDiagDownImage
};
let shotgunDown = {
  width: 8,
  height: 12,
  image: shotgunDownImage
};

let Shotgun = {
  name: "Shotgun",
  crosshair: shotgunCrosshairAsset,
  shootClip: shotgunShoot,
  emptyClip: pistolEmpty,
  reloadClip: pistolReload,
  //bulletImage: bulletImage,
  clipSize: 8,
  extraAmmo: 50,
  cooldown: 1.5,
  //default option for ui and initialization?
  spriteOptions: [
    shotgunUp,
    shotgunDiagUp,
    shotgunSide,
    shotgunDiagDown,
    shotgunDown,
    shotgunDiagDown,
    shotgunSide,
    shotgunDiagUp
  ],
  spread: new Dna.Utilities.Radians(Math.PI / 4),
  generateBullets(gun, hurtboxes) {
    for (let i = 0; i < 4; i++) {
      new Bullet(
        gun.getCanvas(),
        gun.transform.getAbsoluteCenter(),
        bullet,
        gun.angle.getNewAngle(this.spread),
        hurtboxes,
        200
      );
    }
  }
};

import flamethrowerUpSprite from "./assets/flamethrower/up.png";
import flamethrowerDiagUpSprite from "./assets/flamethrower/diagup.png";
import flamethrowerSideSprite from "./assets/flamethrower/side.png";
import flamethrowerDiagDownSprite from "./assets/flamethrower/diagdown.png";
import flamethrowerDownSprite from "./assets/flamethrower/down.png";
let flamethrowerUpImage = new Dna.Dom.Image(flamethrowerUpSprite);
let flamethrowerDiagUpImage = new Dna.Dom.Image(flamethrowerDiagUpSprite);
let flamethrowerSideImage = new Dna.Dom.Image(flamethrowerSideSprite);
let flamethrowerDiagDownImage = new Dna.Dom.Image(flamethrowerDiagDownSprite);
let flamethrowerDownImage = new Dna.Dom.Image(flamethrowerDownSprite);

let flamethrowerAssets = new Assets({
  up: flamethrowerUpImage,
  diagUp: flamethrowerDiagUpImage,
  side: flamethrowerSideImage,
  diagDown: flamethrowerDiagDownImage,
  down: flamethrowerDownImage
});

let flamethrowerUp = {
  width: 14,
  height: 17,
  image: flamethrowerUpImage
};
let flamethrowerDiagUp = {
  width: 16,
  height: 16,
  image: flamethrowerDiagUpImage
};
let flamethrowerSide = {
  width: 26,
  height: 9,
  image: flamethrowerSideImage
};
let flamethrowerDiagDown = {
  width: 19,
  height: 14,
  image: flamethrowerDiagDownImage
};
let flamethrowerDown = {
  width: 14,
  height: 17,
  image: flamethrowerDownImage
};

let Flamethrower = {
  name: "Flamethrower",
  crosshair: flamethrowerCrosshairAsset,
  shootClip: flamethrowerShoot,
  emptyClip: pistolEmpty,
  reloadClip: pistolReload,
  //bulletImage: bulletImage,
  clipSize: 100,
  extraAmmo: 1000,
  cooldown: 0.04,
  //default option for ui and initialization?
  spriteOptions: [
    flamethrowerUp,
    flamethrowerDiagUp,
    flamethrowerSide,
    flamethrowerDiagDown,
    flamethrowerDown,
    flamethrowerDiagDown,
    flamethrowerSide,
    flamethrowerDiagUp
  ],
  spread: new Dna.Utilities.Radians(Math.PI / 6),
  generateBullets(gun, hurtboxes) {
    //console.log(gun);
    //let spread = new Dna.Utilities.Radians(Math.PI / 4);
    //for (let i = 0; i < 4; i++) {
    new Bullet(
      gun.getCanvas(),
      gun.transform.getAbsoluteCenter(),
      new Dna.Components.Image({
        width: 13,
        height: 10,
        image: flameImage,

        ticksPerFrame: 5,
        numberOfFrames: 2
      }),
      gun.angle.getNewAngle(this.spread),
      hurtboxes,
      200
    );
    //}
  }
};

let gunAssets = new Assets({
  crosshairs: crosshairAssets,
  bullets: bulletAssets,
  pistol: pistolAssets,
  shotgun: shotgunAssets,
  flamethrower: flamethrowerAssets
});

export { Pistol, Shotgun, Flamethrower, gunAssets };
