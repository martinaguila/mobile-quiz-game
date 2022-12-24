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

  constructor(
    private modalCtr: ModalController,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.isCorrect);
   }

  async close() {
    if (this.isCorrect){
      this.modalCtr.dismiss("continue");
    }else{
      this.modalCtr.dismiss("retain")
    }
  }

}
