import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AudioService } from 'src/services/audio.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  musicOn: boolean = true;
  icon: string = "volume-high";
  color: string = "success";
  timeLeft: number = 1;
  showVideo: boolean = true;

  constructor(
    private router: Router,
    private audioService: AudioService
  ) {
  }

  ngAfterViewInit(){
    this.audioService.preload("game_button","../../assets/audio/button_pressed.mp3")

  }

  ngOnInit(){
    // this.audioService.preload('tabSwitch', '../../assets/audio/GotPH_sounds.mp3');
    // this.audioService.play("game_bg")
    var music = document.getElementById("gameAudio") as HTMLAudioElement;
    music.loop = true;
    music.play();
    // this.audio2.nativeElement.play()
    console.log("duration",music.paused)
    let interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else{
        this.showVideo = false;
        clearInterval(interval); 
      }
    },5000);  
  }

  public navigate(page: string): void{
    this.audioService.test("../../assets/audio/click_1.mp3");
    // var music = document.getElementById("btnPressed") as HTMLAudioElement;
    let interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else{
        this.router.navigate([page]);
        clearInterval(interval); 
      }
    },300);  
  }

  audio(){
    this.musicOn = !this.musicOn;
    var music = document.getElementById("gameAudio") as HTMLAudioElement;
    
    if (this.musicOn){
      // this.audioService.play("game_bg");
      music.play()
      this.icon = "volume-high";
      this.color = "success";
    }else{
      // this.audioService.pause("game_bg");
      music.pause()
      this.icon = "volume-off";
      this.color = "danger";
    }
  }

  audio1(assets: string){
    this.audioService.test(assets)
  }

}
