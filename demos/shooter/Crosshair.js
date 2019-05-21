import crosshair from "./assets/crosshair.png";

class CrosshairComponent extends Dna.Component {
  constructor(mouse) {
    super();

    this.mouse = mouse;
  }

  update(deltaTime) {
    //TODO find an easy way to set equal to
    this.transform.position.x = this.mouse.position.x;
    this.transform.position.y = this.mouse.position.y;
  }
}

//let crosshairImage = new Image();
//crosshairImage.src = crosshair;

class Crosshair extends Dna.GameObject {
  constructor(parent, mouse) {
    super(parent, {}, [
      new CrosshairComponent(mouse)
      //new Dna.Components.Image({ width: 21, height: 21, image: crosshairImage })
    ]);

    this.image = new Dna.Components.Image({
      width: 21,
      height: 21
      //image: crosshairImage
    });
    this.addComponent(this.image);
  }
}

export { Crosshair };
