import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExamePage } from './exame';

@NgModule({
  declarations: [
    ExamePage,
  ],
  imports: [
    IonicPageModule.forChild(ExamePage),
  ],
})
export class ExamePageModule {}
