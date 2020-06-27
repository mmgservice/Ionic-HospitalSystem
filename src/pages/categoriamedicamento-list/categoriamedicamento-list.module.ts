import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriamedicamentoListPage } from './categoriamedicamento-list';

@NgModule({
  declarations: [
    CategoriamedicamentoListPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoriamedicamentoListPage),
  ],
})
export class CategoriamedicamentoListPageModule {}
