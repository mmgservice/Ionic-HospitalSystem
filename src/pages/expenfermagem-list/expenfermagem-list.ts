import { EnfermagemService } from './../../services/domain/enfermagem.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { ExpecialidadeEnfermagemDTO } from '../../modules/expenfermagem.dto';
import { ExpecialidadeEnfermagemService } from '../../services/domain/expenfermagem';

/**
 * Generated class for the ExpenfermagemListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-expenfermagem-list',
  templateUrl: 'expenfermagem-list.html',
})
export class ExpenfermagemListPage implements OnInit {

  // Componente utilizado para atualizar a lista da tela
  // Ao puxar para baixo, os itens serão listados novamente
  @ViewChild(Refresher) refresher: Refresher;
  
  loading: any;
  formGroup: FormGroup;
  items: ExpecialidadeEnfermagemDTO [] = [];
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertControl: AlertController,
    public loadingCtrl: LoadingController,
    public expenfermagemservice: ExpecialidadeEnfermagemService
    ) {
  }

  ionViewWillEnter() {
    this.list();
  }

  ngOnInit(): void {
    
  }

  list() {
    this.items = [];
    this.showLoading();
    this.expenfermagemservice.findAll()
      .subscribe(response => {
        this.closeLoading();
        this.items = response;
      }, error => {
        this.loading = false;
        // TODO - verificar erro e exibir msg de erro
      })
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
  itemSelected(item: ExpecialidadeEnfermagemDTO, expecialidade: ExpecialidadeEnfermagemDTO) {
    this.navCtrl.push('ExpenfermagemPage', {item: item, expecialidade:expecialidade});
  }
  
  deletar(id){
    this.expenfermagemservice.deletar(id).subscribe(response => {
      this.items = response;
      this.list();
      let alert = this.alertControl.create({
        title: "Sucesso",
        message: "Estado removido com sucesso!",
        buttons: [{
          text: "OK"
        }]
      });
      alert.present();
    })
  }

  newItem(){
     this.navCtrl.push('ExpenfermagemPage');
  }

}
