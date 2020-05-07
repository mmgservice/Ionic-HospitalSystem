import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PaisPage } from '../pages/pais/pais';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'HomePage';

  showSubmenu: boolean = false;
  showSubmenu1: boolean = false;
  showPaciente: boolean = false;
 
  
  pages: Array<{title: string, component: string}>;
  

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  menuItemHandler(): void {
    this.showSubmenu = !this.showSubmenu;
  }
  menuItemHandler1(): void {
       this.showSubmenu1 = !this.showSubmenu1;
  }
  menuPaciente(): void{
      this.showPaciente = ! this.showPaciente;
  }

  pais(){
    this.nav.setRoot('PaisPage');
  }
  estado(){
     this.nav.setRoot('EstadoPage');
  }
}
