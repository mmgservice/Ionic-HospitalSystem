import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlergiaListPage } from './alergia-list';

@NgModule({
  declarations: [
    AlergiaListPage,
  ],
  imports: [
    IonicPageModule.forChild(AlergiaListPage),
  ],
})
export class AlergiaListPageModule {}
