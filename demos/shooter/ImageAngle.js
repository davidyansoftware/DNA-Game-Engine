class ImageAngle extends Dna.Component {
  constructor(image, angle, options, defaultXScale) {
    super();

    this.image = image;
    this.angle = angle;
    this.options = options;
    this.defaultXScale = defaultXScale;

    this.offset = Math.PI / this.options.length;
  }

  update(deltaTime) {
    let angle =
      ((this.angle.radians % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    let increment = (Math.PI * 2) / this.options.length;
    let index =
      (Math.floor((angle + this.offset) / increment) + this.options.length) %
      this.options.length;

    this.image.updateOptions(this.options[index]);

    this.image.transform.scale.x =
      angle < Math.PI ? this.defaultXScale : -this.defaultXScale;
  }
}

export { ImageAngle };
