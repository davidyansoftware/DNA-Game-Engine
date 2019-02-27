import { Component } from "../Component";

class Polygon extends Component {
  constructor(options) {
    super();

    this.vertOffset = [];

    this.updateOptions(options);
  }

  updateOptions(opts) {
    //TODO strokestyle

    opts.radius = opts.radius || 10;
    opts.vert = opts.vert || 0;
    opts.jaggedness = opts.jaggedness || 0;

    opts.strokeStyle = opts.strokeStyle || "black";
    opts.fillStyle = opts.fillStyle || "transparent";

    this.options = opts;

    this.vertOffset = [];
    for (let i = 0; i < opts.vert; i++) {
      this.vertOffset.push(
        Math.random() * opts.jaggedness * 2 + 1 - opts.jaggedness
      );
    }
  }

  render() {
    //TODO cache with dirty flag
    let ctx = this.gameObject.getContext();

    ctx.save();
    ctx.strokeStyle = this.options.strokeStyle;
    ctx.fillStyle = this.options.fillStyle;

    ctx.beginPath();
    if (this.options.vert <= 0) {
      ctx.arc(0, 0, this.options.radius, 0, Math.PI * 2);
    } else {
      ctx.moveTo(
        this.options.radius *
          this.vertOffset[0] *
          Math.cos(this.gameObject.transform.rotation.degrees),
        this.options.radius *
          this.vertOffset[0] *
          Math.sin(this.gameObject.transform.rotation.degrees)
      );
      for (let i = 1; i < this.options.vert; i++) {
        ctx.lineTo(
          this.options.radius *
            this.vertOffset[i] *
            Math.cos(
              this.gameObject.transform.rotation.degrees +
                (i * Math.PI * 2) / this.options.vert
            ),
          this.options.radius *
            this.vertOffset[i] *
            Math.sin(
              this.gameObject.transform.rotation.degrees +
                (i * Math.PI * 2) / this.options.vert
            )
        );
      }
      ctx.closePath();
    }
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }
}

export { Polygon };
