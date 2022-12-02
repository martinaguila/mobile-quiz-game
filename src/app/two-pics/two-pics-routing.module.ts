import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TwoPicsPage } from './two-pics.page';

const routes: Routes = [
  {
    path: '',
    component: TwoPicsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TwoPicsPageRoutingModule {}
