import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AudioService } from 'src/services/audio.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.page.html',
  styleUrls: ['./instructions.page.scss'],
})
export class InstructionsPage implements OnInit {

  timeLeft: number = 1;

  constructor(
    private router: Router,
    private audioService: AudioService
  ) { }

  ngOnInit() {
  }

  public navigate(page: string): void{
    // var music = document.getElementById("btnPressed") as HTMLAudioElement;
    // music.play();
    this.audioService.button("game_button");
    // this.audioService.test("../../assets/audio/click_1.mp3");

    let interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else{
        this.router.navigate([page]);
        clearInterval(interval); 
      }
    },300);  
  }
}
