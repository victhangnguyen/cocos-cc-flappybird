import {
  _decorator,
  Component,
  Node,
  Vec3,
  screen,
  find,
  UITransform,
} from "cc";
import { GameCtrl } from "./GameCtrl";
const { ccclass, property } = _decorator;

//! Make a random number generator for the gap
const random = (min, max) => {
  return Math.random() * (max - min) + min;
};

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

  //! Make temporary pipe locations
  //! Temporary location of the up pipe
  public tempStartLocationUp: Vec3 = new Vec3();

  //! Temporary location of the down pipe
  public tempStartLocationDown: Vec3 = new Vec3();

  //! get the size of the screen in case we decide to change the content size
  public scene = screen.windowSize;

  //! actually grabbing the speed
  public game: GameCtrl; //! get the pipe speed from GameCtrl
  public pipeSpeed: number; //! final speed of the pipes
  public tempSpeed: number; //! temporary speed of the pipes

  //! scoring mechanism
  //! make sure it is only counted once
  isPass: boolean;

  public onLoad(): void {
    //! In GameCtrl, we cannot import the PipesComponent, because it make a circular dependency
    this.game = find("GameCtrl").getComponent(GameCtrl);

    //! get pipeSpeed from game from gameComponent
    this.pipeSpeed = this.game.pipeSpeed;

    //! work on original position
    this.initPos();

    //set the scoring mechanism to stop activating
    this.isPass = false;
  }

  public initPos(): void {
    //! Start with the initial position of x for both pipes
    this.tempStartLocationUp.x =
      this.topPipe.getComponent(UITransform).width + this.scene.width;
    this.tempStartLocationDown.x =
      this.bottomPipe.getComponent(UITransform).width + this.scene.width;

    // random variables for the gaps
    let gap = random(90, 100); //! passable area randomized
    let topHeight = random(0, 450); //! The height of the top pipe

    //! set the top pipe initial position of y
    this.tempStartLocationUp.y = topHeight;

    //! set the bottom pipe initial position of y
    this.tempStartLocationDown.y = topHeight - gap * 10;

    //! set temp locations to real ones
    this.topPipe.setPosition(this.tempStartLocationUp);
    this.bottomPipe.setPosition(this.tempStartLocationDown);
  }

  start() {}

  //! update Handler for the pipes
  update(deltaTime: number) {
    //! get the pipe speed [speed *  dir *]
    this.tempSpeed = this.pipeSpeed * deltaTime;

    //! Make temporary pipe locations
    this.tempStartLocationDown = this.bottomPipe.position;
    this.tempStartLocationUp = this.topPipe.position;

    //! move temporary pipe locations from right to left
    this.tempStartLocationDown.x -= this.tempSpeed;
    this.tempStartLocationUp.x -= this.tempSpeed;

    //! place new positions of the pipes from temporary locations
    this.bottomPipe.setPosition(this.tempStartLocationDown);
    this.topPipe.setPosition(this.tempStartLocationUp);

    if (this.isPass == false && this.topPipe.position.x <= 0) {
      //make sure it is only counted once
      this.isPass = true;

      //add a point to the score
      this.game.passPipe();
    }

    //if passed the screen, reset pipes to new location
    if (this.bottomPipe.position.x < 0 - this.scene.width) {
      //create a new pipe
      this.game.createPipe();

      //delete this node for memory saving
      this.destroy();
    }
  }
}
