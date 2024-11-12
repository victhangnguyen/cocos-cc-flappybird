import { _decorator, Component, instantiate, Node, NodePool, Prefab } from "cc";
const { ccclass, property } = _decorator;
import { Pipes } from "./Pipes";

@ccclass("PipePool")
export class PipePool extends Component {
  @property({
    type: Prefab,
  })
  public prefabPipes = null;

  @property({
    type: Node,
    tooltip: "Editor tooltip of this property",
  })
  public pipePoolHome;

  public pipePool = new NodePool();

  public pipeInts;

  public initPool(): void {
    //! build the amount of nodes needed at atime
    let initCount = 2;

    for (let i: number = 0; i < initCount; i++) {
      //! create instance of prefabPipes and assign it to pipeInts. This is
      this.pipeInts = instantiate(this.prefabPipes);

      if (i == 0) {
        this.pipePoolHome.addChild(this.pipeInts);
      } else {
        this.pipePool.put(this.pipeInts);
      }
    }
  }

  public addPool(): void {
    if (this.pipePool.size() > 0) {
      this.pipeInts = this.pipePool.get();
    } else {
      this.pipeInts = instantiate(this.prefabPipes);
    }

    this.pipePoolHome.addChild(this.pipeInts);
  }

  reset() {
    this.pipePoolHome.removeAllChildren();

    this.pipePool.clear();

    this.initPool();
  }

  // start() {
  // }

  // update(deltaTime: number) {
  // }
}
