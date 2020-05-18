import "phaser";
import { StartScene } from "./scenes/StartScene";
import { Level1Scene } from "./scenes/Level1Scene";
import { EndScene } from "./scenes/EndScene";

// main game configuration
const config: Phaser.Types.Core.GameConfig = {
  width: 750,
  height: 500,
  type: Phaser.AUTO,
  parent: "game",
  backgroundColor: "6de1f1",
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 400 },
      // enableBody: true,
    }
  },
  scene: [StartScene,Level1Scene, EndScene]
};

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
  const game = new Game(config);
});
