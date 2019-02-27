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
})({"demos/platformer/assets/hero/hero.png":[function(require,module,exports) {
module.exports = "/hero.d1718518.png";
},{}],"demos/platformer/assets/hero/hero_run.png":[function(require,module,exports) {
module.exports = "/hero_run.c72dbb97.png";
},{}],"demos/platformer/Hero.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hero = void 0;

var _hero = _interopRequireDefault(require("./assets/hero/hero.png"));

var _hero_run = _interopRequireDefault(require("./assets/hero/hero_run.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SPRITE_WIDTH = 50;
var SPRITE_HEIGHT = 37;
var WIDTH = 20;
var HEIGHT = 37;
var default_sprite = {
  width: SPRITE_WIDTH,
  height: SPRITE_HEIGHT
};
var heroRunImage = new Image();
heroRunImage.src = _hero_run.default;
var hero_run = {
  image: heroRunImage,
  loop: true,
  numberOfFrames: 6,
  ticksPerFrame: 5,
  startingColumn: 0,
  startingRow: 0 //framesPerRow: 6

};
var heroImage = new Image();
heroImage.src = _hero.default;
var hero_idle = {
  image: heroImage,
  loop: true,
  numberOfFrames: 4,
  ticksPerFrame: 5,
  startingColumn: 3,
  startingRow: 5,
  framesPerRow: 7
};
var hero_fall = {
  image: heroImage,
  loop: true,
  //onFinish: function() {},
  numberOfFrames: 2,
  ticksPerFrame: 5,
  startingColumn: 1,
  startingRow: 3,
  framesPerRow: 7
};
var hero_jump = {
  image: heroImage,
  loop: false,
  onFinish: function onFinish(image) {
    image.updateOptions(hero_fall);
  },
  numberOfFrames: 7,
  ticksPerFrame: 3,
  startingColumn: 1,
  startingRow: 2,
  framesPerRow: 7,
  frameIndex: 0
};
var hero_slash = {
  image: heroImage,
  loop: false,
  onFinish: function onFinish(image) {
    image.updateOptions(hero_slash2);
    image.gameObject.attackingPosition.addComponent(image.gameObject.attackingHitbox);
  },
  numberOfFrames: 1,
  ticksPerFrame: 5,
  startingColumn: 1,
  startingRow: 6,
  framesPerRow: 7,
  frameIndex: 0
};
var hero_slash2 = {
  image: heroImage,
  loop: false,
  onFinish: function onFinish(image) {
    //image.gameObject.finishAttack();
    image.updateOptions(hero_slash3);
    image.gameObject.attackingPosition.removeComponent(image.gameObject.attackingHitbox);
  },
  numberOfFrames: 1,
  ticksPerFrame: 5,
  startingColumn: 2,
  startingRow: 6,
  framesPerRow: 7,
  frameIndex: 0
};
var hero_slash3 = {
  image: heroImage,
  loop: false,
  onFinish: function onFinish(image) {
    image.gameObject.finishAttack();
  },
  numberOfFrames: 2,
  ticksPerFrame: 5,
  startingColumn: 3,
  startingRow: 6,
  framesPerRow: 7,
  frameIndex: 0
};
var SPEED = 3;
var JUMP_SPEED = 12;
var GRAVITY = 0.5;

var HeroComponent =
/*#__PURE__*/
function (_Dna$Component) {
  _inherits(HeroComponent, _Dna$Component);

  function HeroComponent(physics) {
    var _this;

    _classCallCheck(this, HeroComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HeroComponent).call(this)); //TODO handle mouse input

    var input = {
      //wasd
      //up: 87,
      //down: 83,
      65: "left",
      68: "right",
      32: "jump",
      17: "attack" //left: 65,
      //right: 68,
      //jump: 32, // space
      //attack: 17 // ctrl
      //arrowkeys
      //up: 38,
      //down: 40,
      //left: 37,
      //right: 39,
      //jump: 90, // z
      //attack: 88 // x
      //secondary: 17

    };
    var onKeyDown = {
      32: function _() {
        _this.jump();
      }
    };
    _this.keyboard = new Dna.Input.Keyboard(input, onKeyDown);
    _this.physics = physics;
    _this.attacking = false;
    return _this;
  }

  _createClass(HeroComponent, [{
    key: "update",
    value: function update(deltaTime) {
      //console.log(this.gameObject.attackingHitbox);
      var x = 0;
      if (this.keyboard.left) x -= 1;
      if (this.keyboard.right) x += 1;
      this.physics.xv = x * SPEED;

      if (x < 0) {
        this.gameObject.transform.xScale = -1;
      } else if (x > 0) {
        this.gameObject.transform.xScale = 1;
      }

      if (!this.gameObject.attacking && this.gameObject.grounded) {
        if (x == 0) {
          this.gameObject.image.updateOptions(hero_idle);
        } else {
          this.gameObject.image.updateOptions(hero_run);
        }
      }

      if (this.keyboard.attack) {
        if (!this.gameObject.attacking) {
          this.gameObject.attack();
        }
      }
    }
  }, {
    key: "jump",
    value: function jump() {
      console.log(this);

      if (this.gameObject.grounded) {
        this.physics.yv = -JUMP_SPEED;
        this.gameObject.grounded = false;
        this.gameObject.gravity.active = true;
        this.gameObject.image.updateOptions(hero_jump);
      }
    }
  }]);

  return HeroComponent;
}(Dna.Component);

var Hero =
/*#__PURE__*/
function (_Dna$GameObject) {
  _inherits(Hero, _Dna$GameObject);

  function Hero(parent, position, enemyHurtboxes) {
    var _this2;

    _classCallCheck(this, Hero);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Hero).call(this, parent, position, [])); //this.grounded;

    _this2.image = new Dna.Components.Image(default_sprite);

    _this2.image.updateOptions(hero_idle);

    _this2.addComponent(_this2.image);

    _this2.physics = new Dna.Components.SimplePhysics();

    _this2.addComponent(_this2.physics);

    _this2.gravity = new Dna.Components.Acceleration(_this2.physics, {
      angle: Dna.Utilities.Degrees.DOWN,
      accel: GRAVITY
    });

    _this2.addComponent(_this2.gravity);

    _this2.hurtbox = new Dna.Components.Hitbox({
      width: WIDTH,
      height: HEIGHT
    });

    _this2.addComponent(_this2.hurtbox);

    _this2.addComponent(new HeroComponent(_this2.physics)); // this is not added to the gameObject until the attack is triggered


    _this2.attackingPosition = new Dna.GameObject(_assertThisInitialized(_assertThisInitialized(_this2)), {
      x: 15
    });
    _this2.attackingHitbox = new Dna.Components.Hitbox({
      width: 10,
      height: 20,
      hurtboxes: enemyHurtboxes,
      onCollision: function onCollision(hurtbox) {
        console.log("attack hit!!");
      },
      onCollisionEnter: function onCollisionEnter(hurtbox) {
        console.log("enter attack hit!!");
      }
    });
    return _this2;
  }

  _createClass(Hero, [{
    key: "attack",
    value: function attack() {
      this.attacking = true;
      console.log("attacking"); //this.attackingPosition.addComponent(this.attackingHitbox);

      this.image.updateOptions(hero_slash);
      console.log(hero_slash.loop); //TODO may want to use a timeout here, instead of animation on finish
      //setTimeout(() => {
      //  this.gameObject.finishAttack();
      //}, 500);
    }
  }, {
    key: "finishAttack",
    value: function finishAttack() {
      console.log(this);
      this.attacking = false; //this.attackingPosition.removeComponent(this.attackingHitbox);

      console.log("finishing attack"); //TODO this should be based on hero's current state

      this.image.updateOptions(hero_idle);
      this.attackingHitbox.clearCollisions();
    }
  }, {
    key: "ground",
    value: function ground() {
      this.grounded = true;
      this.gravity.active = false;
      this.physics.yv = 0;
    }
  }, {
    key: "unground",
    value: function unground() {
      this.grounded = false;
      this.gravity.active = true;
      console.log("unground");
    }
  }]);

  return Hero;
}(Dna.GameObject);

exports.Hero = Hero;
},{"./assets/hero/hero.png":"demos/platformer/assets/hero/hero.png","./assets/hero/hero_run.png":"demos/platformer/assets/hero/hero_run.png"}],"demos/platformer/Boundary.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Alignments = exports.Boundary = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

//TODO should not use hitboxes for this, doens't account for condition where unit moves past boundary in single frame
//TODO axis-aligned bounding box
var Boundary =
/*#__PURE__*/
function (_Dna$GameObject) {
  _inherits(Boundary, _Dna$GameObject);

  function Boundary(parent, alignment, offset, width, height, hurtboxes) {
    var _this;

    _classCallCheck(this, Boundary);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Boundary).call(this, parent, alignment.getPosition(offset), [new Dna.Components.Rectangle({
      width: width,
      height: height
    })]));
    var hitbox = new Dna.Components.Hitbox({
      width: width,
      height: height,
      hurtboxes: hurtboxes,
      onCollision: alignment.onCollision
    });

    _this.addComponent(hitbox);

    return _this;
  }

  return Boundary;
}(Dna.GameObject); //TODO this offset logic is jank


exports.Boundary = Boundary;
var Alignments = {
  TOP: {
    getPosition: function getPosition(offset) {
      return {
        y: offset
      };
    },
    onCollision: function onCollision(hurtbox) {
      //TODO set absolute
      var offset = hurtbox.radius || hurtbox.height / 2;
      hurtbox.gameObject.transform.y = this.gameObject.transform.y + this.height / 2 + offset;
      console.log("collision detected");
    }
  },
  BOTTOM: {
    getPosition: function getPosition(offset) {
      return {
        y: offset
      };
    },
    onCollision: function onCollision(hurtbox) {
      //TODO set absolute
      var offset = hurtbox.radius || hurtbox.height / 2;
      hurtbox.gameObject.transform.y = this.gameObject.transform.y - this.height / 2 - offset;
      hurtbox.gameObject.ground();
    },
    onCollisionExit: function onCollisionExit(hurtbox) {
      console.log("onCollisionExit");
      hurtbox.gameObject.unground();
    }
  },
  LEFT: {
    getPosition: function getPosition(offset) {
      return {
        x: offset
      };
    },
    onCollision: function onCollision(hurtbox) {
      //TODO set absolute
      var offset = hurtbox.radius || hurtbox.width / 2;
      hurtbox.gameObject.transform.x = this.gameObject.transform.x + this.width / 2 + offset;
    }
  },
  RIGHT: {
    getPosition: function getPosition(offset) {
      return {
        x: offset
      };
    },
    onCollision: function onCollision(hurtbox) {
      //TODO set absolute
      var offset = hurtbox.radius || hurtbox.width / 2;
      hurtbox.gameObject.transform.x = this.gameObject.transform.x - this.width / 2 - offset;
    }
  }
};
exports.Alignments = Alignments;
},{}],"demos/platformer/Platform.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Platform = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var WIDTH = 100;
var HEIGHT = 10;

var Platform =
/*#__PURE__*/
function (_Dna$GameObject) {
  _inherits(Platform, _Dna$GameObject);

  function Platform(parent, position, hurtboxes) {
    var _this;

    _classCallCheck(this, Platform);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Platform).call(this, parent, position, [new Dna.Components.Rectangle({
      width: WIDTH,
      height: HEIGHT
    })]));
    var hitbox = new Dna.Components.Hitbox({
      width: WIDTH,
      height: HEIGHT,
      hurtboxes: hurtboxes,
      onCollision: function onCollision(hurtbox) {
        var hurtboxOffset = hurtbox.radius || hurtbox.height / 2;
        var yOffset = this.gameObject.transform.y - HEIGHT / 2 - hurtboxOffset; //TODO this should be less than, but is still affected by gravity????

        if (hurtbox.gameObject.transform.prevY <= yOffset) {
          hurtbox.gameObject.transform.y = yOffset;
          hurtbox.gameObject.ground();
        }
      },
      onCollisionExit: function onCollisionExit(hurtbox) {
        console.log("onCollisionExit");
        hurtbox.gameObject.unground();
      }
    });

    _this.addComponent(hitbox);

    return _this;
  }

  return Platform;
}(Dna.GameObject);

exports.Platform = Platform;
},{}],"demos/platformer/Target.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Target = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SIZE = 20; //TODO should have a physics component to prevent it from falling through the floor

var Target =
/*#__PURE__*/
function (_Dna$GameObject) {
  _inherits(Target, _Dna$GameObject);

  function Target(parent, position, enemyHurtboxes) {
    _classCallCheck(this, Target);

    return _possibleConstructorReturn(this, _getPrototypeOf(Target).call(this, parent, position, [new Dna.Components.Rectangle({
      width: SIZE,
      height: SIZE
    }), new Dna.Components.Hitbox({
      width: SIZE,
      height: SIZE,
      hitboxSet: enemyHurtboxes
    })]));
  }

  return Target;
}(Dna.GameObject);

exports.Target = Target;
},{}],"demos/platformer/Monster.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Facing = exports.AI = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SPEED = 1;

var AI =
/*#__PURE__*/
function (_Dna$Component) {
  _inherits(AI, _Dna$Component);

  function AI(hero, attackRange) {
    var _this;

    _classCallCheck(this, AI);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AI).call(this));
    _this.hero = hero; //this.physics = physics;

    _this.attackRange = attackRange;
    _this.attacking = false;
    return _this;
  }

  _createClass(AI, [{
    key: "update",
    value: function update(deltaTime) {
      var distance = this.gameObject.transform.x - this.hero.transform.x;
      if (this.attacking) return;

      if (Math.abs(distance) < this.attackRange) {
        this.gameObject.attack();
      } else {
        //TODO move
        var move = distance > 0 ? -SPEED : SPEED;
        this.gameObject.transform.x += move;
      }
    }
  }, {
    key: "attack",
    value: function attack() {
      this.attacking = true;
    }
  }, {
    key: "endAttack",
    value: function endAttack() {
      this.attacking = false;
    }
  }]);

  return AI;
}(Dna.Component);

exports.AI = AI;

var Facing =
/*#__PURE__*/
function (_Dna$Component2) {
  _inherits(Facing, _Dna$Component2);

  function Facing(hero, imageObject) {
    var _this2;

    _classCallCheck(this, Facing);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Facing).call(this));
    _this2.hero = hero;
    _this2.imageObject = imageObject;
    return _this2;
  }

  _createClass(Facing, [{
    key: "update",
    value: function update() {
      //console.log(this.gameObject.transform);
      var distance = this.gameObject.transform.x - this.hero.transform.x;
      this.imageObject.transform.xScale = distance > 0 ? -1 : 1;
    }
  }]);

  return Facing;
}(Dna.Component);

exports.Facing = Facing;
},{}],"demos/platformer/assets/zombiegirl/attack.png":[function(require,module,exports) {
module.exports = "/attack.177d6950.png";
},{}],"demos/platformer/assets/zombiegirl/dead.png":[function(require,module,exports) {
module.exports = "/dead.cca2baf3.png";
},{}],"demos/platformer/assets/zombiegirl/idle.png":[function(require,module,exports) {
module.exports = "/idle.e6eba50b.png";
},{}],"demos/platformer/assets/zombiegirl/walk.png":[function(require,module,exports) {
module.exports = "/walk.4af18103.png";
},{}],"demos/platformer/Zombie.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Zombie = void 0;

var _Monster = require("./Monster");

var _attack = _interopRequireDefault(require("./assets/zombiegirl/attack.png"));

var _dead = _interopRequireDefault(require("./assets/zombiegirl/dead.png"));

var _idle = _interopRequireDefault(require("./assets/zombiegirl/idle.png"));

var _walk = _interopRequireDefault(require("./assets/zombiegirl/walk.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var ZOMBIE_DEFAULT = {
  type: Dna.Components.Image.types.stretched,
  width: 521,
  height: 576,
  ticksPerFrame: 10,
  destWidth: 521 / 6,
  destHeight: 576 / 6
};
var girlAttackImage = new Image();
girlAttackImage.src = _attack.default;
var girlAttack = {
  image: girlAttackImage,
  loop: false,
  numberOfFrames: 8
};
var girlWalkImage = new Image();
girlWalkImage.src = _walk.default;
var girlWalk = {
  image: girlWalkImage,
  loop: true,
  numberOfFrames: 10
};

var Zombie =
/*#__PURE__*/
function (_Dna$GameObject) {
  _inherits(Zombie, _Dna$GameObject);

  function Zombie(canvas, position, hero, heroHurtbox, monsterHurtboxes) {
    var _this;

    _classCallCheck(this, Zombie);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Zombie).call(this, canvas, position, [new _Monster.AI(hero, 10)]));
    var image = new Dna.Components.Image(ZOMBIE_DEFAULT);
    image.updateOptions(girlWalk);
    var imageObject = new Dna.GameObject(_assertThisInitialized(_assertThisInitialized(_this)), {}, [image]);

    _this.addComponent(new _Monster.Facing(hero, imageObject));

    return _this;
  }

  _createClass(Zombie, [{
    key: "attack",
    value: function attack() {
      console.log("attacking"); //TODO change animation
      //TODO hitboxes
    }
  }]);

  return Zombie;
}(Dna.GameObject);

exports.Zombie = Zombie;
},{"./Monster":"demos/platformer/Monster.js","./assets/zombiegirl/attack.png":"demos/platformer/assets/zombiegirl/attack.png","./assets/zombiegirl/dead.png":"demos/platformer/assets/zombiegirl/dead.png","./assets/zombiegirl/idle.png":"demos/platformer/assets/zombiegirl/idle.png","./assets/zombiegirl/walk.png":"demos/platformer/assets/zombiegirl/walk.png"}],"demos/platformer/platformer.js":[function(require,module,exports) {
"use strict";

var _Hero = require("./Hero");

var _Boundary = require("./Boundary");

var _Platform = require("./Platform");

var _Target = require("./Target");

var _Zombie = require("./Zombie");

var RADIUS = 20;
var canvas = new Dna.Canvas(document.getElementById("canvas"));
var gravity = new Dna.Components.SimplePhysics({
  xy: 5
});
var enemyHurtboxes = [];
new _Target.Target(canvas, {
  y: 225
}, enemyHurtboxes);
var hero = new _Hero.Hero(canvas, {}, enemyHurtboxes);
var hurtboxes = [hero.hurtbox];
var zombie0 = new _Zombie.Zombie(canvas, {}, hero, hurtboxes, enemyHurtboxes);
new _Platform.Platform(canvas, {
  y: 150,
  x: -100
}, hurtboxes);
new _Platform.Platform(canvas, {
  y: 150,
  x: 100
}, hurtboxes);
new _Platform.Platform(canvas, {
  y: 50
}, hurtboxes);
var SHORT = 10;
var X_LONG = 500;
var Y_LONG = 700;
var X_OFFSET = 350;
var Y_OFFSET = 250;
var topBoundary = new _Boundary.Boundary(canvas, _Boundary.Alignments.TOP, -Y_OFFSET, Y_LONG, SHORT, hurtboxes);
var bottomBoundary = new _Boundary.Boundary(canvas, _Boundary.Alignments.BOTTOM, Y_OFFSET, Y_LONG, SHORT, hurtboxes);
var leftBoundary = new _Boundary.Boundary(canvas, _Boundary.Alignments.LEFT, -X_OFFSET, SHORT, X_LONG, hurtboxes);
var rightBoundary = new _Boundary.Boundary(canvas, _Boundary.Alignments.RIGHT, X_OFFSET, SHORT, X_LONG, hurtboxes);
},{"./Hero":"demos/platformer/Hero.js","./Boundary":"demos/platformer/Boundary.js","./Platform":"demos/platformer/Platform.js","./Target":"demos/platformer/Target.js","./Zombie":"demos/platformer/Zombie.js"}],"C:/Users/David/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54870" + '/');

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
},{}]},{},["C:/Users/David/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","demos/platformer/platformer.js"], null)
//# sourceMappingURL=/platformer.5c1dea86.map