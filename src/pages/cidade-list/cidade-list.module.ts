import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CidadeListPage } from './cidade-list';

@NgModule({
  declarations: [
    CidadeListPage,
  ],
  imports: [
    IonicPageModule.forChild(CidadeListPage),
  ],
})
export class CidadeListPageModule {}
