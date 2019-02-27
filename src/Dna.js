import { Canvas, StaticCanvas } from "./Canvas";
import { GameObject } from "./GameObject";
import { Component } from "./Component";

//import { Transform } from "./Components/Transform";
import { Image } from "./Components/Image";
import { SimplePhysics } from "./Components/SimplePhysics";
import { Polygon } from "./Components/Polygon";
import { Rectangle } from "./Components/Rectangle";
import { Physics } from "./Components/Physics";
import { Acceleration } from "./Components/Acceleration";
import { Hitcircle } from "./Components/Hitcircle";
import { Hitbox } from "./Components/Hitbox";
import { Text } from "./Components/Text";
import { Audio } from "./Components/Audio";

//import { Vector } from "./Utilities/Vector";
//import { Coordinates } from "./Utilities/Coordinates";
import { Degrees, Radians } from "./Utilities/Angle";
import { Coordinates, Vector } from "./Utilities/Position";

//TODO this needs to be totally reworked
import { Input } from "./Input/Input";
import { Keyboard } from "./Input/Keyboard";
import { Mouse } from "./Input/Mouse";

import { DomImage } from "./Dom/Image";

let Dna = {
  //TODO should probably consolidate these
  Canvas: Canvas,
  StaticCanvas: StaticCanvas,
  GameObject: GameObject,
  Component: Component,
  //Transform: Transform,

  Components: {
    Image: Image,
    SimplePhysics: SimplePhysics,
    Polygon: Polygon,
    Rectangle: Rectangle,
    Physics: Physics,
    Acceleration: Acceleration,
    Hitcircle: Hitcircle,
    Hitbox: Hitbox,
    Text: Text,
    Audio: Audio
  },
  Utilities: {
    Degrees: Degrees,
    Radians: Radians,
    Coordinates: Coordinates,
    Vector: Vector
  },
  Input: {
    Input: Input,
    Keyboard: Keyboard,
    Mouse: Mouse
  },
  Dom: {
    Image: DomImage
  }
};

window.Dna = Dna;
