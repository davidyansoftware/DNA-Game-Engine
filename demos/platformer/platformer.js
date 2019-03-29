import { Hero, heroAssets } from "./Hero";
import { Boundary, Alignments } from "./Boundary";
import { Platform } from "./Platform";
import { Target } from "./Target";
import { Zombie, zombieAssets } from "./Zombie";

const RADIUS = 20;

let canvas = new Dna.Canvas(document.getElementById("canvas"));

function start() {
  let enemyHurtboxes = [];
  new Target(canvas, { y: 225 }, enemyHurtboxes);

  let hero = new Hero(canvas, {}, enemyHurtboxes);
  let heroHurtboxes = [hero.hurtbox];
  let hurtboxes = [hero.hurtbox];

  let zombie0 = new Zombie(
    canvas,
    { y: -100 },
    hero,
    heroHurtboxes,
    enemyHurtboxes
  );
  hurtboxes.push(zombie0.hurtbox);

  new Platform(canvas, { y: 150, x: -100 }, hurtboxes);
  new Platform(canvas, { y: 150, x: 100 }, hurtboxes);
  new Platform(canvas, { y: 50 }, hurtboxes);

  const SHORT = 10;
  const X_LONG = 500;
  const Y_LONG = 700;
  const X_OFFSET = 350;
  const Y_OFFSET = 250;

  let topBoundary = new Boundary(
    canvas,
    Alignments.TOP,
    -Y_OFFSET,
    Y_LONG,
    SHORT,
    hurtboxes
  );
  let bottomBoundary = new Boundary(
    canvas,
    Alignments.BOTTOM,
    Y_OFFSET,
    Y_LONG,
    SHORT,
    hurtboxes
  );

  let leftBoundary = new Boundary(
    canvas,
    Alignments.LEFT,
    -X_OFFSET,
    SHORT,
    X_LONG,
    hurtboxes
  );
  let rightBoundary = new Boundary(
    canvas,
    Alignments.RIGHT,
    X_OFFSET,
    SHORT,
    X_LONG,
    hurtboxes
  );
}

let scene = new Dna.Scene(
  [canvas],
  new Dna.Assets({
    hero: heroAssets,
    zombie: zombieAssets
  }),
  start
);

scene.load();
