class GunState {
  constructor(gunData) {
    this.gunData = gunData;

    this.audio = new Dna.Components.Audio({ volume: 0.1 });

    this.reloading = false;
    this.clipAmmo = gunData.clipSize;
    this.extraAmmo = gunData.extraAmmo;
  }
}

export { GunState };
