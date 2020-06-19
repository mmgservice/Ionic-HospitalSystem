import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PacientePage } from './paciente';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';

@NgModule({
  declarations: [
    PacientePage,
  ],
  imports: [
    IonicPageModule.forChild(PacientePage),
    BrMaskerModule
  ],

  providers: [
    CidadeService,
    EstadoService
  ]
})
export class PacientePageModule {}
