import { GameObjects, Physics, Scene, Types } from "phaser";

export class GameScene extends Scene {
  private bird: Physics.Arcade.Sprite;
  private pipes: Physics.Arcade.Group;
  private zones: Physics.Arcade.Group;

  private pipeInterval = 2000;
  private pipeHole = 150;
  private speed = 200;

  private score: number;
  private scoreBoard: GameObjects.Text;

  constructor() {
    super({ key: "GameScene" });
  }

  create() {
    this.score = 0;

    this.add.image(0, 0, "background-night").setOrigin(0, 0);

    this.scoreBoard = this.add.text(20, 20, "Score: 0", {
      fontSize: "16px",
      color: "#fff",
    });

    this.bird = this.physics.add.sprite(80, 240, "bird-yellow");

    this.anims.create({
      key: "fly",
      frames: this.anims.generateFrameNumbers("bird-yellow", { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1,
    });

    this.pipes = this.physics.add.group({
      immovable: true,
      allowGravity: false,
    });

    this.zones = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    this.time.addEvent({
      delay: this.pipeInterval,
      loop: true,
      callbackScope: this,
      callback: this.addPipe,
    });

    this.physics.add.collider(this.bird, this.pipes, this.die, undefined, this);
    this.physics.add.overlap(
      this.bird,
      this.zones,
      this.setPoint,
      undefined,
      this
    );

    this.input.keyboard?.on("keydown-SPACE", this.flap, this);

    this.bird.anims.play('fly', true);
  }
  
  update(): void {
    if (this.bird.angle < 20) {
      this.bird.angle += 2;
    }
  }

  private flap() {
    this.bird.setVelocityY(-300);
    this.bird.setAngle(-40);
  }

  private addPipe() {
    const pipeHolePosition = Phaser.Math.Between(50, 430 - this.pipeHole);

    const topPipe = this.pipes.create(400, pipeHolePosition, "pipe-red-top");
    topPipe.setOrigin(0.5, 1);

    const bottonPipe = this.pipes.create(
      400,
      pipeHolePosition + this.pipeHole,
      "pipe-red-bottom"
    );
    bottonPipe.setOrigin(0.5, 0);

    const zone = this.zones.create(
      400,
      pipeHolePosition + this.pipeHole / 2,
      undefined
    );
    zone.setSize(52, this.pipeHole);
    zone.setVisible(false);

    this.zones.setVelocityX(-this.speed);
    this.pipes.setVelocityX(-this.speed);
  }

  private setPoint(bird: any, zone: any) {
    zone.disableBody(true, true);

    this.score++;
    this.scoreBoard.setText(`Score: ${this.score}`);
  }

  private die() {
    this.scene.start("GameOverScene");
  }
}
