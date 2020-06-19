import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpmedicoListPage } from './expmedico-list';

@NgModule({
  declarations: [
    ExpmedicoListPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpmedicoListPage),
  ],
})
export class ExpmedicoListPageModule {}
