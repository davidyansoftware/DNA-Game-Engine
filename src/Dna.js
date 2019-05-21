import { Canvas, StaticCanvas } from "./Canvas";
import { GameObject } from "./GameObject";
import { Component } from "./Component";
import { Scene, Assets } from "./Scene";

//import { Transform } from "./Components/Transform";
import { Image } from "./Components/Image";
import { Polygon } from "./Components/Polygon";
import { Rectangle } from "./Components/Rectangle";
import { Physics } from "./Components/Physics";
import { Acceleration } from "./Components/Acceleration";
import { Hitcircle } from "./Components/Hitcircle";
import { Hitbox } from "./Components/Hitbox";
import { Hitpoint } from "./Components/Hitpoint";
import { Text } from "./Components/Text";
import { Audio } from "./Components/Audio";
import { Slider } from "./Components/Slider";
import { Camera } from "./Components/Camera";

//import { Vector } from "./Utilities/Vector";
//import { Coordinates } from "./Utilities/Coordinates";
import { Degrees, Radians } from "./Utilities/Angle";
import { Coordinates, Vector } from "./Utilities/Position";

//TODO this needs to be totally reworked
import { Input } from "./Input/Input";
import { Keyboard } from "./Input/Keyboard";
import { Mouse } from "./Input/Mouse";

import { ImageAsset } from "./Assets/Image";

let Dna = {
  //TODO should probably consolidate these
  Canvas: Canvas,
  StaticCanvas: StaticCanvas,
  GameObject: GameObject,
  Component: Component,
  Scene: Scene,
  Assets: Assets,
  //Transform: Transform,

  Components: {
    Image: Image,
    Polygon: Polygon,
    Rectangle: Rectangle,
    Physics: Physics,
    Acceleration: Acceleration,
    Hitcircle: Hitcircle,
    Hitbox: Hitbox,
    Hitpoint: Hitpoint,
    Text: Text,
    Audio: Audio,
    Slider: Slider,
    Camera: Camera
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
  Asset: {
    Image: ImageAsset
  }
};

window.Dna = Dna;
