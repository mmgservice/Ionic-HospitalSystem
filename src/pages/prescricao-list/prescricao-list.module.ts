import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrescricaoListPage } from './prescricao-list';

@NgModule({
  declarations: [
    PrescricaoListPage,
  ],
  imports: [
    IonicPageModule.forChild(PrescricaoListPage),
  ],
})
export class PrescricaoListPageModule {}
