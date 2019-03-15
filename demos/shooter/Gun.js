import { ImageAngle } from "./ImageAngle";
import { GunState } from "./GunState";
import { Pistol, Shotgun, Flamethrower } from "./GunData";
import weaponSwapClip from "./assets/sounds/weapon_swap.mp3";

const RELOAD_TIME = 2;
const EMPTY_COOLDOWN = 0.5;
const GUN_STATES = [
  new GunState(Pistol),
  new GunState(Shotgun),
  new GunState(Flamethrower)
];

class GunComponent extends Dna.Component {
  constructor(
    crosshair,
    gunText,
    ammoText,
    reloadingText,
    gunImage,
    hurtboxes
  ) {
    super();

    this.crosshair = crosshair;
    this.gunText = gunText;
    this.ammoText = ammoText;
    this.reloadingText = reloadingText;
    this.gunImage = gunImage;
    this.hurtboxes = hurtboxes;

    this.cooldown = 0;
    this.emptyCooldown = 0;
    //this.reloading = false;
    this.reloading = 0;

    this.gunIndex = 0;
    this.gunState = GUN_STATES[this.gunIndex];

    this.audio = new Dna.Components.Audio({ volume: 0.1 });
    this.keyboard = new Dna.Input.Keyboard(
      {},
      {
        82: () => {
          this.reload();
        },
        9: () => {
          this.changeWeapon();
        }
      }
    );

    this.updateGunText();
    this.updateAmmoText();
  }

  update(deltaTime) {
    this.cooldown -= deltaTime;
    this.emptyCooldown -= deltaTime;
    if (this.reloading > 0) {
      this.reloading -= deltaTime;
      if (this.reloading <= 0) {
        this.finishReload();
      }
    }
  }

  shoot() {
    if (this.cooldown > 0) return;
    if (this.reloading > 0) return;
    if (this.gunState.clipAmmo <= 0) {
      if (this.emptyCooldown <= 0) {
        this.emptyCooldown = EMPTY_COOLDOWN;
        this.audio.play(this.gunState.gunData.emptyClip);
      }
      return;
    }

    this.gunState.gunData.generateBullets(this.gameObject, this.hurtboxes);
    this.audio.play(this.gunState.gunData.shootClip);

    this.gunState.clipAmmo--;
    this.cooldown = this.gunState.gunData.cooldown;

    this.updateAmmoText();
  }

  reload() {
    if (this.gunState.clipAmmo >= this.gunState.gunData.clipSize) return;
    if (this.gunState.extraAmmo <= 0) return;
    if (this.reloading > 0) return;

    this.reloading = RELOAD_TIME;
    this.reloadingText.setActive(true);

    this.audio.play(this.gunState.gunData.reloadClip);
  }

  stopReload() {
    this.reloading = 0;
    this.reloadingText.setActive(false);
  }

  finishReload() {
    let totalAmmo = this.gunState.clipAmmo + this.gunState.extraAmmo;
    this.gunState.clipAmmo = Math.min(
      totalAmmo,
      this.gunState.gunData.clipSize
    );
    this.gunState.extraAmmo = Math.max(0, totalAmmo - this.gunState.clipAmmo);

    this.stopReload();
    this.updateAmmoText();
  }

  changeWeapon(gunState) {
    this.stopReload();

    this.gunIndex = (this.gunIndex + 1) % GUN_STATES.length;
    this.gunState = GUN_STATES[this.gunIndex];

    this.audio.play(weaponSwapClip);

    this.gunImage.options = this.gunState.gunData.spriteOptions;

    this.updateGunText();
    this.updateAmmoText();
  }

  updateGunText() {
    this.crosshair.image.image = this.gunState.gunData.crosshair;
    this.gunText.text = this.gunState.gunData.name;
  }

  updateAmmoText() {
    this.ammoText.text = this.gunState.clipAmmo + "/" + this.gunState.extraAmmo;
  }
}

class GunPosition extends Dna.Component {
  constructor(angle) {
    super();

    //TODO just set this transform.position to be this
    this.angle = angle;
    this.position = new Dna.Utilities.Vector(angle, 10);
  }

  update(deltaTime) {
    // change transform based on angle
    this.gameObject.transform.x = this.position.x;
    this.gameObject.transform.y = this.position.y;
  }
}

class Gun extends Dna.GameObject {
  constructor(
    parent,
    position,
    crosshair,
    angle,
    hurtboxes,
    gunText,
    ammoText,
    reloadingText
  ) {
    console.log(parent);
    super(parent, position, []);

    this.angle = angle;

    let image = new Dna.Components.Image(
      GUN_STATES[0].gunData.spriteOptions[0]
    );
    new Dna.GameObject(this, {}, [image]);

    this.gunImage = new ImageAngle(
      image,
      angle,
      GUN_STATES[0].gunData.spriteOptions,
      1
    );
    this.addComponent(this.gunImage);

    this.addComponent(new GunPosition(angle));

    this.gun = new GunComponent(
      crosshair,
      gunText,
      ammoText,
      reloadingText,
      this.gunImage,
      hurtboxes
    );
    this.addComponent(this.gun);
  }
}

export { Gun };
