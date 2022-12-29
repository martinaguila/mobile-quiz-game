import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewQuizPageRoutingModule } from './new-quiz-routing.module';

import { NewQuizPage } from './new-quiz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewQuizPageRoutingModule
  ],
  declarations: [NewQuizPage]
})
export class NewQuizPageModule {}
