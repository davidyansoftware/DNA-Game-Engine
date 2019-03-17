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

const ImageAsset = function(src) {
  let image = new window.Image();
  image.src = src;
  image.load = new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });
  return image;
};

export { ImageAsset };
