class Rollover extends Dna.Component {
  constructor(r) {
    super();

    this.r = r;
  }

  update(deltaTime) {
    let canvas = this.gameObject.canvas;

    if (this.transform.position.x < -canvas.transform.width / 2 - this.r) {
      this.transform.position.x = canvas.transform.width / 2 + this.r;
    } else if (
      this.transform.position.x >
      canvas.transform.width / 2 + this.r
    ) {
      this.transform.position.x = -canvas.transform.width / 2;
    }
    if (this.transform.position.y < -canvas.transform.height / 2 - this.r) {
      this.transform.position.y = canvas.transform.height / 2 + this.r;
    } else if (
      this.transform.position.y >
      canvas.transform.height / 2 + this.r
    ) {
      this.transform.position.y = -canvas.transform.height / 2;
    }
  }
}

export { Rollover };
