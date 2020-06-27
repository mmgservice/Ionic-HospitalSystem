import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeitoListPage } from './leito-list';

@NgModule({
  declarations: [
    LeitoListPage,
  ],
  imports: [
    IonicPageModule.forChild(LeitoListPage),
  ],
})
export class LeitoListPageModule {}
