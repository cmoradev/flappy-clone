import { Scene, Physics, GameObjects } from "phaser";

export class GameScene extends Scene {
  private topScore = 0;
  private score = 0;

  private bird!: Physics.Arcade.Sprite;
  private pipes!: Physics.Arcade.Group;
  private zones!: Physics.Arcade.Group;
  private scoreText!: GameObjects.Text;

  private readonly pipeHole = 150;
  private readonly pipeInterval = 2000;
  private readonly birdFlapPower = 350;
  private readonly speed = 200;

  constructor() {
    super("GameScene");
  }

  preload() {
    this.load.image("bird", "assets/bird.png");
    this.load.image("pipe", "assets/pipe.png");
    this.load.image("background", "assets/background.png");
  }

  create() {
    this.add.image(0, 0, "background-night").setOrigin(0, 0);

    this.bird = this.physics.add
      .sprite(80, 240, "bird-yellow")
      .setOrigin(0.5, 0.5);

    this.pipes = this.physics.add.group({
      immovable: true,
      allowGravity: false,
    });

    this.zones = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    this.scoreText = this.add.text(10, 10, "-", {
      fontSize: "16px",
      color: "#fff",
    });

    this.setDefaults();

    this.updateScore();

    this.time.addEvent({
      delay: this.pipeInterval,
      callback: this.addPipe,
      callbackScope: this,
      loop: true,
    });

    this.input.keyboard?.on("keydown-SPACE", this.flap, this);
    this.input.on("pointerdown", this.flap, this);

    this.physics.add.collider(this.bird, this.pipes, this.die, undefined, this);
  }

  update() {
    if (this.bird.y > this.scale.height) {
      this.die();
    }

    if (this.bird.angle < 20) {
      this.bird.angle += 2;
    }
  }

  private flap() {
    this.bird.setVelocityY(-this.birdFlapPower);
    this.bird.setAngle(-40);
  }

  private die() {
    const bestScore = Math.max(this.score, this.topScore);

    localStorage.setItem("topFlappyScore", bestScore.toString());

    this.scene.start("GameOverScene", {
      score: bestScore.toString(),
    });
  }

  private addPipe() {
    const pipeHolePosition = Phaser.Math.Between(50, 430 - this.pipeHole);

    // Tubería superior
    const topPipe = this.pipes.create(550, pipeHolePosition, "pipe-red-top");
    topPipe.setData("giveScore", true);
    topPipe.setOrigin(0.5, 1);

    // Tubería inferior
    const bottomPipe = this.pipes.create(550,pipeHolePosition + this.pipeHole, "pipe-red-bottom"); 
    bottomPipe.setData("giveScore", true);
    bottomPipe.setOrigin(0.5, 0);

    // Mover ambos
    this.pipes.setVelocityX(-this.speed);
  }

  private updateScore() {
    this.scoreText.setText(`Score: ${this.score}\nBest: ${this.topScore}`);
  }

  private setDefaults() {
    this.score = 0;
    this.topScore = parseInt(localStorage.getItem("topFlappyScore") || "0");
  }
}
