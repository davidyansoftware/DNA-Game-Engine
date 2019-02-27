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
})({"demos/collisions/Unit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Unit = void 0;

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

var Unit =
/*#__PURE__*/
function (_Dna$Component) {
  _inherits(Unit, _Dna$Component);

  function Unit(keyboard, physics) {
    var _this;

    _classCallCheck(this, Unit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Unit).call(this));
    _this.keyboard = keyboard;
    _this.physics = physics;
    return _this;
  }

  _createClass(Unit, [{
    key: "update",
    value: function update(deltaTime) {
      var xv = 0;
      var yv = 0;
      if (this.keyboard.left) xv -= SPEED;
      if (this.keyboard.right) xv += SPEED;
      if (this.keyboard.up) yv -= SPEED;
      if (this.keyboard.down) yv += SPEED;
      this.physics.xv = xv;
      this.physics.yv = yv;
    }
  }]);

  return Unit;
}(Dna.Component);
/*
class Hero extends Dna.GameObject {
  constructor(parent, position, input) {
    super(parent, position, [
      new Dna.Components.Rectangle({ width: SIZE, height: SIZE })
    ]);

    this.physics = new Dna.Components.SimplePhysics();
    this.addComponent(this.physics);

    this.hurtbox = new Dna.Components.Hitbox({
      width: SIZE,
      height: SIZE
    });
    this.addComponent(this.hurtbox);

    this.addComponent(new HeroComponent(input, this.physics));
  }

  ground() {
    this.grounded = true;

    this.gravity.active = false;
    this.physics.xy = 0;

    console.log("on ground");
  }
}
*/


exports.Unit = Unit;
},{}],"demos/collisions/Boundary.js":[function(require,module,exports) {
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

    //}, callback) {
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Boundary).call(this, parent, alignment.getPosition(offset), [new Dna.Components.Rectangle({
      width: width,
      height: height
    })]));
    var hitbox = new Dna.Components.Hitbox({
      width: width,
      height: height,
      hurtboxes: hurtboxes,
      onCollision: alignment.onCollision
      /*
      width,
      height,
      hurtboxes,
      alignment.callback
      */

      /*
      hurtbox => {
        //TODO set absolute
        hurtbox.gameObject.transform.x =
          this.transform.getAbsoluteCenter().x - WIDTH / 2 - hurtbox.radius;
        console.log("collision detected");
      }
      */

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
      console.log("collision detected"); //hurtbox.gameObject.ground();
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
      console.log("collision detected");
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
      console.log("collision detected");
    }
  }
};
exports.Alignments = Alignments;
},{}],"demos/collisions/collisions.js":[function(require,module,exports) {
"use strict";

var _Unit = require("./Unit");

var _Boundary = require("./Boundary");

var RADIUS = 20;
var canvas = new Dna.Canvas(document.getElementById("canvas"));
var gravity = new Dna.Components.SimplePhysics({
  xy: 5
}); //TODO handle mouse input

var circleInput = {
  87: "up",
  83: "down",
  65: "left",
  68: "right" //up: 87,
  //down: 83,
  //left: 65,
  //right: 68
  //jump: 32
  //secondary: 17

};
var circleKeyboard = new Dna.Input.Keyboard(circleInput);
var rectInput = {
  38: "up",
  40: "down",
  37: "left",
  39: "right" //up: 38,
  //down: 40,
  //left: 37,
  //right: 39

};
var rectKeyboard = new Dna.Input.Keyboard(rectInput); //let hero = new Hero(canvas, {}, circleKeyboard);

var circle = new Dna.GameObject(canvas, {
  x: -30
}, [new Dna.Components.Polygon({
  vert: 0,
  radius: RADIUS
})]);
var circlePhysics = new Dna.Components.SimplePhysics();
var circleHeroComponent = new _Unit.Unit(circleKeyboard, circlePhysics);
var circleHurtcircle = new Dna.Components.Hitcircle({
  radius: RADIUS
});
circle.addComponent(circlePhysics);
circle.addComponent(circleHeroComponent);
circle.addComponent(circleHurtcircle);
var rect = new Dna.GameObject(canvas, {
  x: 30
}, [new Dna.Components.Rectangle({
  width: RADIUS * 2,
  height: RADIUS * 2
})]);
var rectPhysics = new Dna.Components.SimplePhysics();
var rectHeroComponent = new _Unit.Unit(rectKeyboard, rectPhysics);
var rectHurtbox = new Dna.Components.Hitbox({
  width: RADIUS * 2,
  height: RADIUS * 2
});
rect.addComponent(rectPhysics);
rect.addComponent(rectHeroComponent);
rect.addComponent(rectHurtbox);
var circleHitcircle = new Dna.Components.Hitcircle({
  radius: RADIUS,
  hurtboxes: [rectHurtbox],
  onCollision: function onCollision(hurtbox) {
    //TODO these should be using absolute positions
    var xOffset = this.radius + hurtbox.width / 2;
    var leftLimit = hurtbox.gameObject.transform.x - xOffset;
    var rightLimit = hurtbox.gameObject.transform.x + xOffset;

    if (this.gameObject.transform.prevX <= leftLimit && this.gameObject.transform.x > leftLimit) {
      this.gameObject.transform.x = leftLimit;
    }

    if (this.gameObject.transform.prevX >= rightLimit && this.gameObject.transform.x < rightLimit) {
      this.gameObject.transform.x = rightLimit;
    }

    var yOffset = this.radius + hurtbox.height / 2;
    var topLimit = hurtbox.gameObject.transform.y - yOffset;
    var bottomLimit = hurtbox.gameObject.transform.y + yOffset;

    if (this.gameObject.transform.prevY <= topLimit && this.gameObject.transform.y > topLimit) {
      this.gameObject.transform.y = topLimit;
    }

    if (this.gameObject.transform.prevY >= bottomLimit && this.gameObject.transform.y < bottomLimit) {
      this.gameObject.transform.y = bottomLimit;
    }
  }
});
var rectHitbox = new Dna.Components.Hitbox({
  width: RADIUS * 2,
  height: RADIUS * 2,
  hurtboxes: [circleHurtcircle]
});
rect.addComponent(rectHitbox);
circle.addComponent(circleHitcircle); //TODO normalize callback by using alignment?? top, bottom, left, right

var SHORT = 10;
var LONG = 500;
var OFFSET = 100;
var hurtboxes = [circleHurtcircle, rectHurtbox]; //let hurtboxes = [hero.hurtbox];

var topBoundary = new _Boundary.Boundary(canvas, _Boundary.Alignments.TOP, -OFFSET, LONG, SHORT, hurtboxes);
var bottomBoundary = new _Boundary.Boundary(canvas, _Boundary.Alignments.BOTTOM, OFFSET, LONG, SHORT, hurtboxes);
var leftBoundary = new _Boundary.Boundary(canvas, _Boundary.Alignments.LEFT, -OFFSET, SHORT, LONG, hurtboxes);
var rightBoundary = new _Boundary.Boundary(canvas, _Boundary.Alignments.RIGHT, OFFSET, SHORT, LONG, hurtboxes);
},{"./Unit":"demos/collisions/Unit.js","./Boundary":"demos/collisions/Boundary.js"}],"../../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "35543" + '/');

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
},{}]},{},["../../../../../../usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","demos/collisions/collisions.js"], null)
//# sourceMappingURL=/collisions.9a1344ad.map