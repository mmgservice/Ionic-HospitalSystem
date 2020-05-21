import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NomeexamePage } from './nomeexame';

@NgModule({
  declarations: [
    NomeexamePage,
  ],
  imports: [
    IonicPageModule.forChild(NomeexamePage),
  ],
})
export class NomeexamePageModule {}
