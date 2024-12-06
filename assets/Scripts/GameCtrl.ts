import {
  _decorator,
  CCInteger,
  Component,
  director,
  EventKeyboard,
  Input,
  input,
  KeyCode,
  Node,
  Contact2DType,
  Collider2D,
  IPhysics2DContact,
} from "cc";
const { ccclass, property } = _decorator;

import { Ground } from "./Ground";
import { Resutls } from "./Resutls";
import { Bird } from "./Bird";
//! Pools
import { PipePool } from "./PipePool";

@ccclass("GameCtrl")
export class GameCtrl extends Component {
  @property({
    type: Ground,
    // type: Component,
    tooltip: "Add ground prefab owner here",
  })
  public ground: Ground;

  @property({
    type: Resutls,
    tooltip: "Results here",
  })
  public result: Resutls;

  @property({
    type: Bird,
    tooltip: "Bird prefab owner here",
  })
  public bird: Bird;

  @property({
    type: PipePool,
    tooltip: "Editor tooltip of this property",
  })
  public pipeQueue: PipePool;

  @property({
    type: CCInteger,
    tooltip: "Add ground prefab owner here",
  })
  public speed: number = 300;

  @property({
    type: CCInteger,
  })
  public pipeSpeed: number = 200;

  public isOver: boolean;

  onLoad(): void {
    this.initListener();

    this.result.resetScore();

    //! When init, it is true that meaning dont move anything
    this.isOver = true;

    director.pause();
  }

  //! Register Listener
  initListener() {
    // input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

    this.node.on(Node.EventType.TOUCH_START, () => {
      if (this.isOver == true) {
        this.resetGame();
        this.bird.resetBird();
        this.startGame();
      }
      if (this.isOver == false) {
        this.bird.fly();
      }
    });
  }

  onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.KEY_A:
        this.gameOver();
        break;
      case KeyCode.KEY_P:
        this.result.addScore();
        break;
      case KeyCode.KEY_Q:
        this.resetGame();
        this.bird.resetBird();
      case KeyCode.KEY_D:
        this.bird.moveDownBird();
      case KeyCode.KEY_F:
        this.bird.fly();
    }
  }

  startGame() {
    this.result.hideResult();
    director.resume();
  }

  gameOver() {
    this.result.showResult();
    this.isOver = true;
    director.pause();
  }

  resetGame() {
    this.result.resetScore();
    this.pipeQueue.reset(); //! Cần cập nhật lên
    this.isOver = false;
    this.startGame();
  }

  passPipe() {
    this.result.addScore();
  }

  createPipe() {
    this.pipeQueue.addPool();
  }

  contactGroundPipe() {
    let collider_bird = this.bird.getComponent(Collider2D);
    if (collider_bird) {
      collider_bird.on(Contact2DType.BEGIN_CONTACT, this.gameOver, this);
    }
  }

  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    this.bird.hitSomething = true;
  }

  birdStruck() {
    this.contactGroundPipe();

    if (this.bird.hitSomething == true) {
      this.gameOver();
    }
  }

  update() {
    if (this.isOver == false) {
      this.birdStruck();
    }
  }
}
