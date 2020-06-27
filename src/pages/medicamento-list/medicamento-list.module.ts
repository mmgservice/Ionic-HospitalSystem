import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicamentoListPage } from './medicamento-list';

@NgModule({
  declarations: [
    MedicamentoListPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicamentoListPage),
  ],
})
export class MedicamentoListPageModule {}
