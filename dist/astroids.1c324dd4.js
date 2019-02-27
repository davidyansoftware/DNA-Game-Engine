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
})({"demos/astroids/Triangle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Triangle = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

//TODO make a path component
var Triangle =
/*#__PURE__*/
function (_Dna$Component) {
  _inherits(Triangle, _Dna$Component);

  function Triangle(options) {
    var _this;

    _classCallCheck(this, Triangle);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Triangle).call(this));
    _this.size = options.size || 0;
    _this.fill = options.fill;
    _this.stroke = options.stroke;
    _this.radius = _this.size / 2;
    return _this;
  }

  _createClass(Triangle, [{
    key: "render",
    value: function render() {
      var ctx = this.gameObject.getContext();
      ctx.strokeStyle = this.stroke;
      ctx.lineWidth = this.size / 20;
      ctx.beginPath();
      ctx.moveTo(0, -this.radius);
      ctx.lineTo(2 / 3 * this.radius, this.radius);
      ctx.lineTo(-(2 / 3) * this.radius, this.radius);
      ctx.closePath();

      if (this.fill) {
        ctx.fillStyle = this.fill;
        ctx.fill();
      }

      ctx.stroke();
    }
  }]);

  return Triangle;
}(Dna.Component);

exports.Triangle = Triangle;
},{}],"demos/astroids/Ship.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ship = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TURN_SPEED = 360;

var Ship =
/*#__PURE__*/
function (_Dna$Component) {
  _inherits(Ship, _Dna$Component);

  function Ship(shipPrefab, keyboard, shootCooldown) {
    var _this;

    _classCallCheck(this, Ship);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Ship).call(this));
    _this.shipPrefab = shipPrefab;
    _this.keyboard = keyboard;
    _this.shootCooldownMax = shootCooldown;
    _this.shootCooldown = 0;
    return _this;
  }

  _createClass(Ship, [{
    key: "update",
    value: function update(deltaTime) {
      this.shootCooldown -= deltaTime;

      if (this.keyboard.left) {
        this.shipPrefab.transform.rotation.addDegrees(-TURN_SPEED * deltaTime);
      }

      if (this.keyboard.right) {
        this.shipPrefab.transform.rotation.addDegrees(TURN_SPEED * deltaTime);
      }

      if (this.keyboard.up) {
        this.shipPrefab.toggleThruster(true);
      } else {
        this.shipPrefab.toggleThruster(false);
      }

      if (this.keyboard.primary && this.canShoot()) {
        this.shipPrefab.shoot();
        this.shootCooldown = this.shootCooldownMax;
      }

      if (this.shipPrefab.thrusting) {
        this.shipPrefab.acceleration.active = true;
        this.shipPrefab.acceleration.angle = new Dna.Utilities.Radians(this.shipPrefab.transform.rotation.radians);
      } else {
        this.shipPrefab.acceleration.active = false;
      }
    }
  }, {
    key: "canShoot",
    value: function canShoot() {
      return this.shootCooldown < 0;
    }
  }]);

  return Ship;
}(Dna.Component);

exports.Ship = Ship;
},{}],"demos/astroids/Rollover.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rollover = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Rollover =
/*#__PURE__*/
function (_Dna$Component) {
  _inherits(Rollover, _Dna$Component);

  function Rollover(r) {
    var _this;

    _classCallCheck(this, Rollover);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Rollover).call(this));
    _this.r = r;
    return _this;
  }

  _createClass(Rollover, [{
    key: "update",
    value: function update(deltaTime) {
      var canvas = this.gameObject.getCanvas();

      if (this.gameObject.transform.x < -canvas.transform.width / 2 - this.r) {
        this.gameObject.transform.x = canvas.transform.width / 2 + this.r;
      } else if (this.gameObject.transform.x > canvas.transform.width / 2 + this.r) {
        this.gameObject.transform.x = -canvas.transform.width / 2;
      }

      if (this.gameObject.transform.y < -canvas.transform.height / 2 - this.r) {
        this.gameObject.transform.y = canvas.transform.height / 2 + this.r;
      } else if (this.gameObject.transform.y > canvas.transform.height / 2 + this.r) {
        this.gameObject.transform.y = -canvas.transform.height / 2;
      }
    }
  }]);

  return Rollover;
}(Dna.Component);

exports.Rollover = Rollover;
},{}],"demos/astroids/Bullet.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bullet = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Bullet =
/*#__PURE__*/
function (_Dna$Component) {
  _inherits(Bullet, _Dna$Component);

  function Bullet(physics, maxDistance) {
    var _this;

    _classCallCheck(this, Bullet);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Bullet).call(this));
    _this.physics = physics;
    _this.distanceTraveled = 0;
    _this.maxDistance = maxDistance;
    return _this;
  }

  _createClass(Bullet, [{
    key: "update",
    value: function update(deltaTime) {
      this.distanceTraveled += this.physics.distanceTraveled.total;

      if (this.distanceTraveled >= this.maxDistance) {
        this.gameObject.destroy();
      }
    }
  }]);

  return Bullet;
}(Dna.Component);

exports.Bullet = Bullet;
},{}],"demos/astroids/BulletPrefab.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletPrefab = void 0;

var _Rollover = require("./Rollover");

var _Bullet = require("./Bullet");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var BULLET_SPEED = 5;
var BULLET_RADIUS = 2;
var BULLET_DISTANCE = 500;

var BulletPrefab =
/*#__PURE__*/
function (_Dna$GameObject) {
  _inherits(BulletPrefab, _Dna$GameObject);

  function BulletPrefab(parent, position, angle, astroidHurtboxes) {
    var _this;

    _classCallCheck(this, BulletPrefab);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BulletPrefab).call(this, parent, position, [new Dna.Components.Polygon({
      radius: BULLET_RADIUS
    }), new _Rollover.Rollover(BULLET_RADIUS)]));
    var physics = new Dna.Components.Physics({
      speed: BULLET_SPEED,
      angle: angle
    });

    _this.addComponent(physics);

    _this.addComponent(new _Bullet.Bullet(physics, BULLET_DISTANCE));

    var hitbox = new Dna.Components.Hitcircle({
      radius: BULLET_RADIUS,
      hurtboxes: astroidHurtboxes,
      onCollisionEnter: function onCollisionEnter(astroid) {
        _this.destroy();

        astroid.gameObject.destroy();
      }
    });

    _this.addComponent(hitbox);

    return _this;
  }

  return BulletPrefab;
}(Dna.GameObject);

exports.BulletPrefab = BulletPrefab;
},{"./Rollover":"demos/astroids/Rollover.js","./Bullet":"demos/astroids/Bullet.js"}],"demos/astroids/ShipPrefab.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipPrefab = void 0;

var _Triangle = require("./Triangle");

var _Ship = require("./Ship");

var _Rollover = require("./Rollover");

var _BulletPrefab = require("./BulletPrefab");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var SHIP_COLOR = "black";
var SHIP_SIZE = 30;
var FRICTION = 0.01;
var TURN_SPEED = 360; // degrees per second

var SHIP_RADIUS = SHIP_SIZE / 2;
var SHIP_THRUST = 0.1;
var SHOOT_COOLDOWN = 0.5;

var ShipPrefab =
/*#__PURE__*/
function (_Dna$GameObject) {
  _inherits(ShipPrefab, _Dna$GameObject);

  function ShipPrefab(parent, keyboard, astroidHurtboxes) {
    var _this;

    _classCallCheck(this, ShipPrefab);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ShipPrefab).call(this, parent, {}, [new _Triangle.Triangle({
      size: SHIP_SIZE,
      stroke: SHIP_COLOR
    }), new _Rollover.Rollover(SHIP_RADIUS) //new Dna.Components.Text({ text: "shipship" })
    ]));
    _this.ship = new _Ship.Ship(_assertThisInitialized(_assertThisInitialized(_this)), keyboard, SHOOT_COOLDOWN);

    _this.addComponent(_this.ship);

    var physics = new Dna.Components.SimplePhysics();

    _this.addComponent(physics);

    _this.acceleration = new Dna.Components.Acceleration(physics, {
      accel: SHIP_THRUST,
      //ya: SHIP_THRUST,
      friction: FRICTION
    });

    _this.addComponent(_this.acceleration);

    _this.hurtbox = new Dna.Components.Hitcircle({
      radius: SHIP_RADIUS
    });

    _this.addComponent(_this.hurtbox);

    _this.thrusting = false;
    _this.thruster = new Dna.GameObject(_assertThisInitialized(_assertThisInitialized(_this)), {
      y: SHIP_SIZE * 0.75
    }, [new _Triangle.Triangle({
      size: SHIP_RADIUS,
      stroke: "yellow",
      fill: "red"
    })]);

    _this.thruster.setActive(false);

    _this.astroidHurtboxes = astroidHurtboxes;
    return _this;
  }

  _createClass(ShipPrefab, [{
    key: "toggleThruster",
    value: function toggleThruster(thrusterToggle) {
      this.thrusting = thrusterToggle;
      this.thruster.setActive(thrusterToggle);
    }
  }, {
    key: "shoot",
    value: function shoot() {
      var radians = this.transform.rotation.radians;
      var bullet = new _BulletPrefab.BulletPrefab(this.parent, {
        x: this.transform.x + 4 / 3 * SHIP_RADIUS * Math.sin(radians),
        y: this.transform.y - 4 / 3 * SHIP_RADIUS * Math.cos(radians)
      }, new Dna.Utilities.Radians(this.transform.rotation.radians), //radians,
      this.astroidHurtboxes);
    }
  }, {
    key: "die",
    value: function die() {
      //TODO explode, remove a life, sound, etc
      console.log("ship dying");
    }
  }]);

  return ShipPrefab;
}(Dna.GameObject);

exports.ShipPrefab = ShipPrefab;
},{"./Triangle":"demos/astroids/Triangle.js","./Ship":"demos/astroids/Ship.js","./Rollover":"demos/astroids/Rollover.js","./BulletPrefab":"demos/astroids/BulletPrefab.js"}],"demos/astroids/Astroid.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Astroid = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Astroid =
/*#__PURE__*/
function (_Dna$Component) {
  _inherits(Astroid, _Dna$Component);

  function Astroid(astroidPrefab) {
    var _this;

    _classCallCheck(this, Astroid);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Astroid).call(this));
    _this.astroidPrefab = astroidPrefab;
    return _this;
  }

  _createClass(Astroid, [{
    key: "onDestroy",
    value: function onDestroy() {
      this.astroidPrefab.destroyAstroid();
    }
  }]);

  return Astroid;
}(Dna.Component);

exports.Astroid = Astroid;
},{}],"demos/astroids/AstroidPrefab.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AstroidPrefab = void 0;

var _Rollover = require("./Rollover");

var _Astroid = require("./Astroid");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var ASTROID_SPEED = 5; // max starting speed

var ASTROID_VERT = 10; // average num of verticies on each astroid

var ASTROID_JAG = 0.4; // jaggedness of astroids

var ASTROID_POINTS_LARGE = 20;
var ASTROID_POINTS_MEDIUM = 50;
var ASTROID_POINTS_SMALL = 100;
var ASTROID_LARGE = 50;
var ASTROID_MEDIUM = 25;
var ASTROID_SMALL = 12;

var AstroidPrefab =
/*#__PURE__*/
function (_Dna$GameObject) {
  _inherits(AstroidPrefab, _Dna$GameObject);

  function AstroidPrefab(parent, position, level, shipHurtbox, astroidHurtboxes) {
    var _this;

    var r = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : ASTROID_LARGE;

    _classCallCheck(this, AstroidPrefab);

    var levelMultiplier = 1 + 0.1 * level;
    _this = _possibleConstructorReturn(this, _getPrototypeOf(AstroidPrefab).call(this, parent, position, [new Dna.Components.Polygon({
      radius: r,
      vert: Math.floor(Math.random() * (ASTROID_VERT + 1) + ASTROID_VERT / 2),
      jaggedness: ASTROID_JAG
    }), new Dna.Components.Hitcircle({
      radius: r,
      hurtboxes: shipHurtbox,
      hitboxSet: astroidHurtboxes,
      onCollisionEnter: function onCollisionEnter(ship) {
        ship.gameObject.die();
      }
    }), //TODO regular physics class would make more sense here
    new Dna.Components.SimplePhysics({
      xv: (Math.random() - 0.5) * ASTROID_SPEED * levelMultiplier,
      yv: (Math.random() - 0.5) * ASTROID_SPEED * levelMultiplier
    }), new _Rollover.Rollover(r)]));
    var astroid = new _Astroid.Astroid(_assertThisInitialized(_assertThisInitialized(_this)));

    _this.addComponent(astroid);

    _this.r = r; //TODO store as size??

    _this.level = level;
    _this.shipHurtbox = shipHurtbox;
    _this.astroidHurtboxes = astroidHurtboxes;
    _this.hurtbox = new Dna.Components.Hitcircle({
      radius: r
    });

    _this.addComponent(_this.hurtbox);

    return _this;
  } //TODO this should be in astroids component, need way to access


  _createClass(AstroidPrefab, [{
    key: "destroyAstroid",
    value: function destroyAstroid() {
      var points = 0;

      if (this.r == ASTROID_LARGE) {
        new AstroidPrefab(this.parent, {
          x: this.transform.x,
          y: this.transform.y
        }, this.level, this.shipHurtbox, this.astroidHurtboxes, ASTROID_MEDIUM);
        new AstroidPrefab(this.parent, {
          x: this.transform.x,
          y: this.transform.y
        }, this.level, this.shipHurtbox, this.astroidHurtboxes, ASTROID_MEDIUM);
        points = ASTROID_POINTS_LARGE;
      } else if (this.r == ASTROID_MEDIUM) {
        new AstroidPrefab(this.parent, {
          x: this.transform.x,
          y: this.transform.y
        }, this.level, this.shipHurtbox, this.astroidHurtboxes, ASTROID_SMALL);
        new AstroidPrefab(this.parent, {
          x: this.transform.x,
          y: this.transform.y
        }, this.level, this.shipHurtbox, this.astroidHurtboxes, ASTROID_SMALL);
        points = ASTROID_POINTS_MEDIUM;
      } else {
        points = ASTROID_POINTS_SMALL;
      } //TODO check victory condition


      return points;
    }
  }]);

  return AstroidPrefab;
}(Dna.GameObject);

exports.AstroidPrefab = AstroidPrefab;
},{"./Rollover":"demos/astroids/Rollover.js","./Astroid":"demos/astroids/Astroid.js"}],"demos/astroids/astroids.js":[function(require,module,exports) {
"use strict";

var _ShipPrefab = require("./ShipPrefab");

var _AstroidPrefab = require("./AstroidPrefab");

var NUM_ASTROIDS = 4;
var ASTROID_SIZE = 100;
var canvas = new Dna.Canvas(document.getElementById("canvas"));
var input = {
  87: "up",
  83: "down",
  65: "left",
  68: "right",
  32: "primary" //up: 87,
  //down: 83,
  //left: 65,
  //right: 68,
  //primary: 32
  //secondary: 17

};
var keyboard = new Dna.Input.Keyboard(input);
var level = 0;
var astroids = [];
var astroidHurtboxes = [];
var ship = new _ShipPrefab.ShipPrefab(canvas, keyboard, astroidHurtboxes);
var shiphurtbox = [ship.hurtbox]; //TODO function of transform?

function distBetweenPoints(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

createAstroidBelt(canvas);

function createAstroidBelt(canvas) {
  astroids = []; //astroidsTotal = (NUM_ASTROIDS + level) * 7;
  //astroidsLeft = astroidsTotal;

  var domCanvas = canvas.getContext().canvas;
  var x, y;
  var dist;

  for (var i = 0; i < NUM_ASTROIDS + level; i++) {
    do {
      x = Math.random() * domCanvas.width - domCanvas.width / 2;
      y = Math.random() * domCanvas.height - domCanvas.height / 2; //TODO should use absolute distance

      dist = distBetweenPoints(ship.transform.x, ship.transform.y, x, y);
    } while (dist < ASTROID_SIZE + ship.r);

    astroids.push(new _AstroidPrefab.AstroidPrefab(canvas, {
      x: x,
      y: y
    }, level, shiphurtbox, astroidHurtboxes));
  }
}
},{"./ShipPrefab":"demos/astroids/ShipPrefab.js","./AstroidPrefab":"demos/astroids/AstroidPrefab.js"}],"C:/Users/David/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54877" + '/');

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
},{}]},{},["C:/Users/David/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","demos/astroids/astroids.js"], null)
//# sourceMappingURL=/astroids.1c324dd4.map