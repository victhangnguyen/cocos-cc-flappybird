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
    let initCount = 3;

    //fill up the node pool
    for (let i: number = 0; i < initCount; i++) {
      //! create instance of prefabPipes and assign it to pipeInts.
      this.pipeInts = instantiate(this.prefabPipes);
      //instantiate means make a copy of the orginal
      // put first one on the screen. So make it a child of the canvas.

      if (i == 0) {
        this.pipePoolHome.addChild(this.pipeInts);
      } else {
        //put others into the nodePool

        this.pipePool.put(this.pipeInts);
      }
    }
  }

  public addPool(): void {
    //if the pool is not full add a new one, else get the first one in the pool
    if (this.pipePool.size() > 0) {
      //get from the pool
      this.pipeInts = this.pipePool.get();
    } else {
      //build a new one
      this.pipeInts = instantiate(this.prefabPipes);
    }
    //add pipe to game as a node
    this.pipePoolHome.addChild(this.pipeInts);
  }

  reset() {
    //clear pool and reinitialize
    this.pipePoolHome.removeAllChildren();
    this.pipePool.clear();
    this.initPool();
  }
}
