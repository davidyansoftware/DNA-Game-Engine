import { Bullet } from "./Bullet";
import pistolUpSprite from "./assets/pistol/up.png";
import pistolDiagUpSprite from "./assets/pistol/diagup.png";
import pistolSideSprite from "./assets/pistol/side.png";
import pistolDiagDownSprite from "./assets/pistol/diagdown.png";
import pistolDownSprite from "./assets/pistol/down.png";
import pistolShoot from "./assets/sounds/pistol_shoot.wav";
import pistolEmpty from "./assets/sounds/gun_empty.wav";
import pistolReload from "./assets/sounds/gun_reload.mp3";
import bulletSprite from "./assets/bullets/bullet.png";

let pistolUpImage = new Image();
pistolUpImage.src = pistolUpSprite;
let pistolUp = {
  width: 14,
  height: 12,
  image: pistolUpImage
};
let pistolDiagUpImage = new Image();
pistolDiagUpImage.src = pistolDiagUpSprite;
let pistolDiagUp = {
  width: 14,
  height: 12,
  image: pistolDiagUpImage
};
let pistolSideImage = new Image();
pistolSideImage.src = pistolSideSprite;
let pistolSide = {
  width: 16,
  height: 8,
  image: pistolSideImage
};
let pistolDiagDownImage = new Image();
pistolDiagDownImage.src = pistolDiagDownSprite;
let pistolDiagDown = {
  width: 14,
  height: 11,
  image: pistolDiagDownImage
};
let pistolDownImage = new Image();
pistolDownImage.src = pistolDownSprite;
let pistolDown = {
  width: 14,
  height: 12,
  image: pistolDownImage
};

let bulletImage = new Image();
bulletImage.src = bulletSprite;
let bullet = new Dna.Components.Image({
  width: 6,
  height: 6,
  image: bulletImage
});

let Pistol = {
  name: "Pistol",
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
  spread: new Dna.Utilities.Radians(Math.PI / 8),
  generateBullets(gun, hurtboxes) {
    new Bullet(
      gun.getCanvas(),
      gun.transform.getAbsoluteCenter(),
      bullet,
      //new Dna.Utilities.Radians(gun.angle.radians),
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
import shotgunShoot from "./assets/sounds/shotgun_shoot.wav";

let shotgunUpImage = new Image();
shotgunUpImage.src = shotgunUpSprite;
let shotgunUp = {
  width: 8,
  height: 12,
  image: shotgunUpImage
};
let shotgunDiagUpImage = new Image();
shotgunDiagUpImage.src = shotgunDiagUpSprite;
let shotgunDiagUp = {
  width: 14,
  height: 14,
  image: shotgunDiagUpImage
};
let shotgunSideImage = new Image();
shotgunSideImage.src = shotgunSideSprite;
let shotgunSide = {
  width: 18,
  height: 9,
  image: shotgunSideImage
};
let shotgunDiagDownImage = new Image();
shotgunDiagDownImage.src = shotgunDiagDownSprite;
let shotgunDiagDown = {
  width: 17,
  height: 10,
  image: shotgunDiagDownImage
};
let shotgunDownImage = new Image();
shotgunDownImage.src = shotgunDownSprite;
let shotgunDown = {
  width: 8,
  height: 12,
  image: shotgunDownImage
};

let Shotgun = {
  name: "Shotgun",
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
import flameSprite from "./assets/bullets/flame.png";
import flamethrowerShoot from "./assets/sounds/flamethrower_shoot.wav";

let flamethrowerUpImage = new Image();
flamethrowerUpImage.src = flamethrowerUpSprite;
let flamethrowerUp = {
  width: 14,
  height: 17,
  image: flamethrowerUpImage
};
let flamethrowerDiagUpImage = new Image();
flamethrowerDiagUpImage.src = flamethrowerDiagUpSprite;
let flamethrowerDiagUp = {
  width: 16,
  height: 16,
  image: flamethrowerDiagUpImage
};
let flamethrowerSideImage = new Image();
flamethrowerSideImage.src = flamethrowerSideSprite;
let flamethrowerSide = {
  width: 26,
  height: 9,
  image: flamethrowerSideImage
};
let flamethrowerDiagDownImage = new Image();
flamethrowerDiagDownImage.src = flamethrowerDiagDownSprite;
let flamethrowerDiagDown = {
  width: 19,
  height: 14,
  image: flamethrowerDiagDownImage
};
let flamethrowerDownImage = new Image();
flamethrowerDownImage.src = flamethrowerDownSprite;
let flamethrowerDown = {
  width: 14,
  height: 17,
  image: flamethrowerDownImage
};

let flameImage = new Image();
flameImage.src = flameSprite;

let Flamethrower = {
  name: "Flamethrower",
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

export { Pistol, Shotgun, Flamethrower };
