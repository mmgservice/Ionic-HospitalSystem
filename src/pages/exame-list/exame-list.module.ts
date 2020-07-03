import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExameListPage } from './exame-list';

@NgModule({
  declarations: [
    ExameListPage,
  ],
  imports: [
    IonicPageModule.forChild(ExameListPage),
  ],
})
export class ExameListPageModule {}
