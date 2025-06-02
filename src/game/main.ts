import { AUTO, Game, Scale, Types } from "phaser";
import { WIDTH, HEIGHT, BACKGROUND_COLOR } from "./config";
import { PreloadScene } from "./scenes/PreloadScene";
import { MenuScene } from "./scenes/MenuScene";
import { ScoreScene } from "./scenes/ScoreScene";
import { GameScene } from "./scenes/GameScene";
import { GameOverScene } from "./scenes/GameOverScene";

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config: Types.Core.GameConfig = {
  type: AUTO,
  width: WIDTH,
  height: HEIGHT,
  parent: "game-container",
  backgroundColor: BACKGROUND_COLOR,
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { x: 0, y: 1000 }
    }
  },
  scene: [
    PreloadScene,
    MenuScene,
    GameOverScene,
    GameScene,
    ScoreScene,
  ],
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;
