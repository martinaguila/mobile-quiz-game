import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.page.html',
  styleUrls: ['./select-category.page.scss'],
})
export class SelectCategoryPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  public navigate(page: string, category?: string): void{
    if (category){
      this.router.navigate([page + category]);  
    }else{
      this.router.navigate([page]);  
    }
  }


}
