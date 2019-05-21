import { Coordinates } from "../Utilities/Position";

class Mouse {
  constructor(canvas, onLeftClick, onRightClick) {
    this.canvas = canvas;
    //TODO these should be readonly
    //TODO these should be stored as position
    this.position = new Coordinates(0, 0); //TODO should initialize to valid values
    this.leftClick;

    //TODO handle middle and right click
    //TODO handle scroll wheel

    document.addEventListener("mousemove", event => {
      let rect = this.canvas.ctx.canvas.getBoundingClientRect();
      this.position.x =
        event.clientX -
        Math.round(rect.left - 0.5) -
        this.canvas.transform.position.x;
      this.position.y =
        event.clientY -
        Math.round(rect.top - 0.5) -
        this.canvas.transform.position.y;
    });
    document.addEventListener("mousedown", event => {
      this.leftClick = true;
    });
    document.addEventListener("mouseup", event => {
      this.leftClick = false;
    });

    //TODO add onclick listener - iterate through clickables on canvas
    //TODO add a default mouse input on canvas to handle clickable events?
    if (onLeftClick) {
      document.body.addEventListener("click", event => {
        onLeftClick(this);
      });
    }

    if (onRightClick) {
      document.addEventListener("contextmenu", event => {
        event.preventDefault();
        onRightClick(this);
      });
    }
  }
}

export { Mouse };
