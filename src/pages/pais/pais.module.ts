import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaisPage } from './pais';

@NgModule({
  declarations: [
    PaisPage,
  ],
  imports: [
    IonicPageModule.forChild(PaisPage),
  ],
})
export class PaisPageModule {}
