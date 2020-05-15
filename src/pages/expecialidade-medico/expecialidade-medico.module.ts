import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpecialidadeMedicoPage } from './expecialidade-medico';
import { ExpecialidadeMedicaService } from '../../services/domain/expecialidade-medica.service';

@NgModule({
  declarations: [
    ExpecialidadeMedicoPage,
  ],
  imports: [
    IonicPageModule.forChild(ExpecialidadeMedicoPage),
  ],
  
})
export class ExpecialidadeMedicoPageModule {}
