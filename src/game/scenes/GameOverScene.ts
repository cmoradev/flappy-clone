import { Scene } from "phaser";

export class GameOverScene extends Scene {
  constructor() {
    super({ key: "GameOverScene" });
  }

  create() {
    this.add.text(100, 100, "Score: 150", {
      fontSize: "32px",
      color: "#5b3573",
    });
  }
}
