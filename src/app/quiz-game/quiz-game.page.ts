import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import quizes from '../../assets/quiz-data/quizes.json';

@Component({
  selector: 'app-quiz-game',
  templateUrl: './quiz-game.page.html',
  styleUrls: ['./quiz-game.page.scss'],
})
export class QuizGamePage implements OnInit {

  // declare variables
  public quizesArr: any;
  public timeLeft: number = 15;
  public interval: any;
  public trials: number = 3;
  public activeQuestion: number = 0;
  private totalScore: number = 0;

  public _aQuestion: any;
  public _aNumber: any;
  public _aQuestionId: any;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    console.log(quizes)
    this.timeLeft = 15;
    // pass the json file to variable
    this.quizesArr = quizes;
    this.setQuestionDisplay();
  }

  ionViewDidEnter(){
    this.quizesArr = quizes;
    this.trials = 3;
    this.totalScore = 0;
    this.activeQuestion = 0;
    this.startTimer();

    // set data to default state
    let currentId = this.quizesArr.filter(x=>x.is_active === true);
    this.quizesArr[currentId[0].id - 1].is_active = false;
    this.quizesArr[0].is_active = true;
    this.setQuestionDisplay();
  }

  setQuestionDisplay(){
    // display question which is active
    let nQuestion = this.quizesArr.filter(x=>x.is_active === true);
    this._aQuestion = nQuestion[0].question;
    this._aNumber = nQuestion[0].question_number;
  }

  startTimer() {
    // timer starts here
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.router.navigate(['game-over/' + this.totalScore]);
        this.timeLeft = 15;
        clearInterval(this.interval); 
      }
    },1000)
  }

  public toHome(): void{
    // navigate back to home
    this.router.navigate([""]);  
    this.timeLeft = 15;
    clearInterval(this.interval); 
  }

  public onClickAnswer(ans: string): void{
    // get the active question
    // use this to compare the correct answer and get the active id
    let correctAnswer = this.quizesArr.filter(x=>x.is_active === true);

    // handling if selected letter is correct
    if (correctAnswer[0].correct_answer === ans){
      // answer is correct
      this.totalScore = this.totalScore + 1;

      // add 1 to the id to get the next question id
      let nextQuestionId = correctAnswer[0].id + 1;

      // update the current question's active to false 
      correctAnswer[0].is_active = false;

      // update the is_answer_correct property. this will tally for the total correct answers
      correctAnswer[0].is_answer_correct = true;

      // get the data of new question and update the is_active to true to display it
      let nextQuestion = this.quizesArr.filter(x=>x.id === nextQuestionId);
      nextQuestion[0].is_active = true;

      // restart timer to 15 seconds
      this.timeLeft = 15;

      // set display of questions
      this.setQuestionDisplay();
      console.log(this.quizesArr)
    }else{
      // answer is incorrect

      // remove 1 to trials
      this.trials = this.trials - 1;

      // game over if trials reached to 0
      if (this.trials === 0){
        this.router.navigate(['game-over/' + this.totalScore]);
        this.timeLeft = 15;
        clearInterval(this.interval); 
        return;
      }

      // add 1 to the id to get the next question id
      let nextQuestionId = correctAnswer[0].id + 1;

      // update the current question's active to false 
      correctAnswer[0].is_active = false;

      // get the data of new question and update the is_active to true to display it
      let nextQuestion = this.quizesArr.filter(x=>x.id === nextQuestionId);
      nextQuestion[0].is_active = true;

      // restart timer to 15 seconds
      this.timeLeft = 15;

      // set display of questions
      this.setQuestionDisplay();
      console.log(this.quizesArr)
    }
  }

  ngOnDestroy(){
    this.quizesArr = quizes;
    this.trials = 3;
    this.totalScore = 0;
    this.activeQuestion = 0;
  }

}
