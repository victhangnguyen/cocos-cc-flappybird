import { _decorator, CCInteger, Component, Node } from "cc";
import { Ground } from "./Ground";
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
    type: CCInteger,
    tooltip: "Add ground prefab owner here",
  })
  public speed: number = 300;

  @property({
    type: CCInteger,
  })
  public pipeSpeed: number = 200;

  onLoad(): void {

  }

  initListeners() {}

  startGame() {}
  

  update(deltaTime: number) {}
}
