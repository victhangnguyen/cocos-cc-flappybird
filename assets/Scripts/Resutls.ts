import { _decorator, Component, Label, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Resutls")
export class Resutls extends Component {
  @property({ type: Label })
  public scoreLabel: Label;

  @property({ type: Label })
  public highScore: Label;

  @property({ type: Label })
  public resultEnd: Label;

  //! variables for the score
  maxScore: number = 0; //! save high score
  currentScore: number = 0; //! current score while playing

  // method: change current score to new score or back to 0 then display the new score
  updateScore(num: number) {
    //! update the score to the new number on the screen
    this.currentScore = num;
    //! display the new score
    this.scoreLabel.string = this.currentScore.toString();
  }

  // method
  resetScore() {
    //! reset the score to 0
    this.updateScore(0);

    //! hide high score and try again request
    this.hideResult();
    //! display the new score
    // this.scoreLabel.string = this.currentScore.toString();
  }

  // method: add point to the score
  addScore() {
    //! add a point to the score
    this.updateScore(this.currentScore + 1);
  }

  // method: show the score results when the game ends.
  showResult() {
    //! Check if the current score is higher than the high score
    this.maxScore = Math.max(this.currentScore, this.maxScore);

    //! Activate high score label
    this.highScore.string = "High Score: " + this.maxScore;

    //! Activate result label
    this.resultEnd.node.active = true;

    // this.highScore.node.active = true;
    //! show the hightScore
    this.highScore.node.active = true;
  }

  // method
  hideResult() {
    this.highScore.node.active = false;

    this.resultEnd.node.active = false;
  }
}
