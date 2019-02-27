//TODO refactor this to have "up, down, etc" and check all the inputs

class Input {
  constructor(canvas, options, handler) {
    this.canvas = canvas;

    this.activeInputs = {};
    this.registeredInputs = {};

    Object.keys(options).forEach(command => {
      this.activeInputs[command] = false;
      this.registerCommand(command, options[command]);
    });

    document.addEventListener("keydown", event => {
      if (this.registeredInputs[event.keyCode]) {
        event.preventDefault();
        if (event.repeat) return;
        this.activeInputs[this.registeredInputs[event.keyCode]] = true;
        handler(this.activeInputs);
      }
    });
    document.addEventListener("keyup", event => {
      if (this.registeredInputs[event.keyCode]) {
        event.preventDefault();
        this.activeInputs[this.registeredInputs[event.keyCode]] = false;
        handler(this.activeInputs);
      }
    });

    //TODO have to redo mouse handlers
    /*
    if (mouseMoveHandler) {
      document.onmousemove = event => {
        //TODO hardcoded, need reference stored
        //let rect = engine.canvases
        //.get("canvas")
        let rect = this.canvas.ctx.canvas.getBoundingClientRect();
        //console.log(engine.canvases.get("canvas"));
        mouseMoveHandler({
          x:
            event.clientX -
            Math.round(rect.left - 0.5) -
            this.canvas.transform.x,
          y:
            event.clientY - Math.round(rect.top - 0.5) - this.canvas.transform.y
        });
      };
    }
    */
    //TODO maybe input should be tied to canvas?
    /*
    if (mouseClickHandler) {
      //TODO bind this to not effect the whole document?
      document.body.addEventListener("click", event => {
        //TODO hardcoded, need reference stored
        //let rect = engine.canvases
        //.get("canvas")
        let rect = this.canvas.ctx.canvas.getBoundingClientRect();
        mouseClickHandler({
          x:
            event.clientX -
            Math.round(rect.left - 0.5) -
            this.canvas.transform.x,
          y:
            event.clientY - Math.round(rect.top - 0.5) - this.canvas.transform.y
        });
      });
    }
    */

    //TODO maybe have an option to remove this, will need to store function names
    /*
        return {
            remove: function() {
                document.removeEventListener("keydown", name);
                document.removeEventListener("keyup", name);
            }
        };
        */
  }
  //TODO bool to handle mouse?

  //TODO maybe allow more params here, interruptable, cancellable
  //TODO maybe allow some granularity in here, defined additional categories by objects
  registerCommand(command, keycode) {
    if (Array.isArray(keycode)) {
      keycode.forEach(function(key) {
        registerCommand(command, key);
      });
    } else {
      this.registeredInputs[keycode] = command;
    }
  }
}

export { Input };
