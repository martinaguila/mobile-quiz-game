import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

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
    private router: Router
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
