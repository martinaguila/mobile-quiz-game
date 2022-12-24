import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import easyQuestion from '../../assets/quiz-data/quizes-easy.json';
import mediumQuestion from '../../assets/quiz-data/quizes-medium.json';
import hardQuestion from '../../assets/quiz-data/quizes-hard.json';
import { ModalController } from '@ionic/angular';
import { TwoPicsPage } from '../two-pics/two-pics.page';

@Component({
  selector: 'app-new-quiz',
  templateUrl: './new-quiz.page.html',
  styleUrls: ['./new-quiz.page.scss'],
})
export class NewQuizPage implements OnInit {

  // declare variables
  public category: any = "";
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
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController
  ) { 
    this.activatedRoute.paramMap.subscribe(paramMap => {

      this.category = paramMap.get("category");
    });
  }

  ngOnInit() {
    this.timeLeft = 15;

    // start time
    this.startTimer();

    // pass the json file to variable
    // display question depending on category selected
    if (this.category === 'easy'){
      this.quizesArr = easyQuestion;
    }else if (this.category === 'medium'){
      this.quizesArr = mediumQuestion
    }else{
      this.quizesArr = hardQuestion
    }

    // do not display question if current question is last one
    let currentId = this.quizesArr.filter(x=>x.is_active === true);
    if (currentId.length > 0){
      this.setQuestionDisplay();
    }

    // reset question
    if (currentId.length === 0){
      if (this.category === 'easy'){
        this.quizesArr = easyQuestion;
      }else if (this.category === 'medium'){
        this.quizesArr = mediumQuestion
      }else{
        this.quizesArr = hardQuestion
      }
      this.trials = 3;
      this.totalScore = 0;
      this.activeQuestion = 0;
      this.setQuestionDisplay();
    }
  }

  startTimer() {
    // timer starts here
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else{
        // get current question
        let currentQuestion = this.quizesArr.filter(x=>x.is_active === true);

        // remove 1 to trials
        this.trials = this.trials - 1;
        this.openModal(false, currentQuestion[0].description)
      }
    },1000)
  }

  setQuestionDisplay(){
    // display question which is active
    let nQuestion = this.quizesArr.filter(x=>x.is_active === true);

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

  public onClickAnswer(ans: string, desc: string): void{
    // get the active question
    // use this to compare the correct answer and get the active id
    // correctAnswer is the current question displayed
    let correctAnswer = this.quizesArr.filter(x=>x.is_active === true);

    // handling if selected letter is correct
    if (correctAnswer[0].correct_answer === ans){
      // answer is correct

      this.openModal(true, desc, correctAnswer)
    }else{
      // answer is incorrect

      // remove 1 to trials
      this.trials = this.trials - 1;

      this.openModal(false, desc)
    }
  }

  async openModal(isCorrect: boolean, desc: string, correctAnswer?: any) {
    this.timeLeft = 15;
    clearInterval(this.interval); 

    const modal = await this.modalCtrl.create({
      component: TwoPicsPage,
      cssClass: 'small-modal',
      componentProps: {
        'isCorrect': isCorrect,
        'description': desc
      },
      backdropDismiss: false
    });

    modal.onDidDismiss().then((result) => {
      if (result.data === "continue"){
        // get the current question
        let currentQuestion = this.quizesArr.filter(x=>x.is_active === true);

        // if id is 10, display the end modal
        console.log(currentQuestion[0].id)
        if (currentQuestion[0].id === 10){
          this.router.navigate(['game-over/finished']);
          this.timeLeft = 15;
          clearInterval(this.interval); 
          return;
        }else{
          this.startTimer();
          this.setNextQuestion(correctAnswer)
          this.setQuestionDisplay();
        }
      }else{
        // game over if trials reached to 0
        if (this.trials === 0){
          this.router.navigate(['game-over/gameover']);
          this.timeLeft = 15;
          clearInterval(this.interval); 
          return;
        }else{
          this.startTimer();
        }
      }
    });

    return await modal.present();
  }

  public toHome(): void{
    // navigate back to home
    this.router.navigate(["select-category"]);  
    this.timeLeft = 15;
    clearInterval(this.interval); 
  }

  public setNextQuestion(correctAnswer){
    let nextQuestionId;

    // add 1 to the current id to get the next question id
    if (correctAnswer[0].id){
      nextQuestionId = correctAnswer[0].id + 1;
    }

    // update the current question's active to false 
    correctAnswer[0].is_active = false;

    // update the is_answer_correct property. this will tally for the total correct answers
    // currently not using this method
    // correctAnswer[0].is_answer_correct = true;

    // get the data of new question and update the is_active to true to display it
    // do not apply on last question
    if (correctAnswer[0].id !== this.quizesArr.length){
      let nextQuestion = this.quizesArr.filter(x=>x.id === nextQuestionId);
      nextQuestion[0].is_active = true;

      // set display of questions
      // this.setQuestionDisplay();
    }
  }

}
