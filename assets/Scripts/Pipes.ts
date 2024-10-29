import { _decorator, Component, Node, Vec3, screen } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Pipes")
export class Pipes extends Component {
  @property({
    type: Node,
    tooltip: "Top Pipe",
  })
  public topPipe: Node;

  @property({
    type: Node,
    tooltip: "Top Pipe",
  })
  public bottomPipe: Node;

  public tempStartLocationUp: Vec3 = new Vec3();
  public tempStartLocationDown: Vec3 = new Vec3();

  public scene = screen.windowSize;

  //! actually grabbing the speed
  public game; //! speed of the pipes from the GameCtrl
  public pipeSpeed: number; //! final speed of the pipes
  public tempSpeed: number; //! temporary speed of the pipes

  onLoad(): void {
      
  }

  start() {}

  update(deltaTime: number) {}
}
