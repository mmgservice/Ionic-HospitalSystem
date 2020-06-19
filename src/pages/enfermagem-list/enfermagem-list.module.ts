import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnfermagemListPage } from './enfermagem-list';

@NgModule({
  declarations: [
    EnfermagemListPage,
  ],
  imports: [
    IonicPageModule.forChild(EnfermagemListPage),
  ],
})
export class EnfermagemListPageModule {}
