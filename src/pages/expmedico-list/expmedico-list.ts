
import { ExpedicalidadeMedicaDTO } from './../../modules/expmedica.dto';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { ExpecialideMedicoService } from '../../services/domain/expmedico.service';

/**
 * Generated class for the ExpmedicoListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-expmedico-list',
  templateUrl: 'expmedico-list.html',
})
export class ExpmedicoListPage implements OnInit {
  // Componente utilizado para atualizar a lista da tela
  // Ao puxar para baixo, os itens serão listados novamente
  @ViewChild(Refresher) refresher: Refresher;

  loading: any;
  formGroup: FormGroup;
  items: ExpedicalidadeMedicaDTO[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertControl: AlertController,
    public loadingCtrl: LoadingController,
    public expecialidadeservice: ExpecialideMedicoService,
    ) {
  }

  /**
   * Método é chamado toda vez que a tela é exibida
   */
  ionViewWillEnter() {
    this.list();
  }

  ngOnInit(): void {
    // Comentado para chamas o this.list() pelo ionViewDidEnter
    // Assim, toda vez que a tela for exibida a lista é atualizada
    // Fiz isso para atualizar a lista caso o usuário tenha cadastrado,
    // editado ou excluido um estado
    // this.list();
  }

  /**
   * Lista todos os estados cadastrados
   */
  list() {
    this.items = [];
    this.showLoading();
    this.expecialidadeservice.findAll()
      .subscribe(response => {
        this.closeLoading();
        this.items = response;
      }, error => {
        this.loading = false;
        // TODO - verificar erro e exibir msg de erro
      })
  }

  /**
   * Vai pra tela para cadastrar um novo estado
   */
  newItem() {
    this.navCtrl.push('ExpmedicoPage')
  }

  /**
   * Vai pra tela para editar o estado selecionado
   */
  itemSelected(item: ExpedicalidadeMedicaDTO, expecialidade: ExpedicalidadeMedicaDTO) {
    this.navCtrl.push('ExpmedicoPage', {item: item, expecialidade:expecialidade});
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
  
  deletar(id){
    this.expecialidadeservice.deletar(id).subscribe(response => {
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


}
