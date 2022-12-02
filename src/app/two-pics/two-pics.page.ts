import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-two-pics',
  templateUrl: './two-pics.page.html',
  styleUrls: ['./two-pics.page.scss'],
})
export class TwoPicsPage implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  public toHome(): void{
    this.router.navigate([""]);  
  }

}
