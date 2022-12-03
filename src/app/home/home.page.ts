import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  musicOn: boolean = true;
  icon: string = "volume-high";
  color: string = "success";

  constructor(
    private router: Router,
  ) {}

  ngOninit(){

  }

  public navigate(page: string): void{
    this.router.navigate([page]);  
  }

  audio(){
    this.musicOn = !this.musicOn;

    if (this.musicOn){
      this.icon = "volume-high";
      this.color = "success";
    }else{
      this.icon = "volume-off";
      this.color = "danger";
    }
  }

}
