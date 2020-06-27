import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NomeexameListPage } from './nomeexame-list';

@NgModule({
  declarations: [
    NomeexameListPage,
  ],
  imports: [
    IonicPageModule.forChild(NomeexameListPage),
  ],
})
export class NomeexameListPageModule {}
