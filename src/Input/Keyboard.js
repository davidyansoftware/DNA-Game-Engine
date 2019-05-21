//TODO maybe just constantly maintain all possible keyboard inputs (like mouse)
class Keyboard {
  //TODO consolidate these
  constructor(options, onKeyDown = {}, onKeyUp = {}) {
    this.activeInputs = {};
    this.registeredInputs = {};

    this.onKeyDown = onKeyDown;
    this.onKeyUp = onKeyUp;

    Object.keys(options).forEach(keyCode => {
      this.activeInputs[options[keyCode]] = false;
      this.registerCommand(keyCode, options[keyCode]);
    });

    document.addEventListener("keydown", event => {
      if (this.registeredInputs[event.keyCode]) {
        event.preventDefault();
        if (event.repeat) return;
        this.activeInputs[this.registeredInputs[event.keyCode]] = true;
      }
      if (this.onKeyDown[event.keyCode]) {
        event.preventDefault();
        if (event.repeat) return;
        this.onKeyDown[event.keyCode]();
      }
    });
    document.addEventListener("keyup", event => {
      if (this.registeredInputs[event.keyCode]) {
        event.preventDefault();
        this.activeInputs[this.registeredInputs[event.keyCode]] = false;
      }
      if (this.onKeyUp[event.keyCode]) {
        event.preventDefault();
        this.onKeyUp[event.keyCode]();
      }
    });

    return this.activeInputs;
  }

  //TODO maybe allow more params here, interruptable, cancellable
  //TODO maybe allow some granularity in here, defined additional categories by objects
  registerCommand(keycode, command) {
    if (Array.isArray(keycode)) {
      keycode.forEach(function(key) {
        registerCommand(command, key);
      });
    } else {
      this.registeredInputs[keycode] = command;
    }
  }
}

export { Keyboard };
