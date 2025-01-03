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
import { BirdAudio } from "./BirdAudio";

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
    type: BirdAudio,
    tooltip: "Editor tooltip of this property",
  })
  public clip: BirdAudio;

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
        this.clip.onAudioQueue(0);
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

  //what to do when the game is starting.
  startGame() {
    //hide high score and other text
    this.result.hideResult();

    //resume game
    director.resume();
  }

  //when the bird hits something, run this
  gameOver() {
    //show the results
    this.result.showResult();

    //! set game state is false
    this.isOver = true;

    //make the game over sound
    this.clip.onAudioQueue(3);

    //pause the game
    director.pause();
  }

  //when the game starts again, do these things.
  resetGame() {
    //reset score, bird, and pipes
    this.result.resetScore();

    //reset the pipes
    this.pipeQueue.reset();

    //! set false to reset game state
    this.isOver = false;

    //get objects moving again
    this.startGame();
  }

  //when a pipe passes the bird, do this
  passPipe() {
    //passed a pipe, increase a point
    this.result.addScore();

    //make the sound when pass a pipe
    this.clip.onAudioQueue(1);
  }

  //when the old pipe goes away, create a new pipe
  createPipe() {
    //add a new pipe to the pipe pool
    this.pipeQueue.addPool();
  }

  //check if there was contact with the bird and objects
  contactGroundPipe() {
    //make a collider call from the bird's collider2D component
    let collider_bird = this.bird.getComponent(Collider2D);

    //check if the collider hit other colliders
    if (collider_bird) {
      collider_bird.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
  }

  //if you hit something, tell the bird you did
  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact | null
  ) {
    //will be called once when two colliders begin to contact
    this.bird.hitSomething = true;

    //make the hit sound
    this.clip.onAudioQueue(2);
  }

  //hit detection call
  birdStruck() {
    //make a call to the gameBrain to see if it hit something.
    this.contactGroundPipe();

    //if we hit it, tell the game to call game over.
    if (this.bird.hitSomething == true) {
      this.gameOver();
    }
  }

  //every time the game updates, do this
  update() {
    //if the game is still going, check if the bird hit something
    if (this.isOver == false) {
      this.birdStruck();
    }
  }
}
