const TURN_SPEED = 360;

class Ship extends Dna.Component {
  constructor(shipPrefab, keyboard, shootCooldown) {
    super();
    this.shipPrefab = shipPrefab;
    this.keyboard = keyboard;

    this.shootCooldownMax = shootCooldown;
    this.shootCooldown = 0;
  }

  update(deltaTime) {
    this.shootCooldown -= deltaTime;

    if (this.keyboard.left) {
      this.shipPrefab.transform.rotation.addDegrees(-TURN_SPEED * deltaTime);
    }
    if (this.keyboard.right) {
      this.shipPrefab.transform.rotation.addDegrees(TURN_SPEED * deltaTime);
    }
    if (this.keyboard.up) {
      this.shipPrefab.toggleThruster(true);
    } else {
      this.shipPrefab.toggleThruster(false);
    }

    if (this.keyboard.primary && this.canShoot()) {
      this.shipPrefab.shoot();
      this.shootCooldown = this.shootCooldownMax;
    }

    if (this.shipPrefab.thrusting) {
      this.shipPrefab.acceleration.active = true;
      this.shipPrefab.acceleration.angle = new Dna.Utilities.Radians(
        this.shipPrefab.transform.rotation.radians
      );
    } else {
      this.shipPrefab.acceleration.active = false;
    }
  }

  canShoot() {
    return this.shootCooldown < 0;
  }
}

export { Ship };
