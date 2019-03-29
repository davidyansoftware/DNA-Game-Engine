class Rollover extends Dna.Component {
  constructor(r) {
    super();

    this.r = r;
  }

  update(deltaTime) {
    let canvas = this.gameObject.getCanvas();

    if (this.gameObject.transform.position.x < -canvas.transform.width / 2 - this.r) {
      this.gameObject.transform.position.x = canvas.transform.width / 2 + this.r;
    } else if (
      this.gameObject.transform.position.x >
      canvas.transform.width / 2 + this.r
    ) {
      this.gameObject.transform.position.x = -canvas.transform.width / 2;
    }
    if (this.gameObject.transform.position.y < -canvas.transform.height / 2 - this.r) {
      this.gameObject.transform.position.y = canvas.transform.height / 2 + this.r;
    } else if (
      this.gameObject.transform.position.y >
      canvas.transform.height / 2 + this.r
    ) {
      this.gameObject.transform.position.y = -canvas.transform.height / 2;
    }
  }
}

export { Rollover };
