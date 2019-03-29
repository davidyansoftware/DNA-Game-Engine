const TURN_SPEED = 360;

class Ship extends Dna.Component {
  constructor(shipPrefab, keyboard, shootCooldown) {
    super();
    this.shipPrefab = shipPrefab;
    this.keyboard = keyboard;

    this.shootCooldownMax = shootCooldown;
    this.shootCooldown = 0;

    this.turningAngle = new Dna.Utilities.Degrees(0);
  }

  update(deltaTime) {
    this.shootCooldown -= deltaTime;

    this.turningAngle.degrees = TURN_SPEED * deltaTime;

    if (this.keyboard.left) {
      this.shipPrefab.transform.rotation.subtract(this.turningAngle);
    }
    if (this.keyboard.right) {
      this.shipPrefab.transform.rotation.add(this.turningAngle);
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
      console.log(this.shipPrefab.transform.rotation.radians);
      this.shipPrefab.acceleration.acceleration.angle = new Dna.Utilities.Radians(
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
