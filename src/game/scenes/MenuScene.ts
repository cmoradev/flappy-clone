import { Scene } from "phaser";

export class MenuScene extends Scene {
  constructor() {
    super({ key: "MenuScene" });
  }

  create () {
    this.add.text(100, 100, "Play now", {
      fontSize: "32px",
      color: "#5b3573",
    });

    this.add.text(100, 200, "Show Score", {
      fontSize: "32px",
      color: "#5b3573",
    });
  }
}
