import { MedicoService } from './../services/domain/medico.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AlergiaService } from '../services/domain/alergia.service';
import { UsuarioService } from '../services/usuario.service';
import { EstadoService } from '../services/domain/estado.service';
import { CidadeService } from '../services/domain/cidade.service';
import { QuartoService } from '../services/domain/quarto.service';
import { LeitoService } from '../services/domain/leito.service';
import { ExpecialideMedicoService } from '../services/domain/expmedico.service';
import { ExpecialidadeEnfermagemService } from '../services/domain/expenfermagem';
import { CategoriaExameService } from '../services/domain/categoriaexame.service';
import { NomeExameService } from '../services/domain/nomeexame.service';
import { EnfermagemService } from '../services/domain/enfermagem.service';
import { PacienteService } from '../services/domain/paciente.service';
import { MedicamentoService } from '../services/domain/medicamento.service';
import { FarmaciaService } from '../services/domain/farmacia.service';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { CategoriaMedicamentoService } from '../services/categoriamedicamento.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrMaskerModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AlergiaService,
    ExpecialideMedicoService,
    UsuarioService,
    MedicoService,
    EstadoService,
    CidadeService,
    QuartoService,
    LeitoService,
    ExpecialidadeEnfermagemService,
    EnfermagemService,
    CategoriaExameService,
    NomeExameService,
    PacienteService,
    CategoriaMedicamentoService,
    MedicamentoService,
    FarmaciaService,
    CategoriaExameService,
    
  ]
})
export class AppModule {}