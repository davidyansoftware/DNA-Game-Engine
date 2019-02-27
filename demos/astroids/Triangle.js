//TODO make a path component
class Triangle extends Dna.Component {
  constructor(options) {
    super();

    this.size = options.size || 0;
    this.fill = options.fill;
    this.stroke = options.stroke;

    this.radius = this.size / 2;
  }

  render() {
    let ctx = this.gameObject.getContext();

    ctx.strokeStyle = this.stroke;
    ctx.lineWidth = this.size / 20;
    ctx.beginPath();
    ctx.moveTo(0, -this.radius);
    ctx.lineTo((2 / 3) * this.radius, this.radius);
    ctx.lineTo(-(2 / 3) * this.radius, this.radius);
    ctx.closePath();
    if (this.fill) {
      ctx.fillStyle = this.fill;
      ctx.fill();
    }
    ctx.stroke();
  }
}

export { Triangle };
