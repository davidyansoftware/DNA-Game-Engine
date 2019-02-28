import { Component } from "../Component";

const DEFAULT = {
  text: "",
  textAlign: "center",
  textBaseline: "middle",
  fillStyle: "black",
  font: "12px serif"
};

class Text extends Component {
  constructor(options) {
    super();

    this.text = options.text || DEFAULT.text;

    this.textAlign = options.textAlign || DEFAULT.textAlign;
    this.textBaseline = options.textBaseline || DEFAULT.textBaseline;
    this.fillStyle = options.fillStyle || DEFAULT.fillStyle;
    this.font = options.font || DEFAULT.font;
  }

  render(ctx) {
    //let ctx = this.gameObject.getContext();

    ctx.save();
    ctx.font = this.font;
    ctx.fillStyle = this.fillStyle;
    ctx.textAlign = this.textAlign;
    ctx.textBaseline = this.textBaseline;

    ctx.fillText(this.text, 0, 0);
    ctx.restore();
  }
}

export { Text };
