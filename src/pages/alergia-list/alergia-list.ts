import { AlergiaService } from './../../services/domain/alergia.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Refresher } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { AlergiaDTO } from '../../modules/alergia.dto';

/**
 * Generated class for the AlergiaListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alergia-list',
  templateUrl: 'alergia-list.html',
})
export class AlergiaListPage implements OnInit {
  // Componente utilizado para atualizar a lista da tela
  // Ao puxar para baixo, os itens serão listados novamente
  @ViewChild(Refresher) refresher: Refresher;

  loading: any;
  formGroup: FormGroup;
  items: AlergiaDTO[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertControl: AlertController,
    public loadingCtrl: LoadingController,
    public alergiaService: AlergiaService,
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
    this.alergiaService.findAll()
      .subscribe(response => {
        this.closeLoading();
        this.items = response;
      }, error => {
        this.loading = false;
        // TODO - verificar erro e exibir msg de erro
      })
  }

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

  newItem() {
    this.navCtrl.push('AlergiaPage')
  }

  deletar(id){
    this.alergiaService.deletar(id).subscribe(response => {
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

  itemSelected(item: AlergiaDTO) {
    this.navCtrl.push('AlergiaPage', {item: item});
  }



}
