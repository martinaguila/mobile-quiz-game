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

  constructor(
    private router: Router,
  ) {
  }

  ngOninit(){
  }

  public navigate(page: string): void{
    this.router.navigate([page]);  
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
