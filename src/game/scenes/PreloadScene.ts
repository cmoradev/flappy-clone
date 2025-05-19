import { Scene } from "phaser";
import { HEIGHT, WIDTH } from "../config";

export class PreloadScene extends Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  preload() {
    this.load.setPath("assets");

    this.load.image("menu", "menu.png");
    this.load.image("mouse-click", "mouse-click.png");

    this.load.image("background-day", "background-day.png");
    this.load.image("background-night", "background-night.png");

    this.load.image("pipe-green-bottom", "pipe-green-bottom.png");
    this.load.image("pipe-green-top", "pipe-green-top.png");
    this.load.image("pipe-red-bottom", "pipe-red-bottom.png");
    this.load.image("pipe-red-top", "pipe-red-top.png");

    this.load.spritesheet("bird-blue", "bird-blue-sprite.png", {
      frameWidth: 34,
      frameHeight: 24,
    });

    this.load.spritesheet("bird-yellow", "bird-yellow-sprite.png", {
      frameWidth: 34,
      frameHeight: 24,
    });
  }

  create() {
    this.add.image(0, 0, "background-night").setOrigin(0, 0);

    this.add
      .text(WIDTH / 2, HEIGHT - 50, "Cargando...", {
        fontSize: "16px",
        color: "#fff",
        align: "center",
      })
      .setOrigin(0.5, 0.5);

    this.scene.start("MenuScene");
  }
}
