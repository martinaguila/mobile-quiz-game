import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private router: Router,
  ) {}

  ngOninit(){

  }

  public toHome(){
    // this.router.navigate(['/tabs/tab1'])
  }

  public navigate(page: string): void{
    this.router.navigate([page]);  
  }

}
