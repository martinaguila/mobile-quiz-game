import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import quizes from '../../assets/quiz-data/quizes.json'

@Component({
  selector: 'app-quiz-game',
  templateUrl: './quiz-game.page.html',
  styleUrls: ['./quiz-game.page.scss'],
})
export class QuizGamePage implements OnInit {

  public quizesArr: any;
  public timeLeft: number = 15;
  public interval: any;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    console.log(quizes)
    this.quizesArr = quizes;

    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 15;
        this.quizesArr = this.quizesArr.filter(x=>x.is_active === true);
      }
    },1000)
  }

  public toHome(): void{
    this.router.navigate([""]);  
  }

}
