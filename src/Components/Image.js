import { Component } from "../Component";

function recalculateIndex(image) {
  image._framesPerRow = image.width === 0 ? 1 : image.image.width / image.width;
  if (image.frameIndex >= image.numberOfFrames) image.frameIndex = 0;
  image._xIndex = (image.frameIndex + image.xIndexStart) % image._framesPerRow;
  image._yIndex =
    image.yIndexStart +
    Math.floor((image.xIndexStart + image.frameIndex) / image._framesPerRow);
}

function getWeightedIndex(arr) {
  let random = Math.random();
  let prevTotal = 0;
  for (let i = 0; i < arr.length; i++) {
    if (random < arr[i] + prevTotal) {
      return i;
    }
    prevTotal += arr[i];
  }
  return -1;
}

//TODO use symbols??
const types = {
  default: "default",
  tiled: "tiled",
  stretched: "stretched",
  randomTiled: "randomTiled"
};

class Image extends Component {
  constructor(options = {}) {
    super();

    this.active = true;
    this.play = true;

    this.image = new window.Image();

    this.type = types.default;

    this.ticksPerFrame = 0;
    this.numberOfFrames = 1;

    this._xIndex = 0;
    this._yIndex = 0;
    this.xIndexStart = 0;
    this.yIndexStart = 0;
    this._framesPerRow = 1; //TODO this needs a better default

    this.loop = true;
    this.onFinish = function() {};

    // these are for random tiling
    this.xWeight = [1];
    this.yWeight = [1];

    this.frameIndex = 0;
    this.tickCount = 0;

    this.updateOptions(options);

    //TODO reverse this naming
    this.width = this.width || this.image.width;
    this.height = this.height || this.image.height;
    this.destWidth = this.destWidth || this.width;
    this.destHeight = this.destHeight || this.height;
  }

  updateOptions(options = {}) {
    //TODO generalize this to a property of component? distinguish updates from composite
    if (options.active !== undefined) this.active = options.active;
    if (options.play !== undefined) this.play = options.play;

    // checking for undefined to account for 0 values
    if (options.image !== undefined) this.image = options.image;

    if (options.type !== undefined) this.type = options.type;

    //TODO could generlize below, but not above. override?
    if (options.width !== undefined) this.width = options.width;
    if (options.height !== undefined) this.height = options.height;

    if (options.destWidth !== undefined) this.destWidth = options.destWidth;
    if (options.destHeight !== undefined) this.destHeight = options.destHeight;

    if (options.xWeight !== undefined) this.xWeight = options.xWeight;
    if (options.yWeight !== undefined) this.yWeight = options.yWeight;

    if (options.ticksPerFrame !== undefined)
      this.ticksPerFrame = options.ticksPerFrame;
    if (options.numberOfFrames !== undefined)
      this.numberOfFrames = options.numberOfFrames;

    if (options.startingColumn !== undefined)
      this.xIndexStart = options.startingColumn;
    if (options.startingRow !== undefined)
      this.yIndexStart = options.startingRow;

    if (options.loop !== undefined) this.loop = options.loop;
    if (options.onFinish !== undefined) this.onFinish = options.onFinish;

    if (options.frameIndex !== undefined) this.frameIndex = options.frameIndex;
    if (options.tickCount !== undefined) this.tickCount = options.tickCount;

    recalculateIndex(this);
  }

  update(deltaTime) {
    if (!this.play) return;

    this.tickCount++;
    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;
      //let currentFrame = this.frameIndex(this.xIndex, this.yIndex);
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

  render(ctx) {
    if (!this.active) return;

    let destWidth = this.destWidth === undefined ? this.width : this.destWidth;
    let destHeight =
      this.destHeight === undefined ? this.height : this.destHeight;
    //console.log(this.image);
    if (this.type === types.stretched) {
      ctx.drawImage(
        this.image,
        this._xIndex * this.width,
        this._yIndex * this.height,
        this.width,
        this.height,
        -destWidth / 2,
        -destHeight / 2,
        destWidth,
        destHeight
      );
    } else if (this.type === types.tiled) {
      //TODO this wont be bounded correctly
      let currTileX = -destWidth / 2;
      let endTileX = destWidth / 2;

      let endTileY = destHeight / 2;
      while (currTileX < endTileX) {
        let currTileY = -destHeight / 2;
        while (currTileY < endTileY) {
          ctx.drawImage(
            this.image,
            this._xIndex * this.width,
            this._yIndex * this.height,
            this.width,
            this.height,
            currTileX,
            currTileY,
            this.width,
            this.height
          );

          currTileY += this.height;
        }
        currTileX += this.width;
      }
    } else if (this.type === types.randomTiled) {
      let numTilesX = this.xWeight.length;
      let numTilesY = this.yWeight.length;

      let tileWidth = this.width / numTilesX;
      let tileHeight = this.height / numTilesY;

      //TODO this wont be bounded correctly
      let currTileX = -destWidth / 2;
      let endTileX = destWidth / 2;

      let endTileY = destHeight / 2;
      while (currTileX < endTileX) {
        let currTileY = -destHeight / 2;
        while (currTileY < endTileY) {
          let xRandom = getWeightedIndex(this.xWeight);
          let yRandom = getWeightedIndex(this.yWeight);

          let xTile = this._xIndex * this.width + xRandom * tileWidth;
          let yTile = this._yIndex * this.height + yRandom * tileHeight;

          ctx.drawImage(
            this.image,
            xTile,
            yTile,
            tileWidth,
            tileHeight,
            currTileX,
            currTileY,
            tileWidth,
            tileHeight
          );

          currTileY += tileHeight;
        }
        currTileX += tileWidth;
      }
    } else {
      // default
      //TODO currently just draws at source size, may need to bound?
      ctx.drawImage(
        this.image,
        this._xIndex * this.width,
        this._yIndex * this.height,
        this.width,
        this.height,
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      );
    }
  }
}

Image.types = types;

export { Image };
