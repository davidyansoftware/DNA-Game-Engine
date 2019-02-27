// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"src/Utilities/Angle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Radians = exports.Degrees = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//import { Coordinates } from "./Position";
function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

function radiansToDegrees(radians) {
  return radians * 180 / Math.PI;
}

var Angle =
/*#__PURE__*/
function () {
  function Angle(degrees, radians) {
    _classCallCheck(this, Angle);

    this._degrees = degrees;
    this._radians = radians; //TODO dirty flags
  }

  _createClass(Angle, [{
    key: "add",
    value: function add(angle) {
      this.radians += angle.radians;
      return this;
    }
  }, {
    key: "addRadians",
    value: function addRadians(radians) {
      this.radians += radians;
      return this;
    }
  }, {
    key: "addDegrees",
    value: function addDegrees(degrees) {
      this.degrees += degrees;
      return this;
    }
  }, {
    key: "getNewAngle",
    value: function getNewAngle(spread) {
      var radians = this.radians;
      radians -= spread.radians / 2;
      radians += Math.random() * spread.radians;
      return new Radians(radians);
    }
    /*
    getUnitCoordinates(scale = 1) {
      return new Coordinates(
        Math.sin(this.radians) * scale,
        -Math.cos(this.radians) * scale
      );
    }
    */

  }, {
    key: "degrees",
    get: function get() {
      return this._degrees;
    },
    set: function set(degrees) {
      this._degrees = degrees;
      this._radians = degreesToRadians(degrees);
    }
  }, {
    key: "radians",
    get: function get() {
      return this._radians;
    },
    set: function set(radians) {
      this._radians = radians;
      this._degrees = radiansToDegrees(radians);
    }
  }], [{
    key: "UP",
    get: function get() {
      return UP;
    }
  }, {
    key: "LEFT",
    get: function get() {
      return LEFT;
    }
  }, {
    key: "DOWN",
    get: function get() {
      return DOWN;
    }
  }, {
    key: "RIGHT",
    get: function get() {
      return RIGHT;
    }
  }]);

  return Angle;
}();

var Degrees =
/*#__PURE__*/
function (_Angle) {
  _inherits(Degrees, _Angle);

  function Degrees(degrees) {
    _classCallCheck(this, Degrees);

    //return new Angle(degrees, degreesToRadians(degrees));
    return _possibleConstructorReturn(this, _getPrototypeOf(Degrees).call(this, degrees, degreesToRadians(degrees)));
  }

  return Degrees;
}(Angle);

exports.Degrees = Degrees;

var Radians =
/*#__PURE__*/
function (_Angle2) {
  _inherits(Radians, _Angle2);

  function Radians(radians) {
    _classCallCheck(this, Radians);

    //return new Angle(radiansToDegrees(radians), radians);
    return _possibleConstructorReturn(this, _getPrototypeOf(Radians).call(this, radiansToDegrees(radians), radians));
  }

  return Radians;
}(Angle);

exports.Radians = Radians;
var UP = new Radians(0);
var LEFT = new Radians(Math.PI / 2);
var DOWN = new Radians(Math.PI);
var RIGHT = new Radians(3 * Math.PI / 2);
},{}],"src/Composite.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Composite = void 0;

var _Angle = require("./Utilities/Angle");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function updateContext(drawSettings) {
  var context = drawSettings.context;
  context.save();
  context.translate(drawSettings.x, drawSettings.y);
  context.rotate(drawSettings.rotation.radians);
  context.scale(drawSettings.xScale, drawSettings.yScale);
}

function restoreContext(drawSettings) {
  drawSettings.context.restore();
}

var Composite =
/*#__PURE__*/
function () {
  function Composite() {
    _classCallCheck(this, Composite);

    this.gameObjects = [];
  } //TODO these shouldn't be exposed to user, use setParent


  _createClass(Composite, [{
    key: "addGameObject",
    value: function addGameObject(gameObject) {
      this.gameObjects.push(gameObject);
    }
  }, {
    key: "removeGameObject",
    value: function removeGameObject(gameObject) {
      var index = this.gameObjects.indexOf(gameObject);
      if (index >= 0) this.gameObjects.splice(index, 1);
    } //TODO do not need update/render functions here, remove from composite entirely

  }, {
    key: "render",
    value: function render() {}
  }, {
    key: "update",
    value: function update() {}
  }, {
    key: "updateAll",
    value: function updateAll(deltaTime) {
      this.update(deltaTime);
      this.gameObjects.forEach(function (gameObject) {
        gameObject.updateAll(deltaTime);
      });
      this.gameObjects.forEach(function (gameObject) {
        if (gameObject.dead) {
          gameObject.destroyNow();
        }
      });
    }
    /*
    handleAllFlags() {
      this.gameObjects.forEach(function(gameObject) {
        if (gameObject.dead) {
          gameObject.destroyNow();
        }
      });
    }
    */

  }, {
    key: "renderAll",
    value: function renderAll() {
      var currDraw = {
        context: this.getContext(),
        x: this.transform.x,
        y: this.transform.y,
        rotation: this.transform.rotation || new _Angle.Degrees(0),
        xScale: this.transform.xScale || 1,
        yScale: this.transform.yScale || 1
      };
      updateContext(currDraw);
      this.render();
      this.gameObjects.forEach(function (gameObject) {
        gameObject.renderAll();
      });
      restoreContext(currDraw);
    }
  }]);

  return Composite;
}();

exports.Composite = Composite;
},{"./Utilities/Angle":"src/Utilities/Angle.js"}],"src/Transform.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CanvasTransform = exports.Transform = void 0;

var _Angle = require("./Utilities/Angle");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var defaults = {
  x: 0,
  y: 0,
  depth: 0,
  //TODO having a default as a reference object is problematic
  //rotation: new Degrees(0),
  xScale: 1,
  yScale: 1
};

var Transform =
/*#__PURE__*/
function () {
  //TODO setup anchors, base center and origin on these
  function Transform() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Transform);

    //TODO use position here
    this.x = options.x || defaults.x;
    this.y = options.y || defaults.y;
    this.depth = options.depth || defaults.depth; //this.rotation = options.rotation || defaults.rotation;

    this.rotation = options.rotation || new _Angle.Radians(0);
    this.xScale = options.xScale || defaults.xScale;
    this.yScale = options.yScale || defaults.yScale; //TODO store and modify a different position class
    //this.prevX;
    //this.prevY;

    this.update();
  }

  _createClass(Transform, [{
    key: "update",
    value: function update(deltaTime) {
      //TODO also want to keep track of absolute positions here???? many extra computations per frame
      this.prevX = this.x;
      this.prevY = this.y;
    }
  }, {
    key: "getCurrentDirection",
    value: function getCurrentDirection() {
      var dx = this.x - this.prevX;
      var dy = this.y - this.prevY;
      return new _Angle.Radians(Math.atan2(dy, dx) + Math.PI / 2);
    }
  }, {
    key: "getAngleToTransform",
    value: function getAngleToTransform(other) {
      var thisCenter = this.getAbsoluteCenter();
      var otherCenter = other.getAbsoluteCenter();
      var dx = thisCenter.x - otherCenter.x;
      var dy = thisCenter.y - otherCenter.y;
      return Math.atan2(dy, dx) - Math.PI / 2;
    }
  }, {
    key: "getDistanceToTransform",
    value: function getDistanceToTransform(other) {
      var thisCenter = this.getAbsoluteCenter();
      var otherCenter = other.getAbsoluteCenter();
      return Math.sqrt(Math.pow(thisCenter.x - otherCenter.x, 2) + Math.pos(thisCenter.y - otherCenter.y, 2));
    }
  }, {
    key: "getAbsoluteRotation",
    value: function getAbsoluteRotation() {
      return this.gameObject.parent.transform.getAbsoluteRotation().addDegrees(this.rotation.degrees);
    } //TODO should use physics
    //TODO include this with point

  }, {
    key: "moveTo",
    value: function moveTo(x, y, distance) {
      var dx = x - this.x;
      var dy = y - this.y;
      var hypotenuse = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

      if (distance > hypotenuse) {
        this.x = x;
        this.y = y;
        return true;
      } else {
        var angle = Math.atan2(dy, dx) + Math.PI / 2;
        this.x += distance * Math.sin(angle);
        this.y += distance * -Math.cos(angle);
        return false;
      }
    }
  }, {
    key: "setAbsoluteRotation",
    value: function setAbsoluteRotation(rotation) {
      this.rotation = rotation.addDegrees(-this.gameObject.parent.transform.getAbsoluteRotation().degrees);
    }
  }, {
    key: "getAbsolutePosition",
    value: function getAbsolutePosition(x, y) {
      var center = this.getAbsoluteCenter();
      var rotation = this.getAbsoluteRotation();
      var rad = rotation.radians;
      return {
        x: center.x + x * Math.cos(rad) - y * Math.sin(rad),
        y: center.y + x * Math.sin(rad) + y * Math.cos(rad)
      };
    }
  }, {
    key: "getAbsoluteCenter",
    value: function getAbsoluteCenter() {
      var parentCenter = this.gameObject.parent.transform.getAbsoluteCenter();
      var parentRotation = this.gameObject.parent.transform.getAbsoluteRotation();
      var rad = parentRotation.radians;
      var x = this.x * this.xScale;
      var y = this.y * this.yScale;
      return {
        x: parentCenter.x + x * Math.cos(rad) - y * Math.sin(rad),
        y: parentCenter.y + x * Math.sin(rad) + y * Math.cos(rad)
      };
    } //TODO handle scale, reference above

  }, {
    key: "setAbsoluteCenter",
    value: function setAbsoluteCenter(center) {
      var parentCenter = this.gameObject.parent.transform.getAbsoluteCenter();
      var parentRotation = this.gameObject.parent.transform.getAbsoluteRotation();
      var rad = new _Angle.Radians(-parentRotation.radians).radians; // negative to negate rotation

      center.x -= parentCenter.x;
      center.y -= parentCenter.y;
      this.x = center.x * Math.cos(rad) - center.y * Math.sin(rad);
      this.y = center.x * Math.sin(rad) + center.y * Math.cos(rad);
    }
  }]);

  return Transform;
}();

exports.Transform = Transform;

var CanvasTransform =
/*#__PURE__*/
function (_Transform) {
  _inherits(CanvasTransform, _Transform);

  function CanvasTransform(domCanvas) {
    var _this;

    _classCallCheck(this, CanvasTransform);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CanvasTransform).call(this));
    _this.width = domCanvas.width;
    _this.height = domCanvas.height;
    _this.x = _this.width / 2;
    _this.y = _this.height / 2;
    return _this;
  }

  _createClass(CanvasTransform, [{
    key: "getAbsoluteCenter",
    value: function getAbsoluteCenter() {
      return {
        x: 0,
        y: 0
      };
    }
  }, {
    key: "getAbsoluteRotation",
    value: function getAbsoluteRotation() {
      return new _Angle.Radians(0);
    }
  }]);

  return CanvasTransform;
}(Transform);

exports.CanvasTransform = CanvasTransform;
},{"./Utilities/Angle":"src/Utilities/Angle.js"}],"src/Canvas.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StaticCanvas = exports.Canvas = void 0;

var _Composite3 = require("./Composite");

var _Transform = require("./Transform");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var StaticCanvas =
/*#__PURE__*/
function (_Composite) {
  _inherits(StaticCanvas, _Composite);

  function StaticCanvas(domCanvas) {
    var _this;

    var load = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var start = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    _classCallCheck(this, StaticCanvas);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(StaticCanvas).call(this));
    _this.ctx = domCanvas.getContext("2d");
    _this.transform = new _Transform.CanvasTransform(domCanvas); //TODO this should be handled as part of scene class

    Promise.all(load).then(function () {
      start(_assertThisInitialized(_assertThisInitialized(_this)));
    });
    return _this;
  }

  _createClass(StaticCanvas, [{
    key: "clear",
    value: function clear() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
  }, {
    key: "getCanvas",
    value: function getCanvas() {
      return this;
    }
  }, {
    key: "getContext",
    value: function getContext() {
      return this.ctx;
    } //TODO this wont work when objects are added to the composites directly

  }, {
    key: "addGameObject",
    value: function addGameObject(gameObject) {
      _get(_getPrototypeOf(StaticCanvas.prototype), "addGameObject", this).call(this, gameObject);

      this.clear();
      console.log(this);
      this.renderAll();
    }
  }]);

  return StaticCanvas;
}(_Composite3.Composite);

exports.StaticCanvas = StaticCanvas;

var Canvas =
/*#__PURE__*/
function (_Composite2) {
  _inherits(Canvas, _Composite2);

  function Canvas(domCanvas) {
    var _this2;

    _classCallCheck(this, Canvas);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Canvas).call(this)); //TODO probably dont need to reference game here, just handle canvases from the game itself
    //this.game = game;

    _this2.ctx = domCanvas.getContext("2d");
    _this2.transform = new _Transform.CanvasTransform(domCanvas); //this.prevTime;

    var self = _assertThisInitialized(_assertThisInitialized(_this2));

    window.requestAnimationFrame(function (currTime) {
      self.gameLoop(currTime);
    });
    return _this2;
  }

  _createClass(Canvas, [{
    key: "clear",
    value: function clear() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    } //TODO move this out of this class (game class?)
    //TODO handle static canvas

  }, {
    key: "gameLoop",
    value: function gameLoop(currTime) {
      if (!this.prevTime) this.prevTime = currTime;
      var deltaTime = (currTime - this.prevTime) / 1000;
      this.prevTime = currTime;
      this.clear();
      this.updateAll(deltaTime);
      this.renderAll();
      var self = this;
      window.requestAnimationFrame(function (currTime) {
        self.gameLoop(currTime);
      });
    }
  }, {
    key: "getCanvas",
    value: function getCanvas() {
      return this;
    }
  }, {
    key: "getContext",
    value: function getContext() {
      return this.ctx;
    }
  }]);

  return Canvas;
}(_Composite3.Composite);

exports.Canvas = Canvas;
},{"./Composite":"src/Composite.js","./Transform":"src/Transform.js"}],"src/GameObject.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameObject = void 0;

var _Composite2 = require("./Composite");

var _Transform = require("./Transform");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var GameObject =
/*#__PURE__*/
function (_Composite) {
  _inherits(GameObject, _Composite);

  function GameObject(parent) {
    var _this;

    var transform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var components = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    _classCallCheck(this, GameObject);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GameObject).call(this)); // flags
    //TODO use underscore?

    _this.active = true;
    _this.dead = false; //this.dirty = false;

    _this.transform = new _Transform.Transform(transform);
    _this.transform.gameObject = _assertThisInitialized(_assertThisInitialized(_this));
    _this.components = [];

    for (var i = 0; i < components.length; i++) {
      _this.addComponent(components[i]);
    }

    _this.setParent(parent);

    return _this;
  } // mark for destroy, to be called at end of update


  _createClass(GameObject, [{
    key: "destroy",
    value: function destroy() {
      this.dead = true;
    }
  }, {
    key: "destroyNow",
    value: function destroyNow() {
      this.components.forEach(function (component) {
        component.onDestroy();
      });
      this.parent.removeGameObject(this);
    }
  }, {
    key: "addComponent",
    value: function addComponent(component) {
      component.gameObject = this;
      this.components.push(component);
    }
  }, {
    key: "removeComponent",
    value: function removeComponent(component) {
      //TODO use dead flag???
      var index = this.components.indexOf(component);
      this.components.splice(index, 1);
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.active) return;
      this.components.forEach(function (component) {
        component.render();
      });
    }
  }, {
    key: "update",
    value: function update(deltaTime) {
      if (!this.active) return;
      this.transform.update(deltaTime);
      this.components.forEach(function (component) {
        component.update(deltaTime);
      });
    }
  }, {
    key: "setActive",
    value: function setActive(active) {
      this.active = active; //if (active) {
      //  this.render();
      //}
    }
  }, {
    key: "setParent",
    value: function setParent(parent, maintainAbsolutePosition) {
      var prevCenter;

      if (this.parent) {
        if (maintainAbsolutePosition) {
          prevCenter = this.transform.getAbsoluteCenter();
        }

        this.parent.removeGameObject(this);
      }

      this.parent = parent;
      parent.addGameObject(this); //TODO should also make these changes to rotation, scale etc

      if (maintainAbsolutePosition) {
        this.transform.setAbsoluteCenter(prevCenter);
      }
    }
  }, {
    key: "getCanvas",
    value: function getCanvas() {
      return this.parent.getCanvas();
    }
  }, {
    key: "getContext",
    value: function getContext() {
      return this.parent.getContext();
    }
  }]);

  return GameObject;
}(_Composite2.Composite);

exports.GameObject = GameObject;
},{"./Composite":"src/Composite.js","./Transform":"src/Transform.js"}],"src/Component.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Component = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Component =
/*#__PURE__*/
function () {
  function Component() {
    _classCallCheck(this, Component);
  }

  _createClass(Component, [{
    key: "update",
    //TODO find a simple way to pass update/render functions in?
    //TODO handleInput()?
    value: function update(deltaTime) {}
  }, {
    key: "render",
    value: function render() {}
  }, {
    key: "onDestroy",
    value: function onDestroy() {}
  }]);

  return Component;
}();

exports.Component = Component;
},{}],"src/Components/Image.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Image = void 0;

var _Component2 = require("../Component");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function recalculateIndex(image) {
  image._framesPerRow = image.width === 0 ? 1 : image.image.width / image.width;
  if (image.frameIndex >= image.numberOfFrames) image.frameIndex = 0;
  image._xIndex = (image.frameIndex + image.xIndexStart) % image._framesPerRow;
  image._yIndex = image.yIndexStart + Math.floor((image.xIndexStart + image.frameIndex) / image._framesPerRow);
}

function getWeightedIndex(arr) {
  var random = Math.random();
  var prevTotal = 0;

  for (var i = 0; i < arr.length; i++) {
    if (random < arr[i] + prevTotal) {
      return i;
    }

    prevTotal += arr[i];
  }

  return -1;
} //TODO use symbols??


var types = {
  default: "default",
  tiled: "tiled",
  stretched: "stretched",
  randomTiled: "randomTiled"
};

var Image =
/*#__PURE__*/
function (_Component) {
  _inherits(Image, _Component);

  function Image() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Image);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Image).call(this));
    _this.image = new window.Image();
    _this.type = types.default;
    _this.ticksPerFrame = 0;
    _this.numberOfFrames = 1;
    _this._xIndex = 0;
    _this._yIndex = 0;
    _this.xIndexStart = 0;
    _this.yIndexStart = 0;
    _this._framesPerRow = 1; //TODO this needs a better default

    _this.loop = true;

    _this.onFinish = function () {}; // these are for random tiling


    _this.xWeight = [1];
    _this.yWeight = [1];
    _this.frameIndex = 0;
    _this.tickCount = 0;

    _this.updateOptions(options); //TODO reverse this naming


    _this.width = _this.width || _this.image.width;
    _this.height = _this.height || _this.image.height;
    _this.destWidth = _this.destWidth || _this.width;
    _this.destHeight = _this.destHeight || _this.height;
    return _this;
  }

  _createClass(Image, [{
    key: "updateOptions",
    value: function updateOptions() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // checking for undefined to account for 0 values
      if (options.image !== undefined) this.image = options.image;
      if (options.type !== undefined) this.type = options.type; //TODO could generlize below, but not above. override?

      if (options.width !== undefined) this.width = options.width;
      if (options.height !== undefined) this.height = options.height;
      if (options.destWidth !== undefined) this.destWidth = options.destWidth;
      if (options.destHeight !== undefined) this.destHeight = options.destHeight;
      if (options.xWeight !== undefined) this.xWeight = options.xWeight;
      if (options.yWeight !== undefined) this.yWeight = options.yWeight;
      if (options.ticksPerFrame !== undefined) this.ticksPerFrame = options.ticksPerFrame;
      if (options.numberOfFrames !== undefined) this.numberOfFrames = options.numberOfFrames;
      if (options.startingColumn !== undefined) this.xIndexStart = options.startingColumn;
      if (options.startingRow !== undefined) this.yIndexStart = options.startingRow;
      if (options.loop !== undefined) this.loop = options.loop;
      if (options.onFinish !== undefined) this.onFinish = options.onFinish;
      if (options.frameIndex !== undefined) this.frameIndex = options.frameIndex;
      if (options.tickCount !== undefined) this.tickCount = options.tickCount;
      recalculateIndex(this);
    }
  }, {
    key: "update",
    value: function update(deltaTime) {
      this.tickCount++;

      if (this.tickCount > this.ticksPerFrame) {
        this.tickCount = 0; //let currentFrame = this.frameIndex(this.xIndex, this.yIndex);
        //let startingFrame = this.frameIndex(this.xIndexStart, this.yIndexStart);
        //let processedFrames = currentFrame - startingFrame;

        if (this.frameIndex < this.numberOfFrames - 1) {
          this.frameIndex++;
          this._xIndex++;

          if (this._xIndex >= this._framesPerRow) {
            this._xIndex = 0;
            this._yIndex++;
          }
        } else if (this.loop) {
          this.frameIndex = 0;
          this._xIndex = this.xIndexStart;
          this._yIndex = this.yIndexStart;
        } else {
          this.onFinish(this);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var destWidth = this.destWidth === undefined ? this.width : this.destWidth;
      var destHeight = this.destHeight === undefined ? this.height : this.destHeight; //console.log(this.image);

      if (this.type === types.stretched) {
        this.gameObject.getContext().drawImage(this.image, this._xIndex * this.width, this._yIndex * this.height, this.width, this.height, -destWidth / 2, -destHeight / 2, destWidth, destHeight);
      } else if (this.type === types.tiled) {
        //TODO this wont be bounded correctly
        var currTileX = -destWidth / 2;
        var endTileX = destWidth / 2;
        var endTileY = destHeight / 2;

        while (currTileX < endTileX) {
          var currTileY = -destHeight / 2;

          while (currTileY < endTileY) {
            this.gameObject.getContext().drawImage(this.image, this._xIndex * this.width, this._yIndex * this.height, this.width, this.height, currTileX, currTileY, this.width, this.height);
            currTileY += this.height;
          }

          currTileX += this.width;
        }
      } else if (this.type === types.randomTiled) {
        var numTilesX = this.xWeight.length;
        var numTilesY = this.yWeight.length;
        var tileWidth = this.width / numTilesX;
        var tileHeight = this.height / numTilesY; //TODO this wont be bounded correctly

        var _currTileX = -destWidth / 2;

        var _endTileX = destWidth / 2;

        var _endTileY = destHeight / 2;

        while (_currTileX < _endTileX) {
          var _currTileY = -destHeight / 2;

          while (_currTileY < _endTileY) {
            var xRandom = getWeightedIndex(this.xWeight);
            var yRandom = getWeightedIndex(this.yWeight);
            var xTile = this._xIndex * this.width + xRandom * tileWidth;
            var yTile = this._yIndex * this.height + yRandom * tileHeight;
            this.gameObject.getContext().drawImage(this.image, xTile, yTile, tileWidth, tileHeight, _currTileX, _currTileY, tileWidth, tileHeight);
            _currTileY += tileHeight;
          }

          _currTileX += tileWidth;
        }
      } else {
        // default
        //TODO currently just draws at source size, may need to bound?
        this.gameObject.getContext().drawImage(this.image, this._xIndex * this.width, this._yIndex * this.height, this.width, this.height, -this.width / 2, -this.height / 2, this.width, this.height);
      }
    }
  }]);

  return Image;
}(_Component2.Component);

exports.Image = Image;
Image.types = types;
},{"../Component":"src/Component.js"}],"src/Components/SimplePhysics.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimplePhysics = void 0;

var _Component2 = require("../Component");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

//TODO also want vector (angle + speed), consolidate this with physics
//TODO make vector and coodinates interchangable
var SimplePhysics =
/*#__PURE__*/
function (_Component) {
  _inherits(SimplePhysics, _Component);

  function SimplePhysics() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, SimplePhysics);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SimplePhysics).call(this));
    _this.xv = options.xv || 0;
    _this.yv = options.yv || 0;
    return _this;
  }

  _createClass(SimplePhysics, [{
    key: "update",
    value: function update(deltaTime) {
      this.gameObject.transform.x += this.xv;
      this.gameObject.transform.y += this.yv;
    }
  }]);

  return SimplePhysics;
}(_Component2.Component);

exports.SimplePhysics = SimplePhysics;
},{"../Component":"src/Component.js"}],"src/Components/Polygon.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Polygon = void 0;

var _Component2 = require("../Component");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Polygon =
/*#__PURE__*/
function (_Component) {
  _inherits(Polygon, _Component);

  function Polygon(options) {
    var _this;

    _classCallCheck(this, Polygon);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Polygon).call(this));
    _this.vertOffset = [];

    _this.updateOptions(options);

    return _this;
  }

  _createClass(Polygon, [{
    key: "updateOptions",
    value: function updateOptions(opts) {
      //TODO strokestyle
      opts.radius = opts.radius || 10;
      opts.vert = opts.vert || 0;
      opts.jaggedness = opts.jaggedness || 0;
      opts.strokeStyle = opts.strokeStyle || "black";
      opts.fillStyle = opts.fillStyle || "transparent";
      this.options = opts;
      this.vertOffset = [];

      for (var i = 0; i < opts.vert; i++) {
        this.vertOffset.push(Math.random() * opts.jaggedness * 2 + 1 - opts.jaggedness);
      }
    }
  }, {
    key: "render",
    value: function render() {
      //TODO cache with dirty flag
      var ctx = this.gameObject.getContext();
      ctx.save();
      ctx.strokeStyle = this.options.strokeStyle;
      ctx.fillStyle = this.options.fillStyle;
      ctx.beginPath();

      if (this.options.vert <= 0) {
        ctx.arc(0, 0, this.options.radius, 0, Math.PI * 2);
      } else {
        ctx.moveTo(this.options.radius * this.vertOffset[0] * Math.cos(this.gameObject.transform.rotation.degrees), this.options.radius * this.vertOffset[0] * Math.sin(this.gameObject.transform.rotation.degrees));

        for (var i = 1; i < this.options.vert; i++) {
          ctx.lineTo(this.options.radius * this.vertOffset[i] * Math.cos(this.gameObject.transform.rotation.degrees + i * Math.PI * 2 / this.options.vert), this.options.radius * this.vertOffset[i] * Math.sin(this.gameObject.transform.rotation.degrees + i * Math.PI * 2 / this.options.vert));
        }

        ctx.closePath();
      }

      ctx.stroke();
      ctx.fill();
      ctx.restore();
    }
  }]);

  return Polygon;
}(_Component2.Component);

exports.Polygon = Polygon;
},{"../Component":"src/Component.js"}],"src/Components/Rectangle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rectangle = void 0;

var _Component2 = require("../Component");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Rectangle =
/*#__PURE__*/
function (_Component) {
  _inherits(Rectangle, _Component);

  function Rectangle(options) {
    var _this;

    _classCallCheck(this, Rectangle);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Rectangle).call(this));
    _this.height = options.height;
    _this.width = options.width;
    return _this;
  }

  _createClass(Rectangle, [{
    key: "render",
    value: function render() {
      var ctx = this.gameObject.getContext();
      ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    }
  }]);

  return Rectangle;
}(_Component2.Component);

exports.Rectangle = Rectangle;
},{"../Component":"src/Component.js"}],"src/Components/Physics.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Physics = void 0;

var _Component2 = require("../Component");

var _Angle = require("../Utilities/Angle");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var Physics =
/*#__PURE__*/
function (_Component) {
  _inherits(Physics, _Component);

  function Physics() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Physics);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Physics).call(this));
    _this.angle = options.angle || new _Angle.Degrees(0);
    _this.speed = options.speed || 0;
    _this.distanceTraveled = {
      x: 0,
      y: 0,
      total: 0
    };
    _this.totalDistanceTraveled = 0;
    _this.maxDistance = options.maxDistance || Infinity;

    _this.callback = options.callback || function () {
      _this.gameObject.removeComponent(_assertThisInitialized(_assertThisInitialized(_this)));
    };

    return _this;
  } //TODO radians vs degrees?


  _createClass(Physics, [{
    key: "update",
    value: function update(deltaTime) {
      var xv = this.speed * Math.sin(this.angle.radians);
      var yv = this.speed * -Math.cos(this.angle.radians);
      this.gameObject.transform.x += xv;
      this.gameObject.transform.y += yv; //TODO this wont be updated correctly to account for walls

      this.distanceTraveled.x = xv;
      this.distanceTraveled.y = yv;
      this.distanceTraveled.total = this.speed;
      this.totalDistanceTraveled += this.speed;
      console.log(this.totalDistanceTraveled + ">=" + this.maxDistance);

      if (this.totalDistanceTraveled >= this.maxDistance) {
        this.callback();
      }
    }
  }]);

  return Physics;
}(_Component2.Component);

exports.Physics = Physics;
},{"../Component":"src/Component.js","../Utilities/Angle":"src/Utilities/Angle.js"}],"src/Components/Acceleration.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Acceleration = void 0;

var _Component2 = require("../Component");

var _Angle = require("../Utilities/Angle");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

//TODO could be a subcomponent of physics??
var Acceleration =
/*#__PURE__*/
function (_Component) {
  _inherits(Acceleration, _Component);

  function Acceleration(physics) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Acceleration);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Acceleration).call(this));
    _this.physics = physics; //TODO these should be private
    //this.xa = options.xa || 0;
    //this.ya = options.ya || 0;
    //this.distanceTraveled = 0;

    _this.active = options.active || true; //TODO vector class

    _this.angle = options.angle || new _Angle.Degrees(0);
    _this.accel = options.accel || 0; //TODO rename to drag

    _this.friction = options.friction || 0;
    _this.maxDistance = options.maxDistance || {
      distance: Infinity,
      callback: function callback() {}
    };
    return _this;
  }

  _createClass(Acceleration, [{
    key: "update",
    value: function update(deltaTime) {
      if (this.active) {
        this.physics.xv += this.accel * Math.sin(this.angle.radians);
        this.physics.yv += this.accel * -Math.cos(this.angle.radians);
      } else {
        //TODO this friction value is affected for side to side even for down friction
        this.physics.xv -= this.physics.xv * this.friction;
        this.physics.yv -= this.physics.yv * this.friction;
      }
      /*
      this.distanceTraveled += Math.sqrt(
        Math.pow(this.xv, 2) + Math.pow(this.yv, 2)
      );
      if (this.distanceTraveled >= this.maxDistance.distance) {
        this.maxDistance.callback();
      }
      */

    }
  }]);

  return Acceleration;
}(_Component2.Component);

exports.Acceleration = Acceleration;
},{"../Component":"src/Component.js","../Utilities/Angle":"src/Utilities/Angle.js"}],"src/Components/Hitcircle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hitcircle = void 0;

var _Component2 = require("../Component");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var Hitcircle =
/*#__PURE__*/
function (_Component) {
  _inherits(Hitcircle, _Component);

  function Hitcircle(options) {
    var _this;

    _classCallCheck(this, Hitcircle);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Hitcircle).call(this));
    _this.radius = options.radius || 10; //TODO generalize this behavior in a superclass

    _this.hurtboxes = options.hurtboxes || [];
    _this.hitboxSet = options.hitboxSet || []; //TODO rename to onCollision

    _this.onCollision = options.onCollision || function () {};

    _this.onCollisionEnter = options.onCollisionEnter || function () {};

    _this.onCollisionExit = options.onCollisionExit || function () {};

    _this.collidingWith = [];

    _this.hitboxSet.push(_assertThisInitialized(_assertThisInitialized(_this)));

    return _this;
  }

  _createClass(Hitcircle, [{
    key: "update",
    value: function update(deltaTime) {
      var num = this.hurtboxes.length;

      for (var i = 0; i < num; i++) {
        var hurtbox = this.hurtboxes[i]; //TODO maybe use a hash, not array

        var collidingWithIndex = this.collidingWith.indexOf(hurtbox);
        var prevColliding = collidingWithIndex >= 0;

        if (hurtbox.collidingWithHitcircle(this)) {
          if (!prevColliding) {
            this.collidingWith.push(hurtbox);
            this.onCollisionEnter(hurtbox);
          }

          this.onCollision(hurtbox);
        } else {
          if (prevColliding) {
            this.collidingWith.splice(collidingWithIndex, 1);
            this.onCollisionExit(hurtbox);
          }
        }
      }
    }
  }, {
    key: "onDestroy",
    value: function onDestroy() {
      var index = this.hitboxSet.indexOf(this);
      this.hitboxSet.splice(index, 1);
    } //TODO handle rotation??

  }, {
    key: "collidingWithHitbox",
    value: function collidingWithHitbox(hitbox) {
      var thisCenter = this.gameObject.transform.getAbsoluteCenter();
      var hitboxCenter = hitbox.gameObject.transform.getAbsoluteCenter();
      if (thisCenter.x < hitboxCenter.x - hitbox.width / 2 - this.radius) return false;
      if (thisCenter.x > hitboxCenter.x + hitbox.width / 2 + this.radius) return false;
      if (thisCenter.y < hitboxCenter.y - hitbox.height / 2 - this.radius) return false;
      if (thisCenter.y > hitboxCenter.y + hitbox.height / 2 + this.radius) return false;
      return true;
    }
  }, {
    key: "collidingWithHitcircle",
    value: function collidingWithHitcircle(hitcircle) {
      var thisCenter = this.gameObject.transform.getAbsoluteCenter();
      var hitcircleCenter = hitcircle.gameObject.transform.getAbsoluteCenter();
      var distanceBetween = Math.sqrt(Math.pow(thisCenter.x - hitcircleCenter.x, 2) + Math.pow(thisCenter.y - hitcircleCenter.y, 2));
      return distanceBetween < this.radius + hitcircle.radius;
    }
  }, {
    key: "clearCollisions",
    value: function clearCollisions() {
      this.collidingWith = [];
    }
  }]);

  return Hitcircle;
}(_Component2.Component);

exports.Hitcircle = Hitcircle;
},{"../Component":"src/Component.js"}],"src/Components/Hitbox.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hitbox = void 0;

var _Component2 = require("../Component");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var Hitbox =
/*#__PURE__*/
function (_Component) {
  _inherits(Hitbox, _Component);

  function Hitbox(options) {
    var _this;

    _classCallCheck(this, Hitbox);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Hitbox).call(this));
    _this.width = options.width || 10;
    _this.height = options.height || 10; //TODO generalize this behavior in a superclass

    _this.hurtboxes = options.hurtboxes || [];
    _this.hitboxSet = options.hitboxSet || []; //TODO rename to onCollision

    _this.onCollision = options.onCollision || function () {};

    _this.onCollisionEnter = options.onCollisionEnter || function () {};

    _this.onCollisionExit = options.onCollisionExit || function () {};

    _this.collidingWith = [];

    _this.hitboxSet.push(_assertThisInitialized(_assertThisInitialized(_this)));

    return _this;
  }

  _createClass(Hitbox, [{
    key: "update",
    value: function update(deltaTime) {
      var num = this.hurtboxes.length;

      for (var i = 0; i < num; i++) {
        var hurtbox = this.hurtboxes[i]; //TODO maybe use a hash, not array

        var collidingWithIndex = this.collidingWith.indexOf(hurtbox);
        var prevColliding = collidingWithIndex >= 0;

        if (hurtbox.collidingWithHitbox(this)) {
          if (!prevColliding) {
            this.collidingWith.push(hurtbox);
            this.onCollisionEnter(hurtbox);
          }

          this.onCollision(hurtbox);
        } else {
          if (prevColliding) {
            this.collidingWith.splice(collidingWithIndex, 1);
            this.onCollisionExit(hurtbox);
          }
        }
      }
    }
  }, {
    key: "onDestroy",
    value: function onDestroy() {
      var index = this.hitboxSet.indexOf(this);
      this.hitboxSet.splice(index, 1);
    } //TODO handle rotation?? use absoluteposition(x,y)

  }, {
    key: "collidingWithHitbox",
    value: function collidingWithHitbox(hitbox) {
      var thisCenter = this.gameObject.transform.getAbsoluteCenter();
      var hitboxCenter = hitbox.gameObject.transform.getAbsoluteCenter();
      if (thisCenter.x < hitboxCenter.x - hitbox.width / 2 - this.width / 2) return false;
      if (thisCenter.x > hitboxCenter.x + hitbox.width / 2 + this.width / 2) return false;
      if (thisCenter.y < hitboxCenter.y - hitbox.height / 2 - this.height / 2) return false;
      if (thisCenter.y > hitboxCenter.y + hitbox.height / 2 + this.height / 2) return false;
      return true;
    }
  }, {
    key: "collidingWithHitcircle",
    value: function collidingWithHitcircle(hitcircle) {
      var thisCenter = this.gameObject.transform.getAbsoluteCenter();
      var hitcircleCenter = hitcircle.gameObject.transform.getAbsoluteCenter();
      if (thisCenter.x < hitcircleCenter.x - hitcircle.radius - this.width / 2) return false;
      if (thisCenter.x > hitcircleCenter.x + hitcircle.radius + this.width / 2) return false;
      if (thisCenter.y < hitcircleCenter.y - hitcircle.radius - this.height / 2) return false;
      if (thisCenter.y > hitcircleCenter.y + hitcircle.radius + this.height / 2) return false;
      return true;
    }
  }, {
    key: "clearCollisions",
    value: function clearCollisions() {
      this.collidingWith = [];
    }
  }]);

  return Hitbox;
}(_Component2.Component);

exports.Hitbox = Hitbox;
},{"../Component":"src/Component.js"}],"src/Components/Text.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Text = void 0;

var _Component2 = require("../Component");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DEFAULT = {
  text: "",
  textAlign: "center",
  textBaseline: "middle",
  fillStyle: "black",
  font: "12px serif"
};

var Text =
/*#__PURE__*/
function (_Component) {
  _inherits(Text, _Component);

  function Text(options) {
    var _this;

    _classCallCheck(this, Text);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Text).call(this));
    _this.text = options.text || DEFAULT.text;
    _this.textAlign = options.textAlign || DEFAULT.textAlign;
    _this.textBaseline = options.textBaseline || DEFAULT.textBaseline;
    _this.fillStyle = options.fillStyle || DEFAULT.fillStyle;
    _this.font = options.font || DEFAULT.font;
    return _this;
  }

  _createClass(Text, [{
    key: "render",
    value: function render() {
      var ctx = this.gameObject.getContext();
      ctx.save();
      ctx.font = this.font;
      ctx.fillStyle = this.fillStyle;
      ctx.textAlign = this.textAlign;
      ctx.textBaseline = this.textBaseline;
      ctx.fillText(this.text, 0, 0);
      ctx.restore();
    }
  }]);

  return Text;
}(_Component2.Component);

exports.Text = Text;
},{"../Component":"src/Component.js"}],"src/Components/Audio.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Audio = void 0;

var _Component2 = require("../Component");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

//TODO maybe dont make audio a component??
var Audio =
/*#__PURE__*/
function (_Component) {
  _inherits(Audio, _Component);

  function Audio() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Audio);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Audio).call(this));
    _this.audio = new window.Audio();
    _this.audio.volume = options.volume || 1;
    return _this;
  }

  _createClass(Audio, [{
    key: "play",
    value: function play(clip) {
      //TODO this is causing problems when multiple monster are getting hit at once
      this.audio.src = clip;
      this.audio.currentTime = 0;
      this.audio.play();
    }
  }]);

  return Audio;
}(_Component2.Component);

exports.Audio = Audio;
},{"../Component":"src/Component.js"}],"src/Utilities/Position.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vector = exports.Coordinates = void 0;

var _Angle = require("./Angle");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function recalculateVector(position) {
  position._angle.radians = Math.atan2(position._y, position._x) + Math.PI / 2;
  position._magnitude = Math.sqrt(Math.pow(position._x, 2) + Math.pow(position._y, 2));
  position._dirtyVector = false;
}

function recalculateCoordinates(position) {
  position._x = Math.sin(position._angle.radians) * position._magnitude;
  position._y = -Math.cos(position._angle.radians) * position._magnitude;
  position._dirtyCoordinates = false;
  position._prevRadians = position._angle.radians;
}

var Position =
/*#__PURE__*/
function () {
  function Position() {
    _classCallCheck(this, Position);

    this._x;
    this._y;
    this._angle = new _Angle.Radians(0);
    this._magnitude;
    this._dirtyCoordinates;
    this._dirtyVector;
    this._prevRadians = this._angle.radians;
  }

  _createClass(Position, [{
    key: "add",
    value: function add(position) {
      this.x += position.x;
      this.y += position.y;
    } //TODO need to check if angle is dirty too

  }, {
    key: "x",
    get: function get() {
      if (this._dirtyCoordinates || this._angle.radians != this._prevRadians) {
        recalculateCoordinates(this);
      }

      return this._x;
    },
    set: function set(x) {
      this._x = x;
      this._dirtyVector = true;
    }
  }, {
    key: "y",
    get: function get() {
      if (this._dirtyCoordinates || this._angle.radians != this._prevRadians) {
        recalculateCoordinates(this);
      }

      return this._y;
    },
    set: function set(y) {
      this._y = y;
      this._dirtyVector = true;
    }
  }, {
    key: "angle",
    get: function get() {
      if (this._dirtyVector) {
        recalculateVector(this);
      }

      return this._angle;
    },
    set: function set(angle) {
      this._angle = angle;
      this._dirtyCoordinates = true;
    }
  }, {
    key: "magnitude",
    get: function get() {
      if (this._dirtyVector) {
        recalculateVector(this);
      }

      return this._magnitude;
    },
    set: function set(magnitude) {
      this._magnitude = magnitude;
      this._dirtyCoordinates = true;
    }
  }], [{
    key: "UNIT_LEFT",
    get: function get() {
      return UNIT_LEFT;
    }
  }, {
    key: "UNIT_RIGHT",
    get: function get() {
      return UNIT_RIGHT;
    }
  }, {
    key: "UNIT_UP",
    get: function get() {
      return UNIT_UP;
    }
  }, {
    key: "UNIT_DOWN",
    get: function get() {
      return UNIT_DOWN;
    }
  }]);

  return Position;
}(); //TODO defaults, including zero angle


var Coordinates =
/*#__PURE__*/
function (_Position) {
  _inherits(Coordinates, _Position);

  function Coordinates(x, y) {
    var _this;

    _classCallCheck(this, Coordinates);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Coordinates).call(this));
    _this._x = x;
    _this._y = y;
    _this._dirtyVector = true;
    return _this;
  }

  return Coordinates;
}(Position);

exports.Coordinates = Coordinates;

var Vector =
/*#__PURE__*/
function (_Position2) {
  _inherits(Vector, _Position2);

  function Vector(angle, magnitude) {
    var _this2;

    _classCallCheck(this, Vector);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Vector).call(this));
    _this2._angle = angle;
    _this2._magnitude = magnitude;
    _this2._dirtyCoordinates = true;
    return _this2;
  }

  return Vector;
}(Position);

exports.Vector = Vector;
var UNIT_LEFT = new Coordinates(-1, 0);
var UNIT_RIGHT = new Coordinates(1, 0);
var UNIT_UP = new Coordinates(0, -1);
var UNIT_DOWN = new Coordinates(0, 1);
},{"./Angle":"src/Utilities/Angle.js"}],"src/Input/Input.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//TODO refactor this to have "up, down, etc" and check all the inputs
var Input =
/*#__PURE__*/
function () {
  function Input(canvas, options, handler) {
    var _this = this;

    _classCallCheck(this, Input);

    this.canvas = canvas;
    this.activeInputs = {};
    this.registeredInputs = {};
    Object.keys(options).forEach(function (command) {
      _this.activeInputs[command] = false;

      _this.registerCommand(command, options[command]);
    });
    document.addEventListener("keydown", function (event) {
      if (_this.registeredInputs[event.keyCode]) {
        event.preventDefault();
        if (event.repeat) return;
        _this.activeInputs[_this.registeredInputs[event.keyCode]] = true;
        handler(_this.activeInputs);
      }
    });
    document.addEventListener("keyup", function (event) {
      if (_this.registeredInputs[event.keyCode]) {
        event.preventDefault();
        _this.activeInputs[_this.registeredInputs[event.keyCode]] = false;
        handler(_this.activeInputs);
      }
    }); //TODO have to redo mouse handlers

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
  } //TODO bool to handle mouse?
  //TODO maybe allow more params here, interruptable, cancellable
  //TODO maybe allow some granularity in here, defined additional categories by objects


  _createClass(Input, [{
    key: "registerCommand",
    value: function (_registerCommand) {
      function registerCommand(_x, _x2) {
        return _registerCommand.apply(this, arguments);
      }

      registerCommand.toString = function () {
        return _registerCommand.toString();
      };

      return registerCommand;
    }(function (command, keycode) {
      if (Array.isArray(keycode)) {
        keycode.forEach(function (key) {
          registerCommand(command, key);
        });
      } else {
        this.registeredInputs[keycode] = command;
      }
    })
  }]);

  return Input;
}();

exports.Input = Input;
},{}],"src/Input/Keyboard.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Keyboard = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//TODO maybe just constantly maintain all possible keyboard inputs (like mouse)
var Keyboard =
/*#__PURE__*/
function () {
  //TODO consolidate these
  function Keyboard(options) {
    var _this = this;

    var onKeyDown = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var onKeyUp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Keyboard);

    this.activeInputs = {};
    this.registeredInputs = {};
    this.onKeyDown = onKeyDown;
    this.onKeyUp = onKeyUp;
    Object.keys(options).forEach(function (keyCode) {
      _this.activeInputs[options[keyCode]] = false;

      _this.registerCommand(keyCode, options[keyCode]);
    });
    document.addEventListener("keydown", function (event) {
      if (_this.registeredInputs[event.keyCode]) {
        event.preventDefault();
        if (event.repeat) return;
        _this.activeInputs[_this.registeredInputs[event.keyCode]] = true; //handler(this.activeInputs);
      }

      if (_this.onKeyDown[event.keyCode]) {
        event.preventDefault();
        if (event.repeat) return;

        _this.onKeyDown[event.keyCode]();
      }
    });
    document.addEventListener("keyup", function (event) {
      if (_this.registeredInputs[event.keyCode]) {
        event.preventDefault();
        _this.activeInputs[_this.registeredInputs[event.keyCode]] = false; //handler(this.activeInputs);
      }

      if (_this.onKeyUp[event.keyCode]) {
        event.preventDefault();

        _this.onKeyUp[event.keyCode]();
      }
    }); //console.log(this.registeredInputs);
    //console.log(this.activeInputs);

    return this.activeInputs;
  } //TODO maybe allow more params here, interruptable, cancellable
  //TODO maybe allow some granularity in here, defined additional categories by objects


  _createClass(Keyboard, [{
    key: "registerCommand",
    value: function (_registerCommand) {
      function registerCommand(_x, _x2) {
        return _registerCommand.apply(this, arguments);
      }

      registerCommand.toString = function () {
        return _registerCommand.toString();
      };

      return registerCommand;
    }(function (keycode, command) {
      if (Array.isArray(keycode)) {
        keycode.forEach(function (key) {
          registerCommand(command, key);
        });
      } else {
        this.registeredInputs[keycode] = command;
      }
    })
  }]);

  return Keyboard;
}();

exports.Keyboard = Keyboard;
},{}],"src/Input/Mouse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mouse = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Mouse = function Mouse(canvas, onLeftClick, onRightClick) {
  var _this = this;

  _classCallCheck(this, Mouse);

  this.canvas = canvas; //TODO these should be readonly

  this.x = 0;
  this.y = 0; //this.leftClick;
  //TODO handle middle and right click
  //TODO handle scroll wheel

  document.addEventListener("mousemove", function (event) {
    var rect = _this.canvas.ctx.canvas.getBoundingClientRect();

    _this.x = event.clientX - Math.round(rect.left - 0.5) - _this.canvas.transform.x;
    _this.y = event.clientY - Math.round(rect.top - 0.5) - _this.canvas.transform.y;
  });
  document.addEventListener("mousedown", function (event) {
    _this.leftClick = true;
  });
  document.addEventListener("mouseup", function (event) {
    _this.leftClick = false;
  });

  if (onLeftClick) {
    document.body.addEventListener("click", function (event) {
      onLeftClick(_this);
    });
  }

  if (onRightClick) {
    document.addEventListener("contextmenu", function (event) {
      event.preventDefault();
      onRightClick(_this);
    });
  }
};

exports.Mouse = Mouse;
},{}],"src/Dom/Image.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DomImage = void 0;

/*
class DomImage {
  constructor(src) {
    this.image = new Image();
    this.image.load = new Promise((resolve, reject) => {
      this.image.onload(resolve);
      this.image.onerror(reject);
    });
    this.image.src = src;
  }

  /*
  load() {
    return new Promise((resolve, reject) => {
      console.log(this.image);
      if (this.image.complete) {
        resolve();
      } else {
        this.image.onload(resolve);
        this.image.onerror(reject);
      }
    });
  }
  *
}
*/
var DomImage = function DomImage(src) {
  var image = new window.Image();
  image.src = src;
  image.load = new Promise(function (resolve, reject) {
    image.onload = resolve;
    image.onerror = reject;
  });
  return image;
};

exports.DomImage = DomImage;
},{}],"src/Dna.js":[function(require,module,exports) {
"use strict";

var _Canvas = require("./Canvas");

var _GameObject = require("./GameObject");

var _Component = require("./Component");

var _Image = require("./Components/Image");

var _SimplePhysics = require("./Components/SimplePhysics");

var _Polygon = require("./Components/Polygon");

var _Rectangle = require("./Components/Rectangle");

var _Physics = require("./Components/Physics");

var _Acceleration = require("./Components/Acceleration");

var _Hitcircle = require("./Components/Hitcircle");

var _Hitbox = require("./Components/Hitbox");

var _Text = require("./Components/Text");

var _Audio = require("./Components/Audio");

var _Angle = require("./Utilities/Angle");

var _Position = require("./Utilities/Position");

var _Input = require("./Input/Input");

var _Keyboard = require("./Input/Keyboard");

var _Mouse = require("./Input/Mouse");

var _Image2 = require("./Dom/Image");

//import { Transform } from "./Components/Transform";
//import { Vector } from "./Utilities/Vector";
//import { Coordinates } from "./Utilities/Coordinates";
//TODO this needs to be totally reworked
var Dna = {
  //TODO should probably consolidate these
  Canvas: _Canvas.Canvas,
  StaticCanvas: _Canvas.StaticCanvas,
  GameObject: _GameObject.GameObject,
  Component: _Component.Component,
  //Transform: Transform,
  Components: {
    Image: _Image.Image,
    SimplePhysics: _SimplePhysics.SimplePhysics,
    Polygon: _Polygon.Polygon,
    Rectangle: _Rectangle.Rectangle,
    Physics: _Physics.Physics,
    Acceleration: _Acceleration.Acceleration,
    Hitcircle: _Hitcircle.Hitcircle,
    Hitbox: _Hitbox.Hitbox,
    Text: _Text.Text,
    Audio: _Audio.Audio
  },
  Utilities: {
    Degrees: _Angle.Degrees,
    Radians: _Angle.Radians,
    Coordinates: _Position.Coordinates,
    Vector: _Position.Vector
  },
  Input: {
    Input: _Input.Input,
    Keyboard: _Keyboard.Keyboard,
    Mouse: _Mouse.Mouse
  },
  Dom: {
    Image: _Image2.DomImage
  }
};
window.Dna = Dna;
},{"./Canvas":"src/Canvas.js","./GameObject":"src/GameObject.js","./Component":"src/Component.js","./Components/Image":"src/Components/Image.js","./Components/SimplePhysics":"src/Components/SimplePhysics.js","./Components/Polygon":"src/Components/Polygon.js","./Components/Rectangle":"src/Components/Rectangle.js","./Components/Physics":"src/Components/Physics.js","./Components/Acceleration":"src/Components/Acceleration.js","./Components/Hitcircle":"src/Components/Hitcircle.js","./Components/Hitbox":"src/Components/Hitbox.js","./Components/Text":"src/Components/Text.js","./Components/Audio":"src/Components/Audio.js","./Utilities/Angle":"src/Utilities/Angle.js","./Utilities/Position":"src/Utilities/Position.js","./Input/Input":"src/Input/Input.js","./Input/Keyboard":"src/Input/Keyboard.js","./Input/Mouse":"src/Input/Mouse.js","./Dom/Image":"src/Dom/Image.js"}],"C:/Users/David/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63705" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["C:/Users/David/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/Dna.js"], null)
//# sourceMappingURL=/Dna.ded6ca07.map