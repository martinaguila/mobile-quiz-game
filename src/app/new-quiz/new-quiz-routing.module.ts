import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewQuizPage } from './new-quiz.page';

const routes: Routes = [
  {
    path: '',
    component: NewQuizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewQuizPageRoutingModule {}
