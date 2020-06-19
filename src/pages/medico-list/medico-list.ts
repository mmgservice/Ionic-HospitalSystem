import { MedicoService } from './../../services/domain/medico.service';
import { ExpedicalidadeMedicaDTO } from './../../modules/expmedica.dto';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { ExpecialideMedicoService } from '../../services/domain/expmedico.service';
import { MedicoDTO } from '../../modules/medico.dto';


@IonicPage()
@Component({
  selector: 'page-medico-list',
  templateUrl: 'medico-list.html',
})
export class MedicoListPage implements OnInit {
 // Componente utilizado para atualizar a lista da tela
  // Ao puxar para baixo, os itens serão listados novamente
  @ViewChild(Refresher) refresher: Refresher;
  
  loading: any;
  formGroup: FormGroup;
  items: MedicoDTO[]=[];
  listaExpMedico: ExpedicalidadeMedicaDTO[]=[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertControl: AlertController,
    public loadingCtrl: LoadingController,
    public expMedicoService: ExpecialideMedicoService,
    public medicoService: MedicoService) {
  }

  ionViewWillEnter(){
    this.list();
   }

  ngOnInit(): void {
    
  }

   list(){
    this.items = [];
    this.showLoading();
    this.medicoService.findAll().subscribe(response => {
      this.closeLoading();
      this.items = response;
    },error => {
      // TODO - EXIBIR MSG DE ERRO NA TELA
      this.closeLoading();
    });
  }

  /**
   * Abre o loading
   */
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    this.loading.present();
  }

  /**
   * Fecha o loading
   */
  closeLoading() {
    if (this.loading) {
      this.loading.dismiss(); 
    }
    if (this.refresher) { // Avisa ao refresher que os itens foram listados
      this.refresher.complete();
    }
  }

  /**
   * Vai pra tela para editar o estado selecionado
   */
  itemSelected(item: MedicoDTO, expecialidade: ExpedicalidadeMedicaDTO) {
    this.navCtrl.push('MedicoPage', {item: item, expecialidade:expecialidade});
  }

  newItem(){
    this.navCtrl.push('MedicoPage');
  }

  deletar(id){
    this.medicoService.deletar(id).subscribe(response => {
      this.items = response;
      this.list();
      let alert = this.alertControl.create({
        title: "Sucesso",
        message: "Médico removido com sucesso!",
        buttons: [{
          text: "OK"
        }]
      });
      alert.present();
    })
  }

}
