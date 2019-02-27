import { Component } from "../Component";

//TODO make this subcomponent of physics??
class Gravity extends Component() {
  constructor(simplePhysics, acceleration) {
    super();

    this.simplePhysics = simplePhysics;
    this.acceleration = acceleration;
  }

  update(deltaTime) {
    this.simplePhysics.yv -= this.acceleration * deltaTime;
  }
}
