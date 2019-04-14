import { AI, Facing } from "./Monster";
import girlAttackSprite from "./assets/zombiegirl/attack.png";
import girlWalkSprite from "./assets/zombiegirl/walk.png";

let girlAttackImage = new Dna.Asset.Image(girlAttackSprite);
let girlWalkImage = new Dna.Asset.Image(girlWalkSprite);

let zombieAssets = new Dna.Assets({
  attack: girlAttackImage,
  walk: girlWalkImage
});

const WIDTH = 521 / 12;
const HEIGHT = 576 / 12;

const ZOMBIE_DEFAULT = {
  type: Dna.Components.Image.types.stretched,
  width: 521,
  height: 576,
  ticksPerFrame: 10,

  destWidth: WIDTH,
  destHeight: HEIGHT
};
let girlAttack = {
  image: girlAttackImage,
  loop: false,

  numberOfFrames: 8
};
let girlWalk = {
  image: girlWalkImage,
  loop: true,

  numberOfFrames: 10
};

import { Unit } from "./Unit";
class Zombie extends Unit {
  constructor(canvas, position, hero, heroHurtbox, monsterHurtboxes) {
    super(canvas, position, [new AI(hero, 10)]);

    let image = new Dna.Components.Image(ZOMBIE_DEFAULT);
    image.updateOptions(girlWalk);
    let imageObject = new Dna.GameObject(this, {}, [image]);

    this.addComponent(new Facing(hero, imageObject));

    this.hurtbox = new Dna.Components.Hitbox({
      width: WIDTH,
      height: HEIGHT
    });
    this.addComponent(this.hurtbox);
  }

  attack() {
    console.log("attacking");
    //TODO change animation
    //TODO hitboxes
  }
}

export { Zombie, zombieAssets };
