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
})({"demos/shooter/ImageAngle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageAngle = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ImageAngle =
/*#__PURE__*/
function (_Dna$Component) {
  _inherits(ImageAngle, _Dna$Component);

  function ImageAngle(image, angle, options, defaultXScale) {
    var _this;

    _classCallCheck(this, ImageAngle);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ImageAngle).call(this));
    _this.image = image;
    _this.angle = angle;
    _this.options = options;
    _this.defaultXScale = defaultXScale;
    console.log(_this.options);
    _this.offset = Math.PI / _this.options.length;
    return _this;
  }

  _createClass(ImageAngle, [{
    key: "update",
    value: function update(deltaTime) {
      var angle = (this.angle.radians % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
      var increment = Math.PI * 2 / this.options.length;
      var index = (Math.floor((angle + this.offset) / increment) + this.options.length) % this.options.length;
      this.image.updateOptions(this.options[index]); //console.log(this.image.height);
      //console.log(this.image.width);

      this.image.gameObject.transform.xScale = angle < Math.PI ? this.defaultXScale : -this.defaultXScale;
    }
  }]);

  return ImageAngle;
}(Dna.Component);

exports.ImageAngle = ImageAngle;
},{}],"demos/shooter/GunState.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GunState = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GunState = function GunState(gunData) {
  _classCallCheck(this, GunState);

  this.gunData = gunData;
  this.audio = new Dna.Components.Audio({
    volume: 0.1
  });
  this.reloading = false;
  this.clipAmmo = gunData.clipSize;
  this.extraAmmo = gunData.extraAmmo;
};

exports.GunState = GunState;
},{}],"demos/shooter/assets/sounds/gun_hit.wav":[function(require,module,exports) {
module.exports = "/gun_hit.bdfce109.wav";
},{}],"demos/shooter/Bullet.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bullet = void 0;

var _gun_hit = _interopRequireDefault(require("./assets/sounds/gun_hit.wav"));

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

var SPEED = 5;
var RADIUS = 2; //const MAX_DISTANCE = 500;

var DAMAGE = 10;
var audio = new Dna.Components.Audio({
  volume: 0.05
}); //TODO this should just be a physics tween

var BulletComponent =
/*#__PURE__*/
function (_Dna$Component) {
  _inherits(BulletComponent, _Dna$Component);

  function BulletComponent(physics, maxDistance) {
    var _this;

    _classCallCheck(this, BulletComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BulletComponent).call(this));
    _this.physics = physics; //this.distanceTraveled = 0;

    _this.maxDistance = maxDistance;
    _this.damage = DAMAGE;
    return _this;
  }

  _createClass(BulletComponent, [{
    key: "update",
    value: function update(deltaTime) {//this.distanceTraveled += this.physics.distanceTraveled.total;
      //if (this.distanceTraveled > this.maxDistance) {
      //  this.gameObject.destroy();
      //}
    }
  }]);

  return BulletComponent;
}(Dna.Component);

var Bullet =
/*#__PURE__*/
function (_Dna$GameObject) {
  _inherits(Bullet, _Dna$GameObject);

  function Bullet(parent, position, image, angle, hurtboxes, maxDistance) {
    var _this2;

    _classCallCheck(this, Bullet);

    //position.rotation = angle.addRadians(-Math.PI / 2);
    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Bullet).call(this, parent, position, [//new Dna.Components.Polygon({ radius: RADIUS, fillStyle: color })
      //new Dna.Components.Image({ image: image })
      //image
    ]));

    _this2.addGameObject(new Dna.GameObject(_assertThisInitialized(_assertThisInitialized(_this2)), {
      rotation: new Dna.Utilities.Radians(angle.radians - Math.PI / 2)
    }, [image]));

    var physics = new Dna.Components.Physics({
      speed: SPEED,
      angle: angle,
      maxDistance: maxDistance,
      callback: function callback() {
        _this2.destroy();
      }
    });

    _this2.addComponent(physics);

    var bullet = new BulletComponent(physics, maxDistance);

    _this2.addComponent(bullet); //TODO reverse this logic, keep track of bullet array in hero


    _this2.addComponent(new Dna.Components.Hitcircle({
      radius: RADIUS,
      hurtboxes: hurtboxes,
      onCollisionEnter: function onCollisionEnter(hurtbox) {
        _this2.destroy(); //audio.play(gunHit);


        hurtbox.gameObject.audio.play(_gun_hit.default);
        hurtbox.gameObject.unit.takeDamage(bullet.damage);
        hurtbox.gameObject.unit.knockback(_this2.transform.getCurrentDirection());
      }
    }));

    return _this2;
  }

  return Bullet;
}(Dna.GameObject);

exports.Bullet = Bullet;
},{"./assets/sounds/gun_hit.wav":"demos/shooter/assets/sounds/gun_hit.wav"}],"demos/shooter/assets/pistol/up.png":[function(require,module,exports) {
module.exports = "/up.c0307eb4.png";
},{}],"demos/shooter/assets/pistol/diagup.png":[function(require,module,exports) {
module.exports = "/diagup.95eb5552.png";
},{}],"demos/shooter/assets/pistol/side.png":[function(require,module,exports) {
module.exports = "/side.7bae048a.png";
},{}],"demos/shooter/assets/pistol/diagdown.png":[function(require,module,exports) {
module.exports = "/diagdown.cae1d8aa.png";
},{}],"demos/shooter/assets/pistol/down.png":[function(require,module,exports) {
module.exports = "/down.dd067c04.png";
},{}],"demos/shooter/assets/sounds/pistol_shoot.wav":[function(require,module,exports) {
module.exports = "/pistol_shoot.91dab88e.wav";
},{}],"demos/shooter/assets/sounds/gun_empty.wav":[function(require,module,exports) {
module.exports = "/gun_empty.df7523a4.wav";
},{}],"demos/shooter/assets/sounds/gun_reload.mp3":[function(require,module,exports) {
module.exports = "/gun_reload.1dec945f.mp3";
},{}],"demos/shooter/assets/bullets/bullet.png":[function(require,module,exports) {
module.exports = "/bullet.8736c3be.png";
},{}],"demos/shooter/assets/shotgun/up.png":[function(require,module,exports) {
module.exports = "/up.9a65feca.png";
},{}],"demos/shooter/assets/shotgun/diagup.png":[function(require,module,exports) {
module.exports = "/diagup.f51a08c4.png";
},{}],"demos/shooter/assets/shotgun/side.png":[function(require,module,exports) {
module.exports = "/side.72748257.png";
},{}],"demos/shooter/assets/shotgun/diagdown.png":[function(require,module,exports) {
module.exports = "/diagdown.96dad600.png";
},{}],"demos/shooter/assets/shotgun/down.png":[function(require,module,exports) {
module.exports = "/down.f0ea63d7.png";
},{}],"demos/shooter/assets/sounds/shotgun_shoot.wav":[function(require,module,exports) {
module.exports = "/shotgun_shoot.5d4f8750.wav";
},{}],"demos/shooter/assets/flamethrower/up.png":[function(require,module,exports) {
module.exports = "/up.c53e8f0e.png";
},{}],"demos/shooter/assets/flamethrower/diagup.png":[function(require,module,exports) {
module.exports = "/diagup.fa5b51a8.png";
},{}],"demos/shooter/assets/flamethrower/side.png":[function(require,module,exports) {
module.exports = "/side.f5678bcf.png";
},{}],"demos/shooter/assets/flamethrower/diagdown.png":[function(require,module,exports) {
module.exports = "/diagdown.e1200e0c.png";
},{}],"demos/shooter/assets/flamethrower/down.png":[function(require,module,exports) {
module.exports = "/down.05c66baf.png";
},{}],"demos/shooter/assets/bullets/flame.png":[function(require,module,exports) {
module.exports = "/flame.c149e728.png";
},{}],"demos/shooter/assets/sounds/flamethrower_shoot.wav":[function(require,module,exports) {
module.exports = "/flamethrower_shoot.257377a2.wav";
},{}],"demos/shooter/GunData.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Flamethrower = exports.Shotgun = exports.Pistol = void 0;

var _Bullet = require("./Bullet");

var _up = _interopRequireDefault(require("./assets/pistol/up.png"));

var _diagup = _interopRequireDefault(require("./assets/pistol/diagup.png"));

var _side = _interopRequireDefault(require("./assets/pistol/side.png"));

var _diagdown = _interopRequireDefault(require("./assets/pistol/diagdown.png"));

var _down = _interopRequireDefault(require("./assets/pistol/down.png"));

var _pistol_shoot = _interopRequireDefault(require("./assets/sounds/pistol_shoot.wav"));

var _gun_empty = _interopRequireDefault(require("./assets/sounds/gun_empty.wav"));

var _gun_reload = _interopRequireDefault(require("./assets/sounds/gun_reload.mp3"));

var _bullet = _interopRequireDefault(require("./assets/bullets/bullet.png"));

var _up2 = _interopRequireDefault(require("./assets/shotgun/up.png"));

var _diagup2 = _interopRequireDefault(require("./assets/shotgun/diagup.png"));

var _side2 = _interopRequireDefault(require("./assets/shotgun/side.png"));

var _diagdown2 = _interopRequireDefault(require("./assets/shotgun/diagdown.png"));

var _down2 = _interopRequireDefault(require("./assets/shotgun/down.png"));

var _shotgun_shoot = _interopRequireDefault(require("./assets/sounds/shotgun_shoot.wav"));

var _up3 = _interopRequireDefault(require("./assets/flamethrower/up.png"));

var _diagup3 = _interopRequireDefault(require("./assets/flamethrower/diagup.png"));

var _side3 = _interopRequireDefault(require("./assets/flamethrower/side.png"));

var _diagdown3 = _interopRequireDefault(require("./assets/flamethrower/diagdown.png"));

var _down3 = _interopRequireDefault(require("./assets/flamethrower/down.png"));

var _flame = _interopRequireDefault(require("./assets/bullets/flame.png"));

var _flamethrower_shoot = _interopRequireDefault(require("./assets/sounds/flamethrower_shoot.wav"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pistolUpImage = new Image();
pistolUpImage.src = _up.default;
var pistolUp = {
  width: 14,
  height: 12,
  image: pistolUpImage
};
var pistolDiagUpImage = new Image();
pistolDiagUpImage.src = _diagup.default;
var pistolDiagUp = {
  width: 14,
  height: 12,
  image: pistolDiagUpImage
};
var pistolSideImage = new Image();
pistolSideImage.src = _side.default;
var pistolSide = {
  width: 16,
  height: 8,
  image: pistolSideImage
};
var pistolDiagDownImage = new Image();
pistolDiagDownImage.src = _diagdown.default;
var pistolDiagDown = {
  width: 14,
  height: 11,
  image: pistolDiagDownImage
};
var pistolDownImage = new Image();
pistolDownImage.src = _down.default;
var pistolDown = {
  width: 14,
  height: 12,
  image: pistolDownImage
};
var bulletImage = new Image();
bulletImage.src = _bullet.default;
var bullet = new Dna.Components.Image({
  width: 6,
  height: 6,
  image: bulletImage
});
var Pistol = {
  name: "Pistol",
  shootClip: _pistol_shoot.default,
  emptyClip: _gun_empty.default,
  reloadClip: _gun_reload.default,
  //bulletImage: bulletImage,
  clipSize: 20,
  extraAmmo: 100,
  cooldown: 0.5,
  //cooldown: 500,
  //default option for ui and initialization?
  spriteOptions: [pistolUp, pistolDiagUp, pistolSide, pistolDiagDown, pistolDown, pistolDiagDown, pistolSide, pistolDiagUp],
  spread: new Dna.Utilities.Radians(Math.PI / 8),
  generateBullets: function generateBullets(gun, hurtboxes) {
    new _Bullet.Bullet(gun.getCanvas(), gun.transform.getAbsoluteCenter(), bullet, //new Dna.Utilities.Radians(gun.angle.radians),
    gun.angle.getNewAngle(this.spread), hurtboxes, 600);
  }
};
exports.Pistol = Pistol;
var shotgunUpImage = new Image();
shotgunUpImage.src = _up2.default;
var shotgunUp = {
  width: 8,
  height: 12,
  image: shotgunUpImage
};
var shotgunDiagUpImage = new Image();
shotgunDiagUpImage.src = _diagup2.default;
var shotgunDiagUp = {
  width: 14,
  height: 14,
  image: shotgunDiagUpImage
};
var shotgunSideImage = new Image();
shotgunSideImage.src = _side2.default;
var shotgunSide = {
  width: 18,
  height: 9,
  image: shotgunSideImage
};
var shotgunDiagDownImage = new Image();
shotgunDiagDownImage.src = _diagdown2.default;
var shotgunDiagDown = {
  width: 17,
  height: 10,
  image: shotgunDiagDownImage
};
var shotgunDownImage = new Image();
shotgunDownImage.src = _down2.default;
var shotgunDown = {
  width: 8,
  height: 12,
  image: shotgunDownImage
};
var Shotgun = {
  name: "Shotgun",
  shootClip: _shotgun_shoot.default,
  emptyClip: _gun_empty.default,
  reloadClip: _gun_reload.default,
  //bulletImage: bulletImage,
  clipSize: 8,
  extraAmmo: 50,
  cooldown: 1.5,
  //default option for ui and initialization?
  spriteOptions: [shotgunUp, shotgunDiagUp, shotgunSide, shotgunDiagDown, shotgunDown, shotgunDiagDown, shotgunSide, shotgunDiagUp],
  spread: new Dna.Utilities.Radians(Math.PI / 4),
  generateBullets: function generateBullets(gun, hurtboxes) {
    for (var i = 0; i < 4; i++) {
      new _Bullet.Bullet(gun.getCanvas(), gun.transform.getAbsoluteCenter(), bullet, gun.angle.getNewAngle(this.spread), hurtboxes, 200);
    }
  }
};
exports.Shotgun = Shotgun;
var flamethrowerUpImage = new Image();
flamethrowerUpImage.src = _up3.default;
var flamethrowerUp = {
  width: 14,
  height: 17,
  image: flamethrowerUpImage
};
var flamethrowerDiagUpImage = new Image();
flamethrowerDiagUpImage.src = _diagup3.default;
var flamethrowerDiagUp = {
  width: 16,
  height: 16,
  image: flamethrowerDiagUpImage
};
var flamethrowerSideImage = new Image();
flamethrowerSideImage.src = _side3.default;
var flamethrowerSide = {
  width: 26,
  height: 9,
  image: flamethrowerSideImage
};
var flamethrowerDiagDownImage = new Image();
flamethrowerDiagDownImage.src = _diagdown3.default;
var flamethrowerDiagDown = {
  width: 19,
  height: 14,
  image: flamethrowerDiagDownImage
};
var flamethrowerDownImage = new Image();
flamethrowerDownImage.src = _down3.default;
var flamethrowerDown = {
  width: 14,
  height: 17,
  image: flamethrowerDownImage
};
var flameImage = new Image();
flameImage.src = _flame.default;
var Flamethrower = {
  name: "Flamethrower",
  shootClip: _flamethrower_shoot.default,
  emptyClip: _gun_empty.default,
  reloadClip: _gun_reload.default,
  //bulletImage: bulletImage,
  clipSize: 100,
  extraAmmo: 1000,
  cooldown: 0.04,
  //default option for ui and initialization?
  spriteOptions: [flamethrowerUp, flamethrowerDiagUp, flamethrowerSide, flamethrowerDiagDown, flamethrowerDown, flamethrowerDiagDown, flamethrowerSide, flamethrowerDiagUp],
  spread: new Dna.Utilities.Radians(Math.PI / 6),
  generateBullets: function generateBullets(gun, hurtboxes) {
    //console.log(gun);
    //let spread = new Dna.Utilities.Radians(Math.PI / 4);
    //for (let i = 0; i < 4; i++) {
    new _Bullet.Bullet(gun.getCanvas(), gun.transform.getAbsoluteCenter(), new Dna.Components.Image({
      width: 13,
      height: 10,
      image: flameImage,
      ticksPerFrame: 5,
      numberOfFrames: 2
    }), gun.angle.getNewAngle(this.spread), hurtboxes, 200); //}
  }
};
exports.Flamethrower = Flamethrower;
},{"./Bullet":"demos/shooter/Bullet.js","./assets/pistol/up.png":"demos/shooter/assets/pistol/up.png","./assets/pistol/diagup.png":"demos/shooter/assets/pistol/diagup.png","./assets/pistol/side.png":"demos/shooter/assets/pistol/side.png","./assets/pistol/diagdown.png":"demos/shooter/assets/pistol/diagdown.png","./assets/pistol/down.png":"demos/shooter/assets/pistol/down.png","./assets/sounds/pistol_shoot.wav":"demos/shooter/assets/sounds/pistol_shoot.wav","./assets/sounds/gun_empty.wav":"demos/shooter/assets/sounds/gun_empty.wav","./assets/sounds/gun_reload.mp3":"demos/shooter/assets/sounds/gun_reload.mp3","./assets/bullets/bullet.png":"demos/shooter/assets/bullets/bullet.png","./assets/shotgun/up.png":"demos/shooter/assets/shotgun/up.png","./assets/shotgun/diagup.png":"demos/shooter/assets/shotgun/diagup.png","./assets/shotgun/side.png":"demos/shooter/assets/shotgun/side.png","./assets/shotgun/diagdown.png":"demos/shooter/assets/shotgun/diagdown.png","./assets/shotgun/down.png":"demos/shooter/assets/shotgun/down.png","./assets/sounds/shotgun_shoot.wav":"demos/shooter/assets/sounds/shotgun_shoot.wav","./assets/flamethrower/up.png":"demos/shooter/assets/flamethrower/up.png","./assets/flamethrower/diagup.png":"demos/shooter/assets/flamethrower/diagup.png","./assets/flamethrower/side.png":"demos/shooter/assets/flamethrower/side.png","./assets/flamethrower/diagdown.png":"demos/shooter/assets/flamethrower/diagdown.png","./assets/flamethrower/down.png":"demos/shooter/assets/flamethrower/down.png","./assets/bullets/flame.png":"demos/shooter/assets/bullets/flame.png","./assets/sounds/flamethrower_shoot.wav":"demos/shooter/assets/sounds/flamethrower_shoot.wav"}],"demos/shooter/assets/sounds/weapon_swap.mp3":[function(require,module,exports) {
module.exports = "/weapon_swap.2e32c4a2.mp3";
},{}],"demos/shooter/Gun.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Gun = void 0;

var _ImageAngle = require("./ImageAngle");

var _GunState = require("./GunState");

var _GunData = require("./GunData");

var _weapon_swap = _interopRequireDefault(require("./assets/sounds/weapon_swap.mp3"));

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

var RELOAD_TIME = 2;
var EMPTY_COOLDOWN = 0.5;
var GUN_STATES = [new _GunState.GunState(_GunData.Pistol), new _GunState.GunState(_GunData.Shotgun), new _GunState.GunState(_GunData.Flamethrower)];

var GunComponent =
/*#__PURE__*/
function (_Dna$Component) {
  _inherits(GunComponent, _Dna$Component);

  function GunComponent(ammoText, reloadingText, gunImage, hurtboxes) {
    var _this;

    _classCallCheck(this, GunComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GunComponent).call(this));
    _this.ammoText = ammoText;
    _this.reloadingText = reloadingText;
    _this.gunImage = gunImage;
    _this.hurtboxes = hurtboxes;
    _this.cooldown = 0;
    _this.emptyCooldown = 0; //this.reloading = false;

    _this.reloading = 0;
    _this.gunIndex = 0;
    _this.gunState = GUN_STATES[_this.gunIndex];
    _this.audio = new Dna.Components.Audio({
      volume: 0.1
    });
    _this.keyboard = new Dna.Input.Keyboard({}, {
      82: function _() {
        _this.reload();
      },
      9: function _() {
        _this.changeWeapon();
      }
    });

    _this.updateAmmoText();

    return _this;
  }

  _createClass(GunComponent, [{
    key: "update",
    value: function update(deltaTime) {
      this.cooldown -= deltaTime;
      this.emptyCooldown -= deltaTime;

      if (this.reloading > 0) {
        this.reloading -= deltaTime;

        if (this.reloading <= 0) {
          this.finishReload();
        }
      }
    }
  }, {
    key: "shoot",
    value: function shoot() {
      if (this.cooldown > 0) return;
      if (this.reloading > 0) return;

      if (this.gunState.clipAmmo <= 0) {
        if (this.emptyCooldown <= 0) {
          this.emptyCooldown = EMPTY_COOLDOWN;
          this.audio.play(this.gunState.gunData.emptyClip);
        }

        return;
      }

      this.gunState.gunData.generateBullets(this.gameObject, this.hurtboxes);
      this.audio.play(this.gunState.gunData.shootClip);
      this.gunState.clipAmmo--;
      this.cooldown = this.gunState.gunData.cooldown;
      this.updateAmmoText();
    }
  }, {
    key: "reload",
    value: function reload() {
      if (this.gunState.clipAmmo >= this.gunState.gunData.clipSize) return;
      if (this.gunState.extraAmmo <= 0) return;
      if (this.reloading > 0) return;
      this.reloading = RELOAD_TIME;
      this.reloadingText.setActive(true);
      this.audio.play(this.gunState.gunData.reloadClip);
    }
  }, {
    key: "stopReload",
    value: function stopReload() {
      this.reloading = 0;
      this.reloadingText.setActive(false);
    }
  }, {
    key: "finishReload",
    value: function finishReload() {
      var totalAmmo = this.gunState.clipAmmo + this.gunState.extraAmmo;
      this.gunState.clipAmmo = Math.min(totalAmmo, this.gunState.gunData.clipSize);
      this.gunState.extraAmmo = Math.max(0, totalAmmo - this.gunState.clipAmmo);
      this.stopReload();
      this.updateAmmoText();
    }
  }, {
    key: "changeWeapon",
    value: function changeWeapon(gunState) {
      this.stopReload();
      this.gunIndex = (this.gunIndex + 1) % GUN_STATES.length;
      this.gunState = GUN_STATES[this.gunIndex];
      this.audio.play(_weapon_swap.default);
      this.gunImage.options = this.gunState.gunData.spriteOptions;
      this.updateAmmoText();
    }
  }, {
    key: "updateAmmoText",
    value: function updateAmmoText() {
      this.ammoText.text = this.gunState.clipAmmo + "/" + this.gunState.extraAmmo;
    }
  }]);

  return GunComponent;
}(Dna.Component);

var GunPosition =
/*#__PURE__*/
function (_Dna$Component2) {
  _inherits(GunPosition, _Dna$Component2);

  function GunPosition(angle) {
    var _this2;

    _classCallCheck(this, GunPosition);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(GunPosition).call(this)); //TODO just set this transform.position to be this

    _this2.angle = angle;
    _this2.position = new Dna.Utilities.Vector(angle, 10);
    return _this2;
  }

  _createClass(GunPosition, [{
    key: "update",
    value: function update(deltaTime) {
      // change transform based on angle
      this.gameObject.transform.x = this.position.x;
      this.gameObject.transform.y = this.position.y;
    }
  }]);

  return GunPosition;
}(Dna.Component);

var Gun =
/*#__PURE__*/
function (_Dna$GameObject) {
  _inherits(Gun, _Dna$GameObject);

  function Gun(parent, position, angle, hurtboxes, ammoText, reloadingText) {
    var _this3;

    _classCallCheck(this, Gun);

    console.log(parent);
    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Gun).call(this, parent, position, []));
    _this3.angle = angle;
    var image = new Dna.Components.Image(GUN_STATES[0].gunData.spriteOptions[0]);
    new Dna.GameObject(_assertThisInitialized(_assertThisInitialized(_this3)), {}, [image]);
    _this3.gunImage = new _ImageAngle.ImageAngle(image, angle, GUN_STATES[0].gunData.spriteOptions, 1);

    _this3.addComponent(_this3.gunImage);

    _this3.addComponent(new GunPosition(angle));

    _this3.gun = new GunComponent(ammoText, reloadingText, _this3.gunImage, hurtboxes);

    _this3.addComponent(_this3.gun);

    return _this3;
  }

  return Gun;
}(Dna.GameObject);

exports.Gun = Gun;
},{"./ImageAngle":"demos/shooter/ImageAngle.js","./GunState":"demos/shooter/GunState.js","./GunData":"demos/shooter/GunData.js","./assets/sounds/weapon_swap.mp3":"demos/shooter/assets/sounds/weapon_swap.mp3"}],"demos/shooter/Knockback.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Knockback = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

//TODO this should be a tween of physics
var Knockback =
/*#__PURE__*/
function (_Dna$Component) {
  _inherits(Knockback, _Dna$Component);

  function Knockback(physics, maxDistance) {
    var _this;

    _classCallCheck(this, Knockback);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Knockback).call(this));
    _this.physics = physics;
    _this.maxDistance = maxDistance;
    _this.distanceTraveled = 0;
    return _this;
  }

  _createClass(Knockback, [{
    key: "update",
    value: function update(deltaTime) {
      this.distanceTraveled += this.physics.distanceTraveled.total;

      if (this.distanceTraveled >= this.maxDistance) {
        this.gameObject.removeComponent(this.physics);
        this.gameObject.removeComponent(this);
      }
    }
  }]);

  return Knockback;
}(Dna.Component);

exports.Knockback = Knockback;
},{}],"demos/shooter/Hero.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hero = void 0;

var _Gun = require("./Gun");

var _Bullet = require("./Bullet");

var _Knockback = require("./Knockback");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SPEED = 3;
var CLIP_SIZE = 20;
var TOTAL_AMMO = 100;
var RELOAD_TIME = 2;

var Hero =
/*#__PURE__*/
function (_Dna$Component) {
  _inherits(Hero, _Dna$Component);

  function Hero(image, ammoText, reloadingText, mouse, angle, physics, hurtboxes, gun, audio) {
    var _this;

    _classCallCheck(this, Hero);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Hero).call(this));
    _this.keyboard = new Dna.Input.Keyboard({
      87: "up",
      83: "down",
      65: "left",
      68: "right"
    });
    _this.image = image;
    _this.mouse = mouse;
    _this.angle = angle;
    _this.physics = physics; //this.hurtboxes = hurtboxes;
    //TODO dont need this if shooting is handled from gun component

    _this.gun = gun;
    _this.audio = audio;
    _this.invulnerable = 0;
    _this.coordinates = new Dna.Utilities.Coordinates(0, 0);
    return _this;
  }

  _createClass(Hero, [{
    key: "takeDamage",
    value: function takeDamage(damage, source) {
      if (this.invulnerable > 0) return;
      console.log("taking damage: " + damage); //TODO angle should be based on the angle the monster hit

      var knockbackPhysics = new Dna.Components.Physics({
        angle: source.transform.getCurrentDirection(),
        speed: 2
      });
      this.gameObject.addComponent(knockbackPhysics);
      var knockback = new _Knockback.Knockback(knockbackPhysics, 20);
      this.gameObject.addComponent(knockback);
      this.invulnerable = 0.5;
    } //TODO update this to use regular physics class

  }, {
    key: "update",
    value: function update(deltaTime) {
      this.coordinates.x = 0;
      this.coordinates.y = 0;
      if (this.keyboard.left) this.coordinates.add(Dna.Utilities.Vector.UNIT_LEFT);
      if (this.keyboard.right) this.coordinates.add(Dna.Utilities.Vector.UNIT_RIGHT);
      if (this.keyboard.up) this.coordinates.add(Dna.Utilities.Vector.UNIT_UP);
      if (this.keyboard.down) this.coordinates.add(Dna.Utilities.Vector.UNIT_DOWN); //TODO control this from gun class

      if (this.mouse.leftClick) this.gun.gun.shoot();
      if (this.coordinates.magnitude > 0) this.coordinates.magnitude = SPEED;
      this.physics.xv = this.coordinates.x;
      this.physics.yv = this.coordinates.y;
      this.cooldown -= deltaTime;
      this.emptyCooldown -= deltaTime;
      this.invulnerable -= deltaTime;
    }
  }, {
    key: "render",
    value: function render() {
      //TODO flash if invulnerable
      _get(_getPrototypeOf(Hero.prototype), "render", this).call(this);
    }
  }]);

  return Hero;
}(Dna.Component);

exports.Hero = Hero;
},{"./Gun":"demos/shooter/Gun.js","./Bullet":"demos/shooter/Bullet.js","./Knockback":"demos/shooter/Knockback.js"}],"demos/shooter/UnitAngle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnitAngle = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var UnitAngle =
/*#__PURE__*/
function (_Dna$Component) {
  _inherits(UnitAngle, _Dna$Component);

  function UnitAngle(target) {
    var _this;

    _classCallCheck(this, UnitAngle);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UnitAngle).call(this));
    _this.target = target;
    _this.angle = new Dna.Utilities.Radians(0);
    return _this;
  }

  _createClass(UnitAngle, [{
    key: "update",
    value: function update(deltaTime) {
      this.angle.radians = this.gameObject.transform.getAngleToTransform(this.target.transform);
    }
  }]);

  return UnitAngle;
}(Dna.Component);

exports.UnitAngle = UnitAngle;
},{}],"demos/shooter/assets/hero/up.png":[function(require,module,exports) {
module.exports = "/up.9f3ddbb1.png";
},{}],"demos/shooter/assets/hero/upside.png":[function(require,module,exports) {
module.exports = "/upside.15758922.png";
},{}],"demos/shooter/assets/hero/side.png":[function(require,module,exports) {
module.exports = "/side.31058365.png";
},{}],"demos/shooter/assets/hero/downside.png":[function(require,module,exports) {
module.exports = "/downside.c2d94c92.png";
},{}],"demos/shooter/assets/hero/down.png":[function(require,module,exports) {
module.exports = "/down.571fef73.png";
},{}],"demos/shooter/HeroPrefab.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeroPrefab = void 0;

var _Hero = require("./Hero");

var _Gun = require("./Gun");

var _UnitAngle = require("./UnitAngle");

var _ImageAngle = require("./ImageAngle");

var _GunData = require("./GunData");

var _up = _interopRequireDefault(require("./assets/hero/up.png"));

var _upside = _interopRequireDefault(require("./assets/hero/upside.png"));

var _side = _interopRequireDefault(require("./assets/hero/side.png"));

var _downside = _interopRequireDefault(require("./assets/hero/downside.png"));

var _down = _interopRequireDefault(require("./assets/hero/down.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var RADIUS = 10;
var hero_default = {
  width: 20,
  height: 24,
  loop: true,
  numberOfFrames: 4,
  ticksPerFrame: 5 //framesPerRow: 4

};
var heroUpImage = new Image();
heroUpImage.src = _up.default;
var heroUp = {
  image: heroUpImage
};
var heroUpSideImage = new Image();
heroUpSideImage.src = _upside.default;
var heroUpSide = {
  image: heroUpSideImage
};
var heroSideImage = new Image();
heroSideImage.src = _side.default;
var heroSide = {
  image: heroSideImage
};
var heroDownSideImage = new Image();
heroDownSideImage.src = _downside.default;
var heroDownSide = {
  image: heroDownSideImage
};
var heroDownImage = new Image();
heroDownImage.src = _down.default;
var heroDown = {
  image: heroDownImage
};
var spriteOptions = [heroUp, heroUpSide, heroSide, heroDownSide, heroDown, heroDownSide, heroSide, heroUpSide];

var HeroPrefab =
/*#__PURE__*/
function (_Dna$GameObject) {
  _inherits(HeroPrefab, _Dna$GameObject);

  function HeroPrefab(canvas, ammoText, mouse, crosshair, hurtboxes, heroHitbox) {
    var _this;

    _classCallCheck(this, HeroPrefab);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HeroPrefab).call(this, canvas, {}, []));
    var image = new Dna.Components.Image(hero_default);
    image.updateOptions(heroDown);
    var heroImage = new Dna.GameObject(_assertThisInitialized(_assertThisInitialized(_this)), {}, [image]);
    var reloadingText = new Dna.GameObject(_assertThisInitialized(_assertThisInitialized(_this)), {
      y: -20
    }, [new Dna.Components.Text({
      text: "RELOADING"
    })]);
    reloadingText.setActive(false);

    _this.addComponent(new Dna.Components.Hitcircle({
      radius: RADIUS,
      hitboxSet: heroHitbox
    }));

    var unitAngle = new _UnitAngle.UnitAngle(crosshair);

    _this.addComponent(unitAngle);

    _this.addComponent(new _ImageAngle.ImageAngle(image, unitAngle.angle, spriteOptions, 1));

    var gun = new _Gun.Gun(_assertThisInitialized(_assertThisInitialized(_this)), {}, unitAngle.angle, hurtboxes, ammoText, reloadingText);
    var physics = new Dna.Components.SimplePhysics();

    _this.addComponent(physics);

    var audio = new Dna.Components.Audio({
      volume: 0.1
    });

    _this.addComponent(audio);

    _this.unit = new _Hero.Hero(heroImage, ammoText, reloadingText, mouse, unitAngle.angle, physics, hurtboxes, gun, audio);

    _this.addComponent(_this.unit);

    return _this;
  }

  return HeroPrefab;
}(Dna.GameObject);

exports.HeroPrefab = HeroPrefab;
},{"./Hero":"demos/shooter/Hero.js","./Gun":"demos/shooter/Gun.js","./UnitAngle":"demos/shooter/UnitAngle.js","./ImageAngle":"demos/shooter/ImageAngle.js","./GunData":"demos/shooter/GunData.js","./assets/hero/up.png":"demos/shooter/assets/hero/up.png","./assets/hero/upside.png":"demos/shooter/assets/hero/upside.png","./assets/hero/side.png":"demos/shooter/assets/hero/side.png","./assets/hero/downside.png":"demos/shooter/assets/hero/downside.png","./assets/hero/down.png":"demos/shooter/assets/hero/down.png"}],"demos/shooter/Boundary.js":[function(require,module,exports) {
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
    })])); //TODO reverse this logic, use callback on hero to handle collision detection

    _this.addComponent(new Dna.Components.Hitbox({
      width: width,
      height: height,
      hurtboxes: hurtboxes,
      onCollision: alignment.onCollision
    }));

    return _this;
  }

  return Boundary;
}(Dna.GameObject);

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
},{}],"demos/shooter/Monster.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Monster = exports.Ai = exports.Movement = void 0;

var _Knockback = require("./Knockback");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Movement =
/*#__PURE__*/
function (_Dna$Component) {
  _inherits(Movement, _Dna$Component);

  function Movement(physics, angle) {
    var _this;

    _classCallCheck(this, Movement);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Movement).call(this));
    _this.physics = physics;
    _this.angle = angle;
    return _this;
  }

  _createClass(Movement, [{
    key: "update",
    value: function update(deltaTime) {
      this.physics.angle.radians = this.angle.radians;
    }
  }]);

  return Movement;
}(Dna.Component); //TODO need to test this


exports.Movement = Movement;

var Ai =
/*#__PURE__*/
function (_Dna$Component2) {
  _inherits(Ai, _Dna$Component2);

  function Ai(hero, range, cooldown, attack) {
    var _this2;

    _classCallCheck(this, Ai);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Ai).call(this));
    _this2.range = range;
    _this2.cooldown = 0;
    return _this2;
  }

  _createClass(Ai, [{
    key: "canAttack",
    value: function canAttack() {
      if (this.cooldown > 0 || this.range <= 0) return false;
      return this.gameObject.transform.getDistanceToTransform(this.hero.transform) <= this.range;
    }
  }, {
    key: "attack",
    value: function attack() {//TODO
      // call callback
      // set cooldown
    }
  }]);

  return Ai;
}(Dna.Component);

exports.Ai = Ai;

var Monster =
/*#__PURE__*/
function (_Dna$Component3) {
  _inherits(Monster, _Dna$Component3);

  function Monster(hp, hpText) {
    var _this3;

    _classCallCheck(this, Monster);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Monster).call(this));
    _this3.maxHp = hp;
    _this3.hp = hp;
    _this3.hpText = hpText;

    _this3.setHpText();

    return _this3;
  }

  _createClass(Monster, [{
    key: "setHpText",
    value: function setHpText() {
      this.hpText.text = this.hp + "/" + this.maxHp;
    }
  }, {
    key: "takeDamage",
    value: function takeDamage(damage) {
      this.hp = Math.max(0, this.hp - damage);
      this.setHpText();

      if (this.hp <= 0) {
        this.gameObject.destroy();
      }
    }
  }, {
    key: "knockback",
    value: function knockback(direction) {
      var knockbackPhysics = new Dna.Components.Physics({
        angle: direction,
        speed: 2
      });
      this.gameObject.addComponent(knockbackPhysics);
      var knockback = new _Knockback.Knockback(knockbackPhysics, 20);
      this.gameObject.addComponent(knockback);
    }
  }]);

  return Monster;
}(Dna.Component);

exports.Monster = Monster;
},{"./Knockback":"demos/shooter/Knockback.js"}],"demos/shooter/assets/slime/slime1_back.png":[function(require,module,exports) {
module.exports = "/slime1_back.c385b3b1.png";
},{}],"demos/shooter/assets/slime/slime1_front.png":[function(require,module,exports) {
module.exports = "/slime1_front.b81d3c74.png";
},{}],"demos/shooter/assets/slime/slime1_side.png":[function(require,module,exports) {
module.exports = "/slime1_side.83ec7a75.png";
},{}],"demos/shooter/Slime.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Slime = void 0;

var _Monster = require("./Monster");

var _UnitAngle = require("./UnitAngle");

var _ImageAngle = require("./ImageAngle");

var _slime1_back = _interopRequireDefault(require("./assets/slime/slime1_back.png"));

var _slime1_front = _interopRequireDefault(require("./assets/slime/slime1_front.png"));

var _slime1_side = _interopRequireDefault(require("./assets/slime/slime1_side.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var MAX_HP = 100;
var RADIUS = 8;
var SPEED = 1;
var DAMAGE = 10; //TODO consolidate shared state to 1 object, allow image to read from its own values

var slime_default = {
  width: 16,
  height: 16,
  loop: true,
  numberOfFrames: 4,
  ticksPerFrame: 5 //framesPerRow: 4

};
var slimeUpImage = new Image();
slimeUpImage.src = _slime1_back.default;
var slimeUp = {
  image: slimeUpImage
};
var slimeDownImage = new Image();
slimeDownImage.src = _slime1_front.default;
var slimeDown = {
  image: slimeDownImage
};
var slimeSideImage = new Image();
slimeSideImage.src = _slime1_side.default;
var slimeSide = {
  image: slimeSideImage
};
var spriteOptions = [slimeUp, slimeSide, slimeDown, slimeSide];

var Slime =
/*#__PURE__*/
function (_Dna$GameObject) {
  _inherits(Slime, _Dna$GameObject);

  function Slime(canvas, position, hero, heroHurtbox, enemyHurtboxes) {
    var _this;

    _classCallCheck(this, Slime);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Slime).call(this, canvas, position, []));
    var image = new Dna.Components.Image(slime_default);
    image.updateOptions(slimeDown);
    new Dna.GameObject(_assertThisInitialized(_assertThisInitialized(_this)), {}, [image]); //this.addComponent(image);

    var hpText = new Dna.Components.Text({});
    new Dna.GameObject(_assertThisInitialized(_assertThisInitialized(_this)), {
      y: -20
    }, [hpText]);
    var hurtbox = new Dna.Components.Hitcircle({
      radius: RADIUS,
      hitboxSet: enemyHurtboxes
    });

    _this.addComponent(hurtbox);

    var unitAngle = new _UnitAngle.UnitAngle(hero);

    _this.addComponent(unitAngle);

    _this.addComponent(new _ImageAngle.ImageAngle(image, unitAngle.angle, spriteOptions, -1));

    var physics = new Dna.Components.Physics({
      speed: SPEED
    });

    _this.addComponent(physics);

    _this.addComponent(new _Monster.Movement(physics, unitAngle.angle));

    _this.unit = new _Monster.Monster(MAX_HP, hpText);

    _this.addComponent(_this.unit); //TODO this logic should be reveresed, onhit should happen on hero, these stored in monsterHitboxes
    //TODO add via component array


    _this.addComponent(new Dna.Components.Hitcircle({
      radius: RADIUS,
      hurtboxes: heroHurtbox,
      onCollisionEnter: function onCollisionEnter(heroHurtbox) {
        hero.unit.takeDamage(10, _assertThisInitialized(_assertThisInitialized(_this)));
      }
    }));

    _this.audio = new Dna.Components.Audio({
      volume: 0.1
    });

    _this.addComponent(_this.audio);

    return _this;
  }

  return Slime;
}(Dna.GameObject);

exports.Slime = Slime;
},{"./Monster":"demos/shooter/Monster.js","./UnitAngle":"demos/shooter/UnitAngle.js","./ImageAngle":"demos/shooter/ImageAngle.js","./assets/slime/slime1_back.png":"demos/shooter/assets/slime/slime1_back.png","./assets/slime/slime1_front.png":"demos/shooter/assets/slime/slime1_front.png","./assets/slime/slime1_side.png":"demos/shooter/assets/slime/slime1_side.png"}],"demos/shooter/assets/crosshair.png":[function(require,module,exports) {
module.exports = "/crosshair.acc0d8c6.png";
},{}],"demos/shooter/Crosshair.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Crosshair = void 0;

var _crosshair = _interopRequireDefault(require("./assets/crosshair.png"));

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

var CrosshairComponent =
/*#__PURE__*/
function (_Dna$Component) {
  _inherits(CrosshairComponent, _Dna$Component);

  function CrosshairComponent(mouse) {
    var _this;

    _classCallCheck(this, CrosshairComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CrosshairComponent).call(this));
    _this.mouse = mouse;
    return _this;
  }

  _createClass(CrosshairComponent, [{
    key: "update",
    value: function update(deltaTime) {
      this.gameObject.transform.x = this.mouse.x;
      this.gameObject.transform.y = this.mouse.y;
    }
  }]);

  return CrosshairComponent;
}(Dna.Component);

var crosshairImage = new Image();
crosshairImage.src = _crosshair.default;

var Crosshair =
/*#__PURE__*/
function (_Dna$GameObject) {
  _inherits(Crosshair, _Dna$GameObject);

  function Crosshair(parent, mouse) {
    _classCallCheck(this, Crosshair);

    return _possibleConstructorReturn(this, _getPrototypeOf(Crosshair).call(this, parent, {}, [new CrosshairComponent(mouse), new Dna.Components.Image({
      width: 21,
      height: 21,
      image: crosshairImage
    })]));
  }

  return Crosshair;
}(Dna.GameObject);

exports.Crosshair = Crosshair;
},{"./assets/crosshair.png":"demos/shooter/assets/crosshair.png"}],"demos/shooter/assets/tileset.png":[function(require,module,exports) {
module.exports = "/tileset.4347fbca.png";
},{}],"demos/shooter/assets/controls/w.png":[function(require,module,exports) {
module.exports = "/w.ab734119.png";
},{}],"demos/shooter/assets/controls/a.png":[function(require,module,exports) {
module.exports = "/a.92fe716e.png";
},{}],"demos/shooter/assets/controls/s.png":[function(require,module,exports) {
module.exports = "/s.e1dae318.png";
},{}],"demos/shooter/assets/controls/d.png":[function(require,module,exports) {
module.exports = "/d.863b7e78.png";
},{}],"demos/shooter/assets/controls/tab.png":[function(require,module,exports) {
module.exports = "/tab.facd4468.png";
},{}],"demos/shooter/assets/controls/r.png":[function(require,module,exports) {
module.exports = "/r.bfab7df0.png";
},{}],"demos/shooter/assets/controls/mouse.png":[function(require,module,exports) {
module.exports = "/mouse.40e8bd90.png";
},{}],"demos/shooter/assets/controls/leftclick.png":[function(require,module,exports) {
module.exports = "/leftclick.a00824ae.png";
},{}],"demos/shooter/shooter.js":[function(require,module,exports) {
"use strict";

var _HeroPrefab = require("./HeroPrefab");

var _Boundary = require("./Boundary");

var _Slime = require("./Slime");

var _Crosshair = require("./Crosshair");

var _tileset = _interopRequireDefault(require("./assets/tileset.png"));

var _w = _interopRequireDefault(require("./assets/controls/w.png"));

var _a = _interopRequireDefault(require("./assets/controls/a.png"));

var _s = _interopRequireDefault(require("./assets/controls/s.png"));

var _d = _interopRequireDefault(require("./assets/controls/d.png"));

var _tab = _interopRequireDefault(require("./assets/controls/tab.png"));

var _r = _interopRequireDefault(require("./assets/controls/r.png"));

var _mouse = _interopRequireDefault(require("./assets/controls/mouse.png"));

var _leftclick = _interopRequireDefault(require("./assets/controls/leftclick.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var floorImage = new Dna.Dom.Image(_tileset.default);
var background = new Dna.StaticCanvas(document.getElementById("background"), [floorImage.load], function (background) {
  new Dna.GameObject(background, {}, [new Dna.Components.Image({
    image: floorImage,
    type: Dna.Components.Image.types.randomTiled,
    width: 40,
    height: 8,
    destWidth: 700,
    destHeight: 500,
    xWeight: [0.8, 0.05, 0.05, 0.05, 0.05],
    yWeight: [1]
  })]);
}); //TODO find an elegant way to preload these

var wImage = new Dna.Dom.Image(_w.default);
var aImage = new Dna.Dom.Image(_a.default);
var sImage = new Dna.Dom.Image(_s.default);
var dImage = new Dna.Dom.Image(_d.default);
var tabImage = new Dna.Dom.Image(_tab.default);
var rImage = new Dna.Dom.Image(_r.default);
var mouseImage = new Dna.Dom.Image(_mouse.default);
var leftClickImage = new Dna.Dom.Image(_leftclick.default);
var foreground = new Dna.StaticCanvas(document.getElementById("foreground"), [wImage.load, aImage.load, sImage.load, dImage.load, tabImage.load, rImage.load, mouseImage.load, leftClickImage.load], function (foreground) {
  console.log(wImage);

  function getImageOptions(image) {
    return {
      image: image,
      width: 100,
      height: 100,
      destWidth: 30,
      destHeight: 30,
      type: Dna.Components.Image.types.stretched
    };
  }

  var controls = new Dna.GameObject(foreground, {
    x: -250,
    y: 160
  });
  var moveControls = new Dna.GameObject(controls, {
    x: -40,
    y: 30
  }, []);
  new Dna.GameObject(moveControls, {
    y: -25
  }, [new Dna.Components.Text({
    text: "Move"
  })]);
  new Dna.GameObject(moveControls, {
    y: -5
  }, [new Dna.Components.Image(getImageOptions(wImage))]);
  new Dna.GameObject(moveControls, {
    y: 20,
    x: -25
  }, [new Dna.Components.Image(getImageOptions(aImage))]);
  new Dna.GameObject(moveControls, {
    y: 20
  }, [new Dna.Components.Image(getImageOptions(sImage))]);
  new Dna.GameObject(moveControls, {
    y: 20,
    x: 25
  }, [new Dna.Components.Image(getImageOptions(dImage))]);
  var shootControls = new Dna.GameObject(controls, {
    x: -40,
    y: -30
  });
  new Dna.GameObject(shootControls, {
    x: -25,
    y: -10
  }, [new Dna.Components.Text({
    text: "Aim"
  })]);
  new Dna.GameObject(shootControls, {
    x: -25,
    y: 10
  }, [new Dna.Components.Image(getImageOptions(mouseImage))]);
  new Dna.GameObject(shootControls, {
    x: 25,
    y: -10
  }, [new Dna.Components.Text({
    text: "Shoot"
  })]);
  new Dna.GameObject(shootControls, {
    x: 25,
    y: 10
  }, [new Dna.Components.Image(getImageOptions(leftClickImage))]);
  var gunControls = new Dna.GameObject(controls, {
    x: 40
  });
  new Dna.GameObject(gunControls, {
    y: -35
  }, [new Dna.Components.Text({
    text: "Reload"
  })]);
  new Dna.GameObject(gunControls, {
    y: -15
  }, [new Dna.Components.Image(getImageOptions(rImage))]);
  new Dna.GameObject(gunControls, {
    y: 15
  }, [new Dna.Components.Text({
    text: "Weapon"
  })]);
  new Dna.GameObject(gunControls, {
    y: 35
  }, [new Dna.Components.Image(getImageOptions(tabImage))]); //TODO fix this, dont depend on calling this

  foreground.renderAll();
});
var canvas = new Dna.Canvas(document.getElementById("canvas"));
var mouse = new Dna.Input.Mouse(canvas);
var crosshair = new _Crosshair.Crosshair(canvas, mouse);
var ammoTextContainer = new Dna.GameObject(canvas, {
  x: 300,
  y: 200
});
var ammoText = new Dna.Components.Text({});
new Dna.GameObject(ammoTextContainer, {
  y: -10
}, [new Dna.Components.Text({
  text: "AMMO"
})]);
new Dna.GameObject(ammoTextContainer, {
  y: 10
}, [ammoText]);
var heroHurtbox = [];
var enemyHurtboxes = [];
var hero = new _HeroPrefab.HeroPrefab(canvas, ammoText, mouse, crosshair, enemyHurtboxes, heroHurtbox);
new _Slime.Slime(canvas, {
  x: 200,
  y: 150
}, hero, heroHurtbox, enemyHurtboxes);
new _Slime.Slime(canvas, {
  x: 200,
  y: -150
}, hero, heroHurtbox, enemyHurtboxes);
new _Slime.Slime(canvas, {
  x: -200,
  y: 150
}, hero, heroHurtbox, enemyHurtboxes);
new _Slime.Slime(canvas, {
  x: -200,
  y: -150
}, hero, heroHurtbox, enemyHurtboxes);
var X_OFFSET = 350;
var Y_OFFSET = 250;
var X_LONG = 500;
var Y_LONG = 700;
var SHORT = 20;
var topBoundary = new _Boundary.Boundary(canvas, _Boundary.Alignments.TOP, -Y_OFFSET, Y_LONG, SHORT, heroHurtbox);
var bottomBoundary = new _Boundary.Boundary(canvas, _Boundary.Alignments.BOTTOM, Y_OFFSET, Y_LONG, SHORT, heroHurtbox);
var leftBoundary = new _Boundary.Boundary(canvas, _Boundary.Alignments.LEFT, -X_OFFSET, SHORT, X_LONG, heroHurtbox);
var rightBoundary = new _Boundary.Boundary(canvas, _Boundary.Alignments.RIGHT, X_OFFSET, SHORT, X_LONG, heroHurtbox);
},{"./HeroPrefab":"demos/shooter/HeroPrefab.js","./Boundary":"demos/shooter/Boundary.js","./Slime":"demos/shooter/Slime.js","./Crosshair":"demos/shooter/Crosshair.js","./assets/tileset.png":"demos/shooter/assets/tileset.png","./assets/controls/w.png":"demos/shooter/assets/controls/w.png","./assets/controls/a.png":"demos/shooter/assets/controls/a.png","./assets/controls/s.png":"demos/shooter/assets/controls/s.png","./assets/controls/d.png":"demos/shooter/assets/controls/d.png","./assets/controls/tab.png":"demos/shooter/assets/controls/tab.png","./assets/controls/r.png":"demos/shooter/assets/controls/r.png","./assets/controls/mouse.png":"demos/shooter/assets/controls/mouse.png","./assets/controls/leftclick.png":"demos/shooter/assets/controls/leftclick.png"}],"C:/Users/David/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57826" + '/');

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
},{}]},{},["C:/Users/David/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","demos/shooter/shooter.js"], null)
//# sourceMappingURL=/shooter.243ad5fc.map