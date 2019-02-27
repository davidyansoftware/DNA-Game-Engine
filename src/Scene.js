class Scene {
  constructor(canvases, assets, start) {
    //this.canvases = canvases || [];
    this.canvases = [];
    for (let canvas of canvases) {
      this.addCanvas(canvas);
    }

    this.assets = assets || new Assets();

    this.start = start;
  }

  addAssets(key, asset) {
    this.assets.key = asset;
  }

  addCanvas(canvas) {
    canvas.scene = this;
    this.canvases.push(canvas);
  }

  //TODO handle gameloop from here
  load() {
    this.assets.load.then(() => {
      console.log(this);
      this.start();
      window.requestAnimationFrame(currTime => {
        for (let canvas of this.canvases) {
          canvas.gameLoop(currTime);
        }
      });
    });
  }
}

class Assets {
  constructor(assets = {}) {
    this.assets = assets;

    this.load = new Promise(resolve => {
      let assets = [];
      for (let asset in this.assets) {
        assets.push(this.assets[asset].load);
      }
      Promise.all(assets).then(resolve);
    });
  }

  /*
  async load() {
    return new Promise(resolve => {
      let assets = [];
      for (let asset in this.assets) {
        assets.push(this.assets[asset].load);
      }
      Promise.all(assets).then(resolve);
    });
  }
  */

  get(key) {
    return this.assets[key];
  }
}

export { Scene, Assets };
