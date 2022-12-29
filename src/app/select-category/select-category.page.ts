import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.page.html',
  styleUrls: ['./select-category.page.scss'],
})
export class SelectCategoryPage implements OnInit {

  timeLeft: number = 1;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  public navigate(page: string, category?: string): void{
    var music = document.getElementById("btnPressed") as HTMLAudioElement;
    music.play();
    let interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else{
        if (category){
          this.router.navigate([page + category]);  
        }else{
          this.router.navigate([page]);  
        }
        clearInterval(interval); 
      }
    },300);  
  }


}
