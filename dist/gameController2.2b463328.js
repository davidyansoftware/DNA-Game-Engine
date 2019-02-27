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
})({"gameController2.js":[function(require,module,exports) {
//let engine = Engine("game", ["canvas"]);
var canvas = new Dna.Canvas(document.getElementById("canvas"));
var cursor = {
  x: 0,
  y: 0
};
var input = {
  up: 87,
  down: 83,
  left: 65,
  right: 68,
  primary: 32 //secondary: 17

};
var attached = true;

function readInput(input) {
  console.log(input); //TODO maybe this should be an event handler
  //TODO should only update options if different

  player.physics.direction.x = 0;
  player.physics.direction.y = 0;

  if (input.left) {
    player.physics.direction.x -= 5;
  }

  if (input.right) {
    player.physics.direction.x += 5;
  }

  if (input.up) {
    player.physics.direction.y -= 5;
  }

  if (input.down) {
    player.physics.direction.y += 5;
  }

  if (input.primary) {
    if (attached) {
      rightHand.setParent(canvas, true);
    } else {
      rightHand.setParent(player, true);
    }

    attached = !attached;
  }
} //TODO this cant only be called from onmousemove, needs to account for movement of the player


function onMouseMove(pos) {
  cursor.x = pos.x;
  cursor.y = pos.y; //console.log(cursor);
}

new Dna.Input(canvas, input, readInput, onMouseMove);
canvas.getContext().canvas.addEventListener("click", function (event) {
  console.log("right hand" + rightHand.transform.x + " " + rightHand.transform.y);
  rightHand.setParent(canvas, true); //TODO the hand will be child of canvas, so absolute coordinates will work, but may need to check absolute vs relative later

  rightHand.tween.moveTo(function () {
    console.log("calling position callback");
    return {
      x: event.clientX - canvas.transform.getAbsoluteCenter().x,
      y: event.clientY - canvas.transform.getAbsoluteCenter().y
    };
  }, function () {
    console.log("calling finished callback");
    rightHand.tween.moveTo(function () {
      var absolutePosition = player.transform.getAbsolutePosition(12.5, -12.5);
      absolutePosition.x -= canvas.transform.getAbsoluteCenter().x;
      absolutePosition.y -= canvas.transform.getAbsoluteCenter().y;
      console.log(absolutePosition);
      return absolutePosition;
    }, function () {
      rightHand.setParent(player, true);
    });
  });
}); //let test = new Dna.GameObject();

var player = new Dna.GameObject(canvas, {
  x: 0,
  y: 0,
  update: function update() {
    //TODO this is currently position object. consolidate with gameobject
    //console.log(this);
    //console.log(player.position.getAbsoluteCenter());
    var dx = cursor.x - player.transform.getAbsoluteCenter().x;
    var dy = cursor.y - player.transform.getAbsoluteCenter().y;
    this.transform.rotation = Math.atan2(dy, dx) * 180 / Math.PI + 90; //console.log(this.position.rotation);
  }
}, {
  r: 20
});
var playerCenter = new Dna.Circle(canvas, {
  x: player.transform.getAbsoluteCenter().x,
  y: player.transform.getAbsoluteCenter().y,
  update: function update() {
    this.transform.x = player.transform.getAbsoluteCenter().x - canvas.transform.getAbsoluteCenter().x;
    this.transform.y = player.transform.getAbsoluteCenter().y - canvas.transform.getAbsoluteCenter().y;
  }
}, {
  r: 10
});
var leftHand = new Dna.Circle(player, {
  x: -12.5,
  y: -12.5
}, {
  r: 10
});
var leftHandCenter = new Dna.Circle(canvas, {
  x: leftHand.transform.getAbsoluteCenter().x,
  y: leftHand.transform.getAbsoluteCenter().y,
  update: function update() {
    this.transform.x = leftHand.transform.getAbsoluteCenter().x - canvas.transform.getAbsoluteCenter().x;
    this.transform.y = leftHand.transform.getAbsoluteCenter().y - canvas.transform.getAbsoluteCenter().y;
  }
}, {
  r: 5
});
var leftHandCenter2 = new Dna.Circle(canvas, {
  x: player.transform.getAbsolutePosition(12.5, -12.5).x,
  y: player.transform.getAbsolutePosition(12.5, -12.5).y,
  update: function update() {
    this.transform.x = player.transform.getAbsolutePosition(12.5, -12.5).x - canvas.transform.getAbsoluteCenter().x;
    this.transform.y = player.transform.getAbsolutePosition(12.5, -12.5).y - canvas.transform.getAbsoluteCenter().y;
  }
}, {
  r: 5
});
var rightHand = new Dna.Circle(player, {
  x: 12.5,
  y: -12.5
}, {
  r: 10
});
var rightHandCenter = new Dna.Circle(canvas, {
  x: rightHand.transform.getAbsoluteCenter().x,
  y: rightHand.transform.getAbsoluteCenter().y,
  update: function update() {
    this.transform.x = rightHand.transform.getAbsoluteCenter().x - canvas.transform.getAbsoluteCenter().x;
    this.transform.y = rightHand.transform.getAbsoluteCenter().y - canvas.transform.getAbsoluteCenter().y;
  }
}, {
  r: 5
});
},{}],"C:/Users/David/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49801" + '/');

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
},{}]},{},["C:/Users/David/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","gameController2.js"], null)
//# sourceMappingURL=/gameController2.2b463328.map