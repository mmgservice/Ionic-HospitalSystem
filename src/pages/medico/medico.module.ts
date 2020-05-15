import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicoPage } from './medico';
import { ExpecialidadeMedicaService } from '../../services/domain/expecialidade-medica.service';

@NgModule({
  declarations: [
    MedicoPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicoPage),
  ],
  
  providers: [
    ExpecialidadeMedicaService
  ]
})
export class MedicoPageModule {}
