import { Scene, Physics, GameObjects } from "phaser";
import { HEIGHT } from "../config";

export class GameScene extends Scene {
  private score = 0;
  private topScore = 0;

  private pipeGroup: Physics.Arcade.Group;
  private scoreText: GameObjects.Text;
  private bird: Physics.Arcade.Sprite;

  private readonly birdFlapPower = 300;
  private readonly pipeInterval = 2000;
  private readonly pipeHole = 120;
  private readonly birdSpeed = 125;

  constructor() {
    super({ key: "GameScene" });
  }

  create() {
    this.add.image(0, 0, "background-night").setOrigin(0, 0);

    this.setDefaults();
  
    this.pipeGroup = this.physics.add.group();
    this.scoreText = this.add.text(10, 10, "-", {
      fontSize: "16px",
      color: "#fff",
      align: "left",
    });

    this.updateScore();

    this.cameras.main.setBackgroundColor("#87CEEB");

    this.bird = this.physics.add.sprite(80, 240, "bird-yellow");
    this.bird.setOrigin(0.5);
    this.bird.setGravityY(800);

    this.input.on("pointerdown", this.flipBird, this);

    this.time.addEvent({
      delay: this.pipeInterval,
      callback: this.addPipe,
      callbackScope: this,
      loop: true,
    });

    this.addPipe();

    this.physics.add.collider(this.bird, this.pipeGroup, this.die, undefined, this);
  }

  update(): void {
    if (this.bird.y > this.scale.height) {
      this.die();
    }
  }

  private addPipe() {
    const pipeHolePosition = Phaser.Math.Between(50, 430 - this.pipeHole);

    const upperPipe = this.physics.add.sprite(150, pipeHolePosition - HEIGHT, "pipe-red-bottom");
    upperPipe.setVelocityX(-this.birdSpeed);
    this.pipeGroup.add(upperPipe);

    const lowerPipe = this.physics.add.sprite(150, pipeHolePosition + this.pipeHole, "pipe-red-top");
    lowerPipe.setVelocityX(-this.birdSpeed);
    this.pipeGroup.add(lowerPipe);
  }

  private die() {
    const bestScore = Math.max(this.score, this.topScore);

    localStorage.setItem("topFlappyScore", bestScore.toString());

    this.scene.start("GameOverScene", {
      score: bestScore.toString(),
    });
  }

  private flipBird() {
    this.bird.setVelocityY(-this.birdFlapPower);
    this.bird.setAngle(-20);
  }

  private updateScore() {
    this.scoreText.setText(`Score: ${this.score}\nBest: ${this.topScore}`);
  }

  private setDefaults() {
    this.score = 0;
    this.topScore = parseInt(localStorage.getItem("topFlappyScore") || "0");
  }
}
