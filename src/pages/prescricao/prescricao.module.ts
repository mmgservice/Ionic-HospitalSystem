import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrescricaoPage } from './prescricao';

@NgModule({
  declarations: [
    PrescricaoPage,
  ],
  imports: [
    IonicPageModule.forChild(PrescricaoPage),
  ],
})
export class PrescricaoPageModule {}
