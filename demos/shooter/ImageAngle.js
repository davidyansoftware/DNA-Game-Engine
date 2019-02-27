class ImageAngle extends Dna.Component {
  constructor(image, angle, options, defaultXScale) {
    super();

    this.image = image;
    this.angle = angle;
    this.options = options;
    this.defaultXScale = defaultXScale;

    console.log(this.options);
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

    //console.log(this.image.height);
    //console.log(this.image.width);

    this.image.gameObject.transform.xScale =
      angle < Math.PI ? this.defaultXScale : -this.defaultXScale;
  }
}

export { ImageAngle };
