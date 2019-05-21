import { Component } from "../Component";

class Canvas extends Component {
  constructor(options = {}) {
    super();

    this.domCanvas = options.domCanvas;

    //TODO 0 for static, negative for dynamic
    //TODO store deltatime for knowing when to draw
    //TODO by handling rendering via update, we'll never have the option to cap update rate without hurting framerate
    this.maxFrameRate =
      options.maxFrameRate !== undefined ? options.maxFrameRate : -1;
  }

  update(deltaTime) {
    //TODO need to pass this in
    //TODO may want to only renderall children
    this.gameObject.renderAll();
  }
}

export { Canvas };
