import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuartoListPage } from './quarto-list';

@NgModule({
  declarations: [
    QuartoListPage,
  ],
  imports: [
    IonicPageModule.forChild(QuartoListPage),
  ],
})
export class QuartoListPageModule {}
