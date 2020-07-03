import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'HomePage';

  showSubmenu: boolean = false;
  showSubmenu1: boolean = false;
  showPaciente: boolean = false;
  showEstado: boolean = false;
  showCidade: boolean = false;
  showQuarto: boolean = false;
  showLeito: boolean = false;
  showMedicoEnfermagem: boolean = false;
  showExpecialidadeEnf: boolean = false;
  showEnfermagem: boolean = false;
  showFarmacia: boolean = false;

  
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
  menuFarmacia(): void {
    this.showFarmacia = !this.showFarmacia;
 }
  menuPaciente(): void{
      this.showPaciente = ! this.showPaciente;
  }
  menuEstado(): void{
      this.showEstado = ! this.showEstado;
  }
  menuQuarto(): void{
      this.showQuarto = ! this.showQuarto;
  }

  menuLeito(): void{
      this.showLeito = ! this.showLeito;
  }

  menuEnf(): void{
    this.showEnfermagem = ! this.showEnfermagem;
  }
  menuExpEnf():void{
    this.showExpecialidadeEnf = ! this.showExpecialidadeEnf;
  }

/*----------------------MENU------CADASTRAR-------------------*/
  quarto(){
    this.nav.setRoot('QuartoPage');
  }

  estado(){
     this.nav.setRoot('EstadoPage');
  }
  leito(){
    this.nav.setRoot('LeitoPage');
  }

  alergia(){
    this.nav.setRoot("AlergiaPage");
  }
  cidade(){
    this.nav.setRoot('CidadePage');
  }
  expmedico(){
    this.nav.setRoot('ExpmedicoPage')
  }
  usuario(){
    this.nav.setRoot("UsuarioPage");
  }
 
  medico(){
    this.nav.setRoot("MedicoPage");
  }
  enfermagem(){
    this.nav.setRoot("EnfermagemPage");
  }
  expecialidadeEnf(){
    this.nav.setRoot('ExpenfermagemPage');
  }
  categoriaExame(){
    this.nav.setRoot('CategoriaexamePage');
  }
  nomeexame(){
    this.nav.setRoot('NomeexamePage');
  }

  paciente(){
    this.nav.setRoot('PacientePage');
  }

  exame(){
     this.nav.setRoot('ExamePage');
  }

  prescricao(){
    this.nav.setRoot('PrescricaoPage');
  }

  

/*----------------------MENU------CONSULTAR-------------------*/
  cadastroEstado(){
    this.nav.setRoot("EstadoListPage");
  }
  cadastroCidade(){
    this.nav.setRoot('CidadeListPage');
  }
  cadastroQuarto(){
      this.nav.setRoot('QuartoListPage');
  }

  cadastroAlergia(){
    this.nav.setRoot('AlergiaListPage');
  }

  cadastroExpecialidadeMed(){
    this.nav.setRoot('ExpmedicoListPage');
  }

  cadastroMedico(){
    this.nav.setRoot('MedicoListPage');
  }

  cadastroCategoriaExame(){
    this.nav.setRoot('CategoriaexameListPage');
  }

  cadastroNomeExame(){
    this.nav.setRoot('NomeexameListPage')
  }

  cadastroExpEnfermagem(){
    this.nav.setRoot('ExpenfermagemListPage');
  }
  cadastroEnfermagem(){
    this.nav.setRoot('EnfermagemListPage');
  }



  farmacia(){
    this.nav.setRoot('FarmaciaPage');
  }
  medicamento(){
    this.nav.setRoot('MedicamentoPage');
  }
  categoriaMedicamento(){
    this.nav.setRoot('CategoriamedicamentoPage');
  }


  cadastroLeito(){
    this.nav.setRoot('LeitoListPage');
  }
  cadastroMedicamento(){
    this.nav.setRoot('MedicamentoListPage');
  }
  cadastroCategoriaMedicamento(){
    this.nav.setRoot('MedicamentoListPage');
  }
  cadastroFarmacia(){
    this.nav.setRoot('FarmaciaListPage');
  }
  cadastroPaciente(){
    this.nav.setRoot('PacienteListPage');
  }

  cadastroExame(){
    this.nav.setRoot('ExameListPage');
  }
  
  cadastroPrescricao(){
    this.nav.setRoot('PrescricaoListPage');
  }
}
