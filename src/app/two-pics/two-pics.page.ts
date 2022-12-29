import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-two-pics',
  templateUrl: './two-pics.page.html',
  styleUrls: ['./two-pics.page.scss'],
})
export class TwoPicsPage implements OnInit {

  @Input() isCorrect;
  @Input() description;
  item : any;
  island: any;
  timeLeft: number = 1;

  constructor(
    private modalCtr: ModalController,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.isCorrect);
   }

  async close() {
    var music = document.getElementById("btnPressed") as HTMLAudioElement;
    music.play();
    let interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else{
        if (this.isCorrect){
          this.modalCtr.dismiss("continue");
        }else{
          this.modalCtr.dismiss("retain")
        }
        clearInterval(interval); 
      }
    },300);  
  }

}
