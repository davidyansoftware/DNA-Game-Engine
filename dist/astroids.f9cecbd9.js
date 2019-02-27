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
})({"astroids/Ship.js":[function(require,module,exports) {
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

var SHIP_COLOR = "black";
var SHIP_SIZE = 30;
var SHIP_THRUST = 5;
var FRICTION = 0.7;
var TURN_SPEED = 360; // degrees per second

var SHIP_RADIUS = SHIP_SIZE / 2;

var Ship =
/*#__PURE__*/
function (_Dna$Component) {
  _inherits(Ship, _Dna$Component);

  function Ship(options) {
    _classCallCheck(this, Ship);

    return _possibleConstructorReturn(this, _getPrototypeOf(Ship).call(this));
  }

  _createClass(Ship, [{
    key: "render",
    value: function render() {
      var ctx = this.gameObject.getContext();
      ctx.strokeStyle = SHIP_COLOR;
      ctx.lineWidth = SHIP_SIZE / 20;
      ctx.beginPath();
      ctx.moveTo(0, -SHIP_RADIUS);
      ctx.lineTo(2 / 3 * SHIP_RADIUS, SHIP_RADIUS);
      ctx.lineTo(-(2 / 3) * SHIP_RADIUS, SHIP_RADIUS);
      ctx.closePath();
      ctx.stroke();
    }
  }]);

  return Ship;
}(Dna.Component);

exports.Ship = Ship;
},{}],"astroids/ShipPrefab.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipPrefab = void 0;

var _Ship = require("./Ship");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ShipPrefab =
/*#__PURE__*/
function (_Dna$GameObject) {
  _inherits(ShipPrefab, _Dna$GameObject);

  function ShipPrefab(parent, position) {
    _classCallCheck(this, ShipPrefab);

    return _possibleConstructorReturn(this, _getPrototypeOf(ShipPrefab).call(this, parent, position, [new _Ship.Ship()])); //this.r = polygon.r;

    /*
    this.components["Hitbox"] = new Hitbox(this, {
      collisionClass: "ship",
      r: this.options.r,
      onHit: {
        astroid: function(astroid) {
          console.log("ship hit");
        }
      },
      show: true
    });
    */
  }

  return ShipPrefab;
}(Dna.GameObject);

exports.ShipPrefab = ShipPrefab;
},{"./Ship":"astroids/Ship.js"}],"astroids/Astroid.js":[function(require,module,exports) {
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

  function Astroid(r) {
    var _this;

    _classCallCheck(this, Astroid);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Astroid).call(this));
    _this.r = r;
    return _this;
  }

  _createClass(Astroid, [{
    key: "update",
    value: function update(elapsedTime) {
      /*
      let absoluteCenter = this.position.getAbsoluteCenter();
      // handle edge of screen
      if (absoluteCenter.x < 0 - this.options.r) {
          absoluteCenter.x = this.canvas.width + this.options.r;
      } else if (absoluteCenter.x > this.canvas.width + this.options.r) {
          absoluteCenter.x = 0 - this.options.r;
      }
      if (absoluteCenter.y < 0 - this.options.r) {
          absoluteCenter.y = this.canvas.height + this.options.r;
      } else if (absoluteCenter.y > this.canvas.height + this.options.r) {
          absoluteCenter.y = 0 - this.options.r;
      }
      */
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

  return Astroid;
}(Dna.Component);

exports.Astroid = Astroid;
},{}],"astroids/AstroidPrefab.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AstroidPrefab = void 0;

var _Astroid = require("./Astroid");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ASTROID_SPEED = 5; // max starting speed

var ASTROID_VERT = 10; // average num of vertecies on each astroid

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

  function AstroidPrefab(parent, position, level) {
    var _this;

    var r = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ASTROID_LARGE;

    _classCallCheck(this, AstroidPrefab);

    var levelMultiplier = 1 + 0.1 * level;
    _this = _possibleConstructorReturn(this, _getPrototypeOf(AstroidPrefab).call(this, parent, position, [new Dna.Components.Polygon({
      r: r,
      vert: Math.floor(Math.random() * (ASTROID_VERT + 1) + ASTROID_VERT / 2),
      jaggedness: ASTROID_JAG
    }), new Dna.Components.Physics({
      xv: Math.random() * ASTROID_SPEED * levelMultiplier * (Math.random() < 0.5 ? 1 : -1),
      yv: Math.random() * ASTROID_SPEED * levelMultiplier * (Math.random() < 0.5 ? 1 : -1)
    }), new _Astroid.Astroid(r)]));
    _this.r = r;
    return _this;
  } //TODO this should be in astroids component, need way to access


  _createClass(AstroidPrefab, [{
    key: "destroyAstroid",
    value: function destroyAstroid(astroids) {
      var points = 0;

      if (this.options.r == ASTROID_LARGE) {
        astroids.push(new _Astroid.Astroid(this.parent, {
          x: this.position.x,
          y: this.position.y
        }, ASTROID_MEDIUM));
        astroids.push(new _Astroid.Astroid(this.parent, {
          x: this.position.x,
          y: this.position.y
        }, ASTROID_MEDIUM));
        points = ASTROID_POINTS_LARGE;
      } else if (this.options.r == ASTROIDS_MEDIUM) {
        astroids.push(new _Astroid.Astroid(this.parent, {
          x: this.position.x,
          y: this.position.y
        }, ASTROID_SMALL));
        astroids.push(new _Astroid.Astroid(this.parent, {
          x: this.position.x,
          y: this.position.y
        }, ASTROID_SMALL));
        points = ASTROID_POINTS_MEDIUM;
      } else {
        points = ASTROID_POINTS_SMALL;
      }

      var index = astroids.indexOf(this);
      astroids.splice(index, 1);
      return points;
    }
  }]);

  return AstroidPrefab;
}(Dna.GameObject);

exports.AstroidPrefab = AstroidPrefab;
},{"./Astroid":"astroids/Astroid.js"}],"astroids/astroids.js":[function(require,module,exports) {
"use strict";

var _ShipPrefab = require("./ShipPrefab");

var _AstroidPrefab = require("./AstroidPrefab");

var NUM_ASTROIDS = 4;
var ASTROID_SIZE = 100;
var canvas = new Dna.Canvas(document.getElementById("canvas"));
var ship = new _ShipPrefab.ShipPrefab(canvas);
var level = 0;
var astroids = [];

function distBetweenPoints(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

createAstroidBelt(canvas);
canvas.getContext().restore();
canvas.getContext().restore();
canvas.getContext().restore();

function createAstroidBelt(canvas) {
  astroids = []; //astroidsTotal = (NUM_ASTROIDS + level) * 7;
  //astroidsLeft = astroidsTotal;

  var domCanvas = canvas.getContext().canvas;
  var x, y;
  var dist;

  for (var i = 0; i < NUM_ASTROIDS + level; i++) {
    do {
      x = Math.random() * domCanvas.width - domCanvas.width / 2;
      y = Math.random() * domCanvas.height - domCanvas.height / 2;
      dist = distBetweenPoints(ship.transform.x, ship.transform.y, x, y);
    } while (dist < ASTROID_SIZE + ship.r);

    astroids.push(new _AstroidPrefab.AstroidPrefab(canvas, {
      x: x,
      y: y
    }, level));
  }
}
},{"./ShipPrefab":"astroids/ShipPrefab.js","./AstroidPrefab":"astroids/AstroidPrefab.js"}],"C:/Users/David/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64869" + '/');

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
},{}]},{},["C:/Users/David/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","astroids/astroids.js"], null)
//# sourceMappingURL=/astroids.f9cecbd9.map