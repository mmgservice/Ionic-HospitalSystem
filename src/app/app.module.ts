import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PaisService } from '../services/domain/pais.service';
import { AlergiaService } from '../services/domain/alergia.service';
import { ExpecialidadeMedicaService } from '../services/domain/expecialidade-medica.service';
import { UsuarioService } from '../services/usuario.service';
import { MedicoService } from '../services/domain/medico.service';

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
    PaisService,
    AlergiaService,
    ExpecialidadeMedicaService,
    UsuarioService,
    MedicoService,
  ]
})
export class AppModule {}