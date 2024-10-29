import { _decorator, CCFloat, Component, Node, Vec3, Animation, tween } from "cc";
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

  onLoad(): void {
    this.resetBird();

    this.birdAnimation = this.getComponent(Animation);
  }

  resetBird(): void {
    this.birdLocation = new Vec3(0, 0, 0);

    //! Reset the bird location
    this.node.setPosition(this.birdLocation);
  }

  moveDownBird(): void {
    this.birdLocation = new Vec3(0, -100, 0);

    //! Reset the bird location
    this.node.setPosition(this.birdLocation);
  }

  start() {}

  update(deltaTime: number) {}
}
