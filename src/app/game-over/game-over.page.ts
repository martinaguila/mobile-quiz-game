import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.page.html',
  styleUrls: ['./game-over.page.scss'],
})
export class GameOverPage implements OnInit {

  status: any;
  timeLeft: number = 1;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.status = paramMap.get("status")
    });
   }

  ngOnInit() {
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

}
