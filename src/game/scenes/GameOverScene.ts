import { Scene } from "phaser";

export class GameOverScene extends Scene {
  constructor() {
    super({ key: "GameOverScene" });
  }

  create() {
    this.add.image(0, 0, "background-night").setOrigin(0, 0);

    this.add.text(this.scale.width / 2, 100, "Game Over", {
      fontSize: "32px",
      color: "#fff",
    }).setOrigin(.5, .5);

    this.add.text(this.scale.width / 2, 200, 'You score: 5\nBest Score: 10', {
      fontSize: "24px",
      color: "#fff",
      align: 'center'
    }).setOrigin(.5, .5);

    const tryAgainText = this.add.text(this.scale.width / 2, 280, 'Try again', {
      fontSize: "24px",
      color: "#fff",
      align: 'center'
    }).setOrigin(.5, .5).setInteractive();

    tryAgainText.on('pointerdown', () => {
      this.scene.start('GameScene');
    });
  }
}
