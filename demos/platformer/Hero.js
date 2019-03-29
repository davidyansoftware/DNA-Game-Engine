import heroSprite from "./assets/hero/hero.png";
import heroRunSprite from "./assets/hero/hero_run.png";

let heroImage = new Dna.Asset.Image(heroSprite);
let heroRunImage = new Dna.Asset.Image(heroRunSprite);

let heroAssets = new Dna.Assets({
  hero: heroImage,
  run: heroRunImage
});

const SPRITE_WIDTH = 50;
const SPRITE_HEIGHT = 37;
const WIDTH = 20;
const HEIGHT = 37;

let default_sprite = {
  width: SPRITE_WIDTH,
  height: SPRITE_HEIGHT
};

let hero_run = {
  image: heroRunImage,
  loop: true,

  numberOfFrames: 6,
  ticksPerFrame: 5,

  startingColumn: 0,
  startingRow: 0
};
let hero_idle = {
  image: heroImage,
  loop: true,

  numberOfFrames: 4,
  ticksPerFrame: 5,

  startingColumn: 3,
  startingRow: 5,
  framesPerRow: 7
};

let hero_fall = {
  image: heroImage,
  loop: true,

  numberOfFrames: 2,
  ticksPerFrame: 5,

  startingColumn: 1,
  startingRow: 3,
  framesPerRow: 7
};

let hero_jump = {
  image: heroImage,
  loop: false,
  onFinish: function(image) {
    image.updateOptions(hero_fall);
  },

  numberOfFrames: 7,
  ticksPerFrame: 3,

  startingColumn: 1,
  startingRow: 2,
  framesPerRow: 7,

  frameIndex: 0
};

let hero_slash = {
  image: heroImage,
  loop: false,
  onFinish: function(image) {
    image.updateOptions(hero_slash2);
    image.gameObject.attackingPosition.addComponent(
      image.gameObject.attackingHitbox
    );
  },

  numberOfFrames: 1,
  ticksPerFrame: 5,

  startingColumn: 1,
  startingRow: 6,
  framesPerRow: 7,

  frameIndex: 0
};
let hero_slash2 = {
  image: heroImage,
  loop: false,
  onFinish: function(image) {
    image.updateOptions(hero_slash3);
    image.gameObject.attackingPosition.removeComponent(
      image.gameObject.attackingHitbox
    );
  },

  numberOfFrames: 1,
  ticksPerFrame: 5,

  startingColumn: 2,
  startingRow: 6,
  framesPerRow: 7,

  frameIndex: 0
};
let hero_slash3 = {
  image: heroImage,
  loop: false,
  onFinish: function(image) {
    image.gameObject.finishAttack();
  },

  numberOfFrames: 2,
  ticksPerFrame: 5,

  startingColumn: 3,
  startingRow: 6,
  framesPerRow: 7,

  frameIndex: 0
};

const SPEED = 3;
const JUMP_SPEED = 12;
const GRAVITY = 0.5;

class HeroComponent extends Dna.Component {
  constructor(physics) {
    super();

    //TODO handle mouse input
    let input = {
      //wasd
      //up: 87,
      //down: 83,
      65: "left",
      68: "right",
      32: "jump",
      17: "attack"
      //left: 65,
      //right: 68,
      //jump: 32, // space
      //attack: 17 // ctrl
      //jump: 90, // z
      //attack: 88 // x
      //secondary: 17
    };
    let onKeyDown = {
      32: () => {
        this.jump();
      }
    };
    this.keyboard = new Dna.Input.Keyboard(input, onKeyDown);
    this.physics = physics;

    this.attacking = false;
  }

  update(deltaTime) {
    //console.log(this.gameObject.attackingHitbox);
    //console.log(this.gameObject.attacking, this.gameObject.grounded);

    let x = 0;
    if (this.keyboard.left) x -= 1;
    if (this.keyboard.right) x += 1;
    this.physics.velocity.x = x * SPEED;

    if (x < 0) {
      this.gameObject.transform.xScale = -1;
    } else if (x > 0) {
      this.gameObject.transform.xScale = 1;
    }

    if (!this.gameObject.attacking && this.gameObject.grounded) {
      if (x == 0) {
        this.gameObject.image.updateOptions(hero_idle);
      } else {
        this.gameObject.image.updateOptions(hero_run);
      }
    }

    if (this.keyboard.attack) {
      if (!this.gameObject.attacking) {
        this.gameObject.attack();
      }
    }
  }

  jump() {
    console.log(this);
    if (this.gameObject.grounded) {
      this.physics.velocity.y = -JUMP_SPEED;
      this.gameObject.grounded = false;
      this.gameObject.gravity.active = true;
      //this.gameObject.image.updateOptions(hero_jump);

      //this.gameObject.finishAttack(hero_jump);
      this.gameObject.cancelAttack(hero_jump);
    }
  }
}

import { Unit } from "./Unit";
class Hero extends Unit {
  constructor(parent, position, enemyHurtboxes) {
    super(parent, position, []);

    //this.grounded;
    this.image = new Dna.Components.Image(default_sprite);
    this.image.updateOptions(hero_idle);
    this.addComponent(this.image);

    /*
    this.physics = new Dna.Components.SimplePhysics();
    this.addComponent(this.physics);

    this.gravity = new Dna.Components.Acceleration(this.physics, {
      angle: Dna.Utilities.Degrees.DOWN,
      accel: GRAVITY
    });
    this.addComponent(this.gravity);
    */

    this.hurtbox = new Dna.Components.Hitbox({
      width: WIDTH,
      height: HEIGHT
    });
    this.addComponent(this.hurtbox);

    this.addComponent(new HeroComponent(this.physics));

    // this is not added to the gameObject until the attack is triggered
    this.attackingPosition = new Dna.GameObject(this, { x: 15 });
    this.attackingHitbox = new Dna.Components.Hitbox({
      width: 10,
      height: 20,
      hurtboxes: enemyHurtboxes,
      onCollision: hurtbox => {
        console.log("attack hit!!");
      },
      onCollisionEnter: hurtbox => {
        console.log("enter attack hit!!");
      }
    });
  }

  attack() {
    this.attacking = true;
    console.log("attacking");
    //this.attackingPosition.addComponent(this.attackingHitbox);

    this.image.updateOptions(hero_slash);
    console.log(hero_slash.loop);

    //TODO may want to use a timeout here, instead of animation on finish
    //setTimeout(() => {
    //  this.gameObject.finishAttack();
    //}, 500);
  }
  finishAttack() {
    this.attacking = false;

    //this.attackingPosition.removeComponent(this.attackingHitbox);
    this.attackingHitbox.clearCollisions();

    let nextAnimation = this.grounded
      ? this.physics.velocity.magnitude == 0
        ? hero_idle
        : hero_run
      : hero_fall;
    this.image.updateOptions(nextAnimation);
  }
  cancelAttack(nextAnimation) {
    this.attacking = false;

    this.attackingPosition.removeComponent(this.attackingHitbox);
    this.attackingHitbox.clearCollisions();

    this.image.updateOptions(nextAnimation);
  }
}

export { Hero, heroAssets };
