import {
  _decorator,
  CCInteger,
  Component,
  director,
  EventKeyboard,
  Input,
  input,
  KeyCode,
} from "cc";
import { Ground } from "./Ground";
import { Resutls } from "./Resutls";
import { Bird } from "./Bird";
const { ccclass, property } = _decorator;

@ccclass("GameCtrl")
export class GameCtrl extends Component {
  // @property({
  //   type: Ground,
  //   tooltip: "Add ground prefab owner here",
  // })
  // public ground: Ground;

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
    type: CCInteger,
    tooltip: "Add ground prefab owner here",
  })
  public speed: number = 300;

  @property({
    type: CCInteger,
  })
  public pipeSpeed: number = 200;

  onLoad(): void {
    this.initListeners();

    this.result.resetScore();

    director.pause();
  }

  initListeners() {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
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
      case KeyCode.KEY_S:
        this.bird.moveDownBird();
    }
  }

  startGame() {
    this.result.hideResult();
    director.resume();
  }

  gameOver() {
    this.result.showResult();
    director.pause();
  }

  resetGame() {
    this.result.resetScore();
    this.startGame();
  }

  update(deltaTime: number) {}
}
