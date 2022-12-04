import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import quizes from '../../assets/quiz-data/quizes.json';
import { ModalController } from '@ionic/angular';
import { TwoPicsPage } from '../two-pics/two-pics.page';

import { PopoverController } from '@ionic/angular';

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
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
    this.timeLeft = 15;
    // pass the json file to variable
    this.quizesArr = quizes;
    console.log(quizes,this.quizesArr.length)

    // do not display question if current question is last one
    let currentId = this.quizesArr.filter(x=>x.is_active === true);
    console.log(currentId)
    if (currentId.length > 0){
      this.setQuestionDisplay();
    }

    // reset question
    if (currentId.length === 0){
      this.quizesArr = quizes;
      this.trials = 3;
      this.totalScore = 0;
      this.activeQuestion = 0;
      this.setQuestionDisplay();
    }
  }

  ionViewDidEnter(){
    this.quizesArr = quizes;
    this.trials = 3;
    this.totalScore = 0;
    this.activeQuestion = 0;
    this.startTimer();

    // set data to default state
    let currentId = this.quizesArr.filter(x=>x.is_active === true);
    console.log(currentId)

    // do not display question if current question is last one
    if (currentId.length > 0){
      this.quizesArr[currentId[0].id - 1].is_active = false;
      this.quizesArr[0].is_active = true;
      this.setQuestionDisplay();
    }

    // reset question
    if (currentId.length === 0){
      this.quizesArr = quizes;
      this.trials = 3;
      this.totalScore = 0;
      this.activeQuestion = 0;
      this.setQuestionDisplay();
    }
  }

  setQuestionDisplay(){
    // display question which is active
    console.log(this.quizesArr)
    let nQuestion = this.quizesArr.filter(x=>x.is_active === true);
    console.log("nQuestion",nQuestion)

    // set question to default
    if (nQuestion.length === 0){
      this.quizesArr[0].is_active = true;
      this._aQuestion = this.quizesArr[0].question;
      this._aNumber = this.quizesArr[0].question_number;
    }else{
      this._aQuestion = nQuestion[0].question;
      this._aNumber = nQuestion[0].question_number;
    }
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
    // correctAnswer is the current question displayed
    let correctAnswer = this.quizesArr.filter(x=>x.is_active === true);

    // handling if selected letter is correct
    if (correctAnswer[0].correct_answer === ans){
      // answer is correct
      this.totalScore = this.totalScore + 1;

      let nextQuestionId;

      // add 1 to the current id to get the next question id
      // do not apply on last number
      if (correctAnswer[0].id !== this.quizesArr.length){
        nextQuestionId = correctAnswer[0].id + 1;
      }

      // update the current question's active to false 
      correctAnswer[0].is_active = false;

      // update the is_answer_correct property. this will tally for the total correct answers
      // currently not using this method
      correctAnswer[0].is_answer_correct = true;

      // get the data of new question and update the is_active to true to display it
      // do not apply on last question
      if (correctAnswer[0].id !== this.quizesArr.length){
        let nextQuestion = this.quizesArr.filter(x=>x.id === nextQuestionId);
        nextQuestion[0].is_active = true;

        // set display of questions
        this.setQuestionDisplay();
      }

      // restart timer to 15 seconds
      this.timeLeft = 15;

      // display map
      if (correctAnswer[0].id === 20 || 
          correctAnswer[0].id === 40 ||
          correctAnswer[0].id === 60
        ){
          this.openModal(correctAnswer[0].id);
      }

      // for testing only
      // if (correctAnswer[0].id === 1 || 
      //   correctAnswer[0].id === 2 ||
      //   correctAnswer[0].id === 3
      // ){
      //   this.openModal(correctAnswer[0].id);
      // }
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

      let nextQuestionId;

      // add 1 to the current id to get the next question id
      // do not apply on last number
      if (correctAnswer[0].id !== this.quizesArr.length){
        nextQuestionId = correctAnswer[0].id + 1;
      }

      // update the current question's active to false 
      correctAnswer[0].is_active = false;

      // get the data of new question and update the is_active to true to display it
      // do not apply on last question
      if (correctAnswer[0].id !== this.quizesArr.length){
        let nextQuestion = this.quizesArr.filter(x=>x.id === nextQuestionId);
        nextQuestion[0].is_active = true;

        // set display of questions
        this.setQuestionDisplay();
      }

      // restart timer to 15 seconds
      this.timeLeft = 15;

      // display map
      if (correctAnswer[0].id === 20 || 
          correctAnswer[0].id === 40 ||
          correctAnswer[0].id === 60
        ){
          this.openModal(correctAnswer[0].id);
      }

      // for testing only
      // if (correctAnswer[0].id === 1 || 
      //   correctAnswer[0].id === 2 ||
      //   correctAnswer[0].id === 3
      // ){
      //   this.openModal(correctAnswer[0].id);
      // }
    }
  }

  ngOnDestroy(){
    this.quizesArr = quizes;
    this.trials = 3;
    this.totalScore = 0;
    this.activeQuestion = 0;
  }

  async openModal(id) {
    let level;
    if (id === 20){
      level = 1;
    }
    if (id === 40){
      level = 2;
    }
    if (id === 60){
      level = 3;
    }

    // for testing only
    // if (id === 1){
    //   level = 1;
    // }
    // if (id === 2){
    //   level = 2;
    // }
    // if (id === 3){
    //   level = 3;
    // }

    this.timeLeft = 15;
    clearInterval(this.interval); 

    const modal = await this.modalCtrl.create({
      component: TwoPicsPage,
      cssClass: 'small-modal',
      componentProps: {
        'level': level
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data === "continue"){
        this.startTimer();
      }
      
    });

    return await modal.present();
    /** Sync event from popover component */

  }

}
