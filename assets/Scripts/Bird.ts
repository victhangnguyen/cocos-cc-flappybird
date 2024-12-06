import {
  _decorator,
  CCFloat,
  Component,
  Node,
  Vec3,
  Animation,
  tween,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("Bird")
export class Bird extends Component {
  @property({
    type: CCFloat,
    tooltip: "How high can they fly",
  })
  public jumpHeight: number = 3.5;

  @property({
    type: CCFloat,
    tooltip: "How long can they fly",
  })
  jumpDuration: number = 3.5;

  //! Animation property of the Bird
  public birdAnimation: Animation;

  //! Temporary location property of the Bird
  public birdLocation: Vec3;

  public hitSomething: boolean;

  onLoad(): void {
    this.resetBird();

    this.birdAnimation = this.getComponent(Animation);
  }

  resetBird(): void {
    //! create original bird location
    this.birdLocation = new Vec3(0, 0, 0);

    //! Reset the bird location - place the bird in location
    this.node.setPosition(this.birdLocation);

    this.hitSomething = false;
  }

  fly(): void {
    this.birdAnimation.stop();

    tween(this.node.position)
      .to(
        this.jumpDuration,
        new Vec3(
          this.node.position.x,
          this.node.position.y + this.jumpHeight,
          0
        ),
        {
          easing: "smooth",
          onUpdate: (target: Vec3, ratio: number) => {
            this.node.position = target;
          },
        }
      )
      .start();

    this.birdAnimation.play();
  }

  moveDownBird(): void {
    this.birdLocation = new Vec3(0, -100, 0);

    //! Reset the bird location
    this.node.setPosition(this.birdLocation);
  }

  start() {}

  update(deltaTime: number) {}
}
