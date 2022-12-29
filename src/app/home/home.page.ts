import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  ) {
  }

  ngOnInit(){
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
    var music = document.getElementById("btnPressed") as HTMLAudioElement;
    music.play();
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
      music.play(); 

      this.icon = "volume-high";
      this.color = "success";
    }else{
      music.pause();

      this.icon = "volume-off";
      this.color = "danger";
    }
  }

}
