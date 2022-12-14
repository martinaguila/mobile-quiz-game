import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import easyQuestion from '../../assets/quiz-data/quizes-easy.json';
import mediumQuestion from '../../assets/quiz-data/quizes-medium.json';
import hardQuestion from '../../assets/quiz-data/quizes-hard.json';

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
    private activatedRoute: ActivatedRoute
  ) { 
    this.activatedRoute.paramMap.subscribe(paramMap => {

      this.category = paramMap.get("category");
      console.log(this.category)
    });
  }

  ngOnInit() {
    this.timeLeft = 15;
    // pass the json file to variable
    // display question depending on category selected
    if (this.category === 'easy'){
      this.quizesArr = easyQuestion;
    }else if (this.category === 'medium'){
      this.quizesArr = mediumQuestion
    }else{
      this.quizesArr = hardQuestion
    }
    
    console.log(this.quizesArr,this.quizesArr.length)

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

  public onClickAnswer(ans: string): void{
    // // get the active question
    // // use this to compare the correct answer and get the active id
    // // correctAnswer is the current question displayed
    // let correctAnswer = this.quizesArr.filter(x=>x.is_active === true);

    // // handling if selected letter is correct
    // if (correctAnswer[0].correct_answer === ans){
    //   // answer is correct
    //   this.totalScore = this.totalScore + 1;

    //   let nextQuestionId;

    //   // add 1 to the current id to get the next question id
    //   // do not apply on last number
    //   if (correctAnswer[0].id !== this.quizesArr.length){
    //     nextQuestionId = correctAnswer[0].id + 1;
    //   }

    //   // update the current question's active to false 
    //   correctAnswer[0].is_active = false;

    //   // update the is_answer_correct property. this will tally for the total correct answers
    //   // currently not using this method
    //   correctAnswer[0].is_answer_correct = true;

    //   // get the data of new question and update the is_active to true to display it
    //   // do not apply on last question
    //   if (correctAnswer[0].id !== this.quizesArr.length){
    //     let nextQuestion = this.quizesArr.filter(x=>x.id === nextQuestionId);
    //     nextQuestion[0].is_active = true;

    //     // set display of questions
    //     this.setQuestionDisplay();
    //   }

    //   // restart timer to 15 seconds
    //   this.timeLeft = 15;

    //   // display map
    //   if (correctAnswer[0].id === 20 || 
    //       correctAnswer[0].id === 40 ||
    //       correctAnswer[0].id === 60
    //     ){
    //       this.openModal(correctAnswer[0].id);
    //   }

    //   // for testing only
    //   // if (correctAnswer[0].id === 1 || 
    //   //   correctAnswer[0].id === 2 ||
    //   //   correctAnswer[0].id === 3
    //   // ){
    //   //   this.openModal(correctAnswer[0].id);
    //   // }
    // }else{
    //   // answer is incorrect

    //   // remove 1 to trials
    //   this.trials = this.trials - 1;

    //   // game over if trials reached to 0
    //   if (this.trials === 0){
    //     this.router.navigate(['game-over/' + this.totalScore]);
    //     this.timeLeft = 15;
    //     clearInterval(this.interval); 
    //     return;
    //   }

    //   let nextQuestionId;

    //   // add 1 to the current id to get the next question id
    //   // do not apply on last number
    //   if (correctAnswer[0].id !== this.quizesArr.length){
    //     nextQuestionId = correctAnswer[0].id + 1;
    //   }

    //   // update the current question's active to false 
    //   correctAnswer[0].is_active = false;

    //   // get the data of new question and update the is_active to true to display it
    //   // do not apply on last question
    //   if (correctAnswer[0].id !== this.quizesArr.length){
    //     let nextQuestion = this.quizesArr.filter(x=>x.id === nextQuestionId);
    //     nextQuestion[0].is_active = true;

    //     // set display of questions
    //     this.setQuestionDisplay();
    //   }

    //   // restart timer to 15 seconds
    //   this.timeLeft = 15;

    //   // display map
    //   if (correctAnswer[0].id === 20 || 
    //       correctAnswer[0].id === 40 ||
    //       correctAnswer[0].id === 60
    //     ){
    //       this.openModal(correctAnswer[0].id);
    //   }

    //   // for testing only
    //   // if (correctAnswer[0].id === 1 || 
    //   //   correctAnswer[0].id === 2 ||
    //   //   correctAnswer[0].id === 3
    //   // ){
    //   //   this.openModal(correctAnswer[0].id);
    //   // }
    // }
  }

  public toHome(): void{
    // navigate back to home
    this.router.navigate(["select-category"]);  
    this.timeLeft = 15;
    clearInterval(this.interval); 
  }

}
