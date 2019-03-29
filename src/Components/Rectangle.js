import { Component } from "../Component";

class Rectangle extends Component {
  constructor(options) {
    super();

    this.height = options.height;
    this.width = options.width;
  }

  render(ctx) {
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
  }
}

export { Rectangle };
