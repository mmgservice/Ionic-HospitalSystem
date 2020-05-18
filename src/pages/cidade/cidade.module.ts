import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CidadePage } from './cidade';

@NgModule({
  declarations: [
    CidadePage,
  ],
  imports: [
    IonicPageModule.forChild(CidadePage),
  ],
})
export class CidadePageModule {}
