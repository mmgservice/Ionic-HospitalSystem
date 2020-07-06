import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExamePage } from './exame';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    ExamePage,
  ],
  imports: [
    IonicPageModule.forChild(ExamePage),
    BrMaskerModule,
  ],
})
export class ExamePageModule {}
