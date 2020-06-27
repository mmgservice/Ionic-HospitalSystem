import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FarmaciaListPage } from './farmacia-list';

@NgModule({
  declarations: [
    FarmaciaListPage,
  ],
  imports: [
    IonicPageModule.forChild(FarmaciaListPage),
  ],
})
export class FarmaciaListPageModule {}
