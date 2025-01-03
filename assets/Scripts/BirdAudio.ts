import { _decorator, Component, Node, AudioClip, AudioSource } from "cc";
const { ccclass, property } = _decorator;

@ccclass("BirdAudio")
export class BirdAudio extends Component {
  @property({
    type: [AudioClip],
    tooltip: "Editor tooltip of this property",
  })
  public clips: AudioClip[] = [];

  @property({
    type: AudioSource,
    tooltip: "Editor tooltip of this property",
  })
  public audioScourse: AudioSource = null;

  onAudioQueue(index: number) {
    let clip: AudioClip = this.clips[index];

    this.audioScourse.playOneShot(clip);
  }
}
