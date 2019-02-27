import { Component } from "../Component";

//TODO maybe dont make audio a component??
class Audio extends Component {
  constructor(options = {}) {
    super();

    this.audio = new window.Audio();

    this.audio.volume = options.volume || 1;
  }

  play(clip) {
    //TODO this is causing problems when multiple monster are getting hit at once
    this.audio.src = clip;
    this.audio.currentTime = 0;
    this.audio.play();
  }
}

export { Audio };
