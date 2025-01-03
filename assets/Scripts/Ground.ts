import {
  _decorator,
  Canvas,
  Component,
  director,
  Node,
  UITransform,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

import { GameCtrl } from "./GameCtrl";

@ccclass("Ground")
export class Ground extends Component {
  @property({
    type: Node,
    tooltip: "Ground 1 is here",
  })
  public ground1: Node;

  @property({
    type: Node,
    tooltip: "Ground 2 is here",
  })
  public ground2: Node;

  @property({
    type: Node,
    tooltip: "Ground 3 is here",
  })
  public ground3: Node;

  //! Create ground width variables
  public groundWidth1: number;
  public groundWidth2: number;
  public groundWidth3: number;

  //! Temp variable to store start location of ground
  public tempStartLocation1 = new Vec3();
  public tempStartLocation2 = new Vec3();
  public tempStartLocation3 = new Vec3();

  //! Game controller
  public gameCtrlSpeed: GameCtrl = new GameCtrl();
  //! Game speed
  public gameSpeed: number = 50;

  onLoad() {
    this.startUp();
    // this.groundWidth1 = this.ground1.getComponent(BoxCollider).size.x;
    // this.groundWidth2 = this.ground2.getComponent(BoxCollider).size.x;
    // this.groundWidth3 = this.ground3.getComponent(BoxCollider).size.x;
  }

  startUp() {
    //! this trỏ ground1 trỏ Component
    this.groundWidth1 = this.ground1.getComponent(UITransform).width;
    this.groundWidth2 = this.ground2.getComponent(UITransform).width;
    this.groundWidth3 = this.ground2.getComponent(UITransform).width;

    this.tempStartLocation1.x = 0;
    this.tempStartLocation2.x = this.groundWidth1;
    this.tempStartLocation3.x = this.groundWidth1 + this.groundWidth2;

    //! setPosition

    this.ground1.setPosition(this.tempStartLocation1);
    this.ground2.setPosition(this.tempStartLocation2);
    this.ground3.setPosition(this.tempStartLocation3);
  }

  update(deltaTime: number) {
    //! Setting game speed
    this.gameSpeed = this.gameCtrlSpeed.speed;

    this.tempStartLocation1 = this.ground1.position;
    this.tempStartLocation2 = this.ground2.position;
    this.tempStartLocation3 = this.ground3.position;
    //! part 3: adding a moveing ground
    //! get the speed and subtract from x
    this.tempStartLocation1.x -= this.gameSpeed * deltaTime;
    this.tempStartLocation2.x -= this.gameSpeed * deltaTime;
    this.tempStartLocation3.x -= this.gameSpeed * deltaTime;
    const scene = director.getScene();
    const canvas = scene.getComponentInChildren(Canvas);
    //! set the position
    if (this.tempStartLocation1.x <= 0 - this.groundWidth1) {
      this.tempStartLocation1.x = canvas.getComponent(UITransform).width;
    }
    if (this.tempStartLocation2.x <= 0 - this.groundWidth2) {
      this.tempStartLocation2.x = canvas.getComponent(UITransform).width;
    }
    if (this.tempStartLocation3.x <= 0 - this.groundWidth3) {
      this.tempStartLocation3.x = canvas.getComponent(UITransform).width;
    }
    this.ground1.setPosition(this.tempStartLocation1);
    this.ground2.setPosition(this.tempStartLocation2);
    this.ground3.setPosition(this.tempStartLocation3);
  }
}
