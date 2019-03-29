class Scene {
  constructor(canvases, assets, start) {
    //this.canvases = canvases || [];
    this.canvases = [];
    for (let canvas of canvases) {
      this.addCanvas(canvas);
    }

    this.assets = assets || new Assets();

    this.start = start;

    this.prevTime;
  }

  addAssets(key, asset) {
    this.assets.key = asset;
  }

  addCanvas(canvas) {
    canvas.scene = this;
    this.canvases.push(canvas);
  }

  load() {
    this.assets.load.then(() => {
      this.start();
      window.requestAnimationFrame(currTime => {
        this.gameLoop(currTime);
      });
    });
  }

  gameLoop(currTime) {
    console.log(this);
    if (!this.prevTime) this.prevTime = currTime;
    let deltaTime = (currTime - this.prevTime) / 1000;
    this.prevTime = currTime;

    for (let canvas of this.canvases) {
      canvas.clear();
      canvas.updateAll(deltaTime);
      canvas.renderAll(canvas.ctx);
    }

    window.requestAnimationFrame(currTime => {
      this.gameLoop(currTime);
    });
  }
}

class Assets {
  constructor(assets = {}) {
    this.assets = assets;

    this.load = new Promise(resolve => {
      let assets = [];
      for (let asset in this.assets) {
        //TODO get function?
        assets.push(this.assets[asset].load);
      }
      Promise.all(assets).then(resolve);
    });
  }

  get(key) {
    return this.assets[key];
  }
}

export { Scene, Assets };
