import { AI, Facing } from "./Monster";
import girlAttackSprite from "./assets/zombiegirl/attack.png";
import girlWalkSprite from "./assets/zombiegirl/walk.png";

let girlAttackImage = new Dna.Dom.Image(girlAttackSprite);
let girlWalkImage = new Dna.Dom.Image(girlWalkSprite);

let zombieAssets = new Dna.Assets({
  attack: girlAttackImage,
  walk: girlWalkImage
});

const ZOMBIE_DEFAULT = {
  type: Dna.Components.Image.types.stretched,
  width: 521,
  height: 576,
  ticksPerFrame: 10,

  destWidth: 521 / 6,
  destHeight: 576 / 6
};
//let girlAttackImage = new Image();
//girlAttackImage.src = girlAttackSprite;
let girlAttack = {
  image: girlAttackImage,
  loop: false,

  numberOfFrames: 8
};
//let girlWalkImage = new Image();
//girlWalkImage.src = girlWalkSprite;
let girlWalk = {
  image: girlWalkImage,
  loop: true,

  numberOfFrames: 10
};

class Zombie extends Dna.GameObject {
  constructor(canvas, position, hero, heroHurtbox, monsterHurtboxes) {
    super(canvas, position, [new AI(hero, 10)]);

    let image = new Dna.Components.Image(ZOMBIE_DEFAULT);
    image.updateOptions(girlWalk);
    let imageObject = new Dna.GameObject(this, {}, [image]);

    this.addComponent(new Facing(hero, imageObject));
  }

  attack() {
    console.log("attacking");
    //TODO change animation
    //TODO hitboxes
  }
}

export { Zombie, zombieAssets };
