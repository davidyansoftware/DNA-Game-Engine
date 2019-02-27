# DNA Game Engine

This is a 2d game engine for creating HTML5 games using <canvas>.

## Getting Started

You can start making games with the engine by including a copy of dist/Dna.js from your page.

```
<script src=path/to/Dna.js></script>
```

The game engine can then be accessed through the global object Dna.

## Developing

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Requires node.js and npm

### Installing

Once you have those running, you can install all dependancies via npm

```
npm install --dev
```

### Demos

A few demo pages are available. These can be tested via npm scripts

```
npm run shooter
or
npm run platformer
or
npm run astroids
```

The demos will be available at http://localhost:1234

## Game Engine

Game - a Game is a collection of Canvases. The game handles the game loop to ensure all canvases stay in sync.

Canvas - each Canvas is a collection of Game Objects. the canvas interacts with the HTML5 <canvas> element for drawing and clearing.

GameObject - each Game Object is a collection of components. The Game Object holds shared state such as positioning.

Component - Each component handles updating and rendering on each frame. This is where the game logic ultimately takes place.

DnaGameEngine uses a component based architecture. a Game Object is a single in-game entity, which holds a Transform, and a list of Components that describe it's Behavior. A Game can be composed of any number of Game Objects, and Game Objects can contain any number of components. This allows Game Objects to contain different behavior (a playable hero will probably have an Image and a Hitbox), all tied to a set of shared state. Components can also be used among different Game Objects (your hero and his/her enemies will all need Images)

## Acknowledgements

Thanks to the following for assets used in demos

### Shooter

#### Art

https://opengameart.org/users/xelu - Controls

https://finalbossblues.itch.io/ - Character, guns, tileset

#### Sound

https://freesound.org

JustInvoke - Weapon on-hit

twisterman - Weapon swap

KlawyKogut - Weapon empty

GFL7 - Reload

Quaker540 - Flamethrower shoot

Marregheriti - Shotgun shoot

jobro - Pistol shoot

### Platformer

#### Art

https://www.gameart2d.com - Monsters

https://rvros.itch.io/ - Hero
