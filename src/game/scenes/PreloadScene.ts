import { Scene } from "phaser";
import { HEIGHT } from "../config";

export class PreloadScene extends Scene {
  constructor() {
    super({ key: "PreloadScene" });
  }

  preload() {
    this.load.setPath("assets");
  }

  create() {
    this.add.text(100, 100, "Cargando...", {
      fontSize: "32px",
      color: "#5b3573",
    });
  }
}
