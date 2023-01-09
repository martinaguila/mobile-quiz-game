import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';

// interface Sound {
//   key: string;
//   asset: string;
//   isNative: boolean
// }

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private sounds: Array<any> = [];
  private audioPlayer: HTMLAudioElement = new Audio();
  private forceWebAudio: boolean = true;
  private audioAssets;

  constructor(private platform: Platform, private nativeAudio: NativeAudio){
    this.audioAssets = [
      {
        "key" : "game_bg",
        "assets": "../../assets/audio/GotPH_sounds.mp3"
      },
      {
        "key" : "game_button",
        "assets": "../../assets/audio/button_pressed.mp3"
      },
      {
        "key" : "game_error",
        "assets": "../../assets/audio/answer_wrong.mp3"
      },
      {
        "key" : "game_correct",
        "assets": "../../assets/audio/answer_correct.mp3"
      },
    ]
  }

  preload(key: string, asset: string): void {
    if(this.platform.is('cordova')){
      this.nativeAudio.preloadSimple(key, asset);
      this.sounds.push({
        key: key,
        asset: asset,
        isNative: true
      });
    } else {
      let audio = new Audio();
      audio.src = asset;
      this.sounds.push({
        key: key,
        asset: asset,
        isNative: false
      });
    }
  }
  play(key: string): void {
    this.nativeAudio.play("game_button")
    let soundToPlay;
    for (let i = 0; i < this.sounds.length; i++){
      if (this.sounds[i].key === key){
        soundToPlay = this.sounds[i];
      }
    }

    if(soundToPlay.isNative){
      this.nativeAudio.play(soundToPlay.asset).then((res) => {
        // console.log(res);
      }, (err) => {
        // console.log(err);
      });
    } else {
      this.audioPlayer.src = soundToPlay.asset;
      this.audioPlayer.play();
    }
  }

  pause(key: string): void{
    let assets = this.audioAssets.find(x=>x.key === key)
    this.audioPlayer.src = assets.assets;
    this.audioPlayer.pause();
  }

  button(key: string): void {
    let assets = this.audioAssets.find(x=>x.key === key)
    this.audioPlayer.src = assets.assets;
    // alert(assets.assets)
    this.audioPlayer.play();
  }

  test(assets: string){
    this.audioPlayer.src = assets;
    this.audioPlayer.play();
  }
}
