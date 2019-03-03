import { HeroPrefab, heroAssets } from "./HeroPrefab";
import { Boundary, Alignments } from "./Boundary";
import { Slime, SlimeSpawner, slimeAssets } from "./Slime";
import { Crosshair } from "./Crosshair";
import { gunAssets } from "./GunData";

import tileSet from "./assets/tileset.png";

import wSprite from "./assets/controls/w.png";
import aSprite from "./assets/controls/a.png";
import sSprite from "./assets/controls/s.png";
import dSprite from "./assets/controls/d.png";
import tabSprite from "./assets/controls/tab.png";
import rSprite from "./assets/controls/r.png";
import mouseSprite from "./assets/controls/mouse.png";
import leftClickSprite from "./assets/controls/leftclick.png";

let floorImage = new Dna.Dom.Image(tileSet);
let background = new Dna.StaticCanvas(
  document.getElementById("background"),
  [floorImage.load],
  background => {
    new Dna.GameObject(background, {}, [
      new Dna.Components.Image({
        image: floorImage,
        type: Dna.Components.Image.types.randomTiled,
        width: 40,
        height: 8,
        destWidth: 700,
        destHeight: 500,
        xWeight: [0.8, 0.05, 0.05, 0.05, 0.05],
        yWeight: [1]
      })
    ]);
  }
);

//TODO find an elegant way to preload these
let wImage = new Dna.Dom.Image(wSprite);
let aImage = new Dna.Dom.Image(aSprite);
let sImage = new Dna.Dom.Image(sSprite);
let dImage = new Dna.Dom.Image(dSprite);
let tabImage = new Dna.Dom.Image(tabSprite);
let rImage = new Dna.Dom.Image(rSprite);
let mouseImage = new Dna.Dom.Image(mouseSprite);
let leftClickImage = new Dna.Dom.Image(leftClickSprite);
let foreground = new Dna.StaticCanvas(
  document.getElementById("foreground"),
  [
    wImage.load,
    aImage.load,
    sImage.load,
    dImage.load,
    tabImage.load,
    rImage.load,
    mouseImage.load,
    leftClickImage.load
  ],
  foreground => {
    console.log(wImage);

    function getImageOptions(image) {
      return {
        image: image,
        width: 100,
        height: 100,
        destWidth: 30,
        destHeight: 30,
        type: Dna.Components.Image.types.stretched
      };
    }

    let controls = new Dna.GameObject(foreground, { x: -250, y: 160 });

    let moveControls = new Dna.GameObject(controls, { x: -40, y: 30 }, []);
    new Dna.GameObject(moveControls, { y: -25 }, [
      new Dna.Components.Text({ text: "Move" })
    ]);
    new Dna.GameObject(moveControls, { y: -5 }, [
      new Dna.Components.Image(getImageOptions(wImage))
    ]);
    new Dna.GameObject(moveControls, { y: 20, x: -25 }, [
      new Dna.Components.Image(getImageOptions(aImage))
    ]);
    new Dna.GameObject(moveControls, { y: 20 }, [
      new Dna.Components.Image(getImageOptions(sImage))
    ]);
    new Dna.GameObject(moveControls, { y: 20, x: 25 }, [
      new Dna.Components.Image(getImageOptions(dImage))
    ]);

    let shootControls = new Dna.GameObject(controls, { x: -40, y: -30 });
    new Dna.GameObject(shootControls, { x: -25, y: -10 }, [
      new Dna.Components.Text({ text: "Aim" })
    ]);
    new Dna.GameObject(shootControls, { x: -25, y: 10 }, [
      new Dna.Components.Image(getImageOptions(mouseImage))
    ]);
    new Dna.GameObject(shootControls, { x: 25, y: -10 }, [
      new Dna.Components.Text({ text: "Shoot" })
    ]);
    new Dna.GameObject(shootControls, { x: 25, y: 10 }, [
      new Dna.Components.Image(getImageOptions(leftClickImage))
    ]);

    let gunControls = new Dna.GameObject(controls, { x: 40 });
    new Dna.GameObject(gunControls, { y: -35 }, [
      new Dna.Components.Text({ text: "Reload" })
    ]);
    new Dna.GameObject(gunControls, { y: -15 }, [
      new Dna.Components.Image(getImageOptions(rImage))
    ]);
    new Dna.GameObject(gunControls, { y: 15 }, [
      new Dna.Components.Text({ text: "Weapon" })
    ]);
    new Dna.GameObject(gunControls, { y: 35 }, [
      new Dna.Components.Image(getImageOptions(tabImage))
    ]);
    //TODO fix this, dont depend on calling this
    //foreground.renderAll();
  }
);

let canvas = new Dna.Canvas(document.getElementById("canvas"));

function start() {
  let mouse = new Dna.Input.Mouse(canvas);

  let crosshair = new Crosshair(canvas, mouse);

  let ammoTextContainer = new Dna.GameObject(canvas, { x: 300, y: 200 });
  let ammoText = new Dna.Components.Text({});
  new Dna.GameObject(ammoTextContainer, { y: -10 }, [
    new Dna.Components.Text({ text: "AMMO" })
  ]);
  new Dna.GameObject(ammoTextContainer, { y: 10 }, [ammoText]);

  let heroHurtbox = [];
  let enemyHurtboxes = [];

  let hero = new HeroPrefab(
    canvas,
    ammoText,
    mouse,
    crosshair,
    enemyHurtboxes,
    heroHurtbox
  );

  let slimeSpawner = new SlimeSpawner(
    canvas,
    hero,
    heroHurtbox,
    enemyHurtboxes
  );
  slimeSpawner.delayedSpawn();
  /*
  new Slime(canvas, { x: 200, y: 150 }, hero, heroHurtbox, enemyHurtboxes);
  new Slime(canvas, { x: 200, y: -150 }, hero, heroHurtbox, enemyHurtboxes);
  new Slime(canvas, { x: -200, y: 150 }, hero, heroHurtbox, enemyHurtboxes);
  new Slime(canvas, { x: -200, y: -150 }, hero, heroHurtbox, enemyHurtboxes);
  */

  const X_OFFSET = 350;
  const Y_OFFSET = 250;
  const X_LONG = 500;
  const Y_LONG = 700;
  const SHORT = 20;
  let topBoundary = new Boundary(
    canvas,
    Alignments.TOP,
    -Y_OFFSET,
    Y_LONG,
    SHORT,
    heroHurtbox
  );
  let bottomBoundary = new Boundary(
    canvas,
    Alignments.BOTTOM,
    Y_OFFSET,
    Y_LONG,
    SHORT,
    heroHurtbox
  );
  let leftBoundary = new Boundary(
    canvas,
    Alignments.LEFT,
    -X_OFFSET,
    SHORT,
    X_LONG,
    heroHurtbox
  );
  let rightBoundary = new Boundary(
    canvas,
    Alignments.RIGHT,
    X_OFFSET,
    SHORT,
    X_LONG,
    heroHurtbox
  );
}

//TODO load hero and slime images this way
let scene = new Dna.Scene(
  [canvas],
  new Dna.Assets({
    hero: heroAssets,
    slime: slimeAssets,
    guns: gunAssets
  }),
  start
);
scene.load();
