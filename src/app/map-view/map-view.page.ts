import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AudioService } from 'src/services/audio.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.page.html',
  styleUrls: ['./map-view.page.scss'],
})
export class MapViewPage implements OnInit {

  @Input() level = 0;
  item : any;
  island: any;

  constructor(
    private modalCtr: ModalController,
    private router: Router,
    private audioService: AudioService
  ) { }

  ngOnInit() {
    if (this.level == 1){
      this.island = "Luzon";
    }

    if (this.level == 2){
      this.island = "Visayas";
    }

    if (this.level == 3){
      this.island = "Mindanao";
    }
   }

  async close() {
    this.audioService.button("game_button");  
    // this.audioService.test("../../assets/audio/click_1.mp3");

    if (this.level === 3){
      this.level = 4;
      this.island = "Pilippine";
    }

    else if (this.level === 4){
      this.router.navigate(['/home']);
      this.modalCtr.dismiss("reset");
    }

    else{
      this.modalCtr.dismiss("continue");
    }
  }

}
