import { CategoriaExameService } from './../../services/domain/categoriaexame.service';
import { CategoriaExameDTO } from './../../modules/categoriaexame.dto';
import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup } from '@angular/forms';

/**
 * Generated class for the CategoriaexameListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categoriaexame-list',
  templateUrl: 'categoriaexame-list.html',
})
export class CategoriaexameListPage implements OnInit {
  // Componente utilizado para atualizar a lista da tela
  // Ao puxar para baixo, os itens serão listados novamente
  @ViewChild(Refresher) refresher: Refresher;
  
  loading: any;
  formGroup: FormGroup;
  items: CategoriaExameDTO [] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertControl: AlertController,
    public loadingCtrl: LoadingController,
    public categoriaExameService: CategoriaExameService,
     ) {
  }

  ionViewWillEnter() {
    this.list();
  }

  ngOnInit(): void {
    
  }

  newItem(){
    this.navCtrl.setRoot('CategoriaexamePage');
  }

  list() {
    this.items = [];
    this.showLoading();
    this.categoriaExameService.findAll()
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

  deletar(id){
    this.categoriaExameService.deletar(id).subscribe(response => {
      this.items = response;
      this.list();
      let alert = this.alertControl.create({
        title: "Sucesso",
        message: "Categoria removida com sucesso!",
        buttons: [{
          text: "OK"
        }]
      });
      alert.present();
    })
  }

  itemSelected(item: CategoriaExameDTO) {
    this.navCtrl.push('CategoriaexamePage', {item: item});
  }

}
