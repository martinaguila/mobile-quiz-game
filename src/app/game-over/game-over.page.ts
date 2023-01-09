import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AudioService } from 'src/services/audio.service';
import { MapViewPage } from '../map-view/map-view.page';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.page.html',
  styleUrls: ['./game-over.page.scss'],
})
export class GameOverPage implements OnInit {

  status: any;
  totalScore: any;
  level: any;
  timeLeft: number = 1;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private audioService: AudioService
  ) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.status = paramMap.get("status");
      this.totalScore = paramMap.get("score")
      this.level = paramMap.get("level")
    });
   }

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
        // this.router.navigate([page]);
        if (this.status === "finished"){
          this.openModal(page);
        }else{
          this.router.navigate([page]);
        }
        
        clearInterval(interval); 
      }
    },300);   
  }

  async openModal(page: string){
    const modal = await this.modalCtrl.create({
      component: MapViewPage,
      cssClass: 'small-modal',
      componentProps: {
        'level': this.level,
      },
    });

    modal.onDidDismiss().then((result) => {
      this.router.navigate([page]);      
    });

    return await modal.present();

  }

}
