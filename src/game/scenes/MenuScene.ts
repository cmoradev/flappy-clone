import { Scene } from "phaser";
import { HEIGHT, WIDTH } from "../config";

export class MenuScene extends Scene {
  constructor() {
    super({ key: "MenuScene" });
  }

  create () {
    this.add.image(0, 0, 'background-night').setOrigin(0, 0);

    this.add.image(WIDTH / 2, 160, 'menu').setScale(.8);

    const startButton = this.add.image(WIDTH / 2, 300, 'mouse-click').setScale(1.5).setInteractive();

    startButton.on('pointerdown', () => {
      this.scene.start("GameScene");
    });
  }
}
