import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {EstadoListPage} from "./estado-list";

@NgModule({
  declarations: [
    EstadoListPage,
  ],
  imports: [
    IonicPageModule.forChild(EstadoListPage),
  ],
})
export class EstadoListModule {
}
