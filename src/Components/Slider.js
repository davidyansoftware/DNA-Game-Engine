import { Component } from "../Component";

class Slider extends Component {
  constructor(options) {
    super();

    this.height = options.height !== undefined ? options.height : 100;
    this.width = options.width !== undefined ? options.width : 20;

    this.value = options.value !== undefined ? options.value : 100;
    this.maxValue = options.maxValue !== undefined ? options.maxValue : 100;

    this.fillColor =
      options.fillColor !== undefined ? options.fillColor : "red";
    this.emptyColor =
      options.emptyColor !== undefined ? options.emptyColor : "grey";
  }

  render(ctx) {
    let fillPercent = this.value / this.maxValue;

    ctx.fillStyle = this.emptyColor;
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.fillStyle = this.fillColor;
    ctx.fillRect(
      -this.width / 2,
      -this.height / 2,
      this.width * fillPercent,
      this.height * fillPercent
    );
  }
}

export { Slider };
