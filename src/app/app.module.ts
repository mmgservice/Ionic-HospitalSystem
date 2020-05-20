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
import { MedicoDadosService } from '../services/domain/medicodados.service';
import { ExpecialidadeEnfermagemService } from '../services/domain/expenfermagem';
import { EnfermagemDadosService } from '../services/domain/enfermagemdados.service';


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    MedicoDadosService,
    EstadoService,
    CidadeService,
    QuartoService,
    LeitoService,
    ExpecialidadeEnfermagemService,
    EnfermagemDadosService
  ]
})
export class AppModule {}