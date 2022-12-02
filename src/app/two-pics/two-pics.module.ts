import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TwoPicsPageRoutingModule } from './two-pics-routing.module';

import { TwoPicsPage } from './two-pics.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TwoPicsPageRoutingModule
  ],
  declarations: [TwoPicsPage]
})
export class TwoPicsPageModule {}
