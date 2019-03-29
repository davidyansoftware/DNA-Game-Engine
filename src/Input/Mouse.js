class Mouse {
  constructor(canvas, onLeftClick, onRightClick) {
    this.canvas = canvas;
    //TODO these should be readonly
    this.x = 0;
    this.y = 0;
    //this.leftClick;

    //TODO handle middle and right click
    //TODO handle scroll wheel

    document.addEventListener("mousemove", event => {
      let rect = this.canvas.ctx.canvas.getBoundingClientRect();
      this.x =
        event.clientX - Math.round(rect.left - 0.5) - this.canvas.transform.position.x;
      this.y =
        event.clientY - Math.round(rect.top - 0.5) - this.canvas.transform.position.y;
    });
    document.addEventListener("mousedown", event => {
      this.leftClick = true;
    });
    document.addEventListener("mouseup", event => {
      this.leftClick = false;
    });

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
