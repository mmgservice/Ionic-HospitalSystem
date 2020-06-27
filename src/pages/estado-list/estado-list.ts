import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, Refresher} from 'ionic-angular';
import {FormGroup} from '@angular/forms';
import {EstadoDTO} from '../../modules/estado.dto';
import {EstadoService} from '../../services/domain/estado.service';


@IonicPage()
@Component({
  selector: 'page-estado-list',
  templateUrl: 'estado-list.html',
})
export class EstadoListPage implements OnInit {
  // Componente utilizado para atualizar a lista da tela
  // Ao puxar para baixo, os itens serão listados novamente
  @ViewChild(Refresher) refresher: Refresher;

  loading: any;
  formGroup: FormGroup;
  items: EstadoDTO[] = [];

  constructor(public navCtrl: NavController,
              public alertControl: AlertController,
              public loadingCtrl: LoadingController,
              public estadoService: EstadoService
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
    this.estadoService.findAll()
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
    this.navCtrl.push('EstadoPage')
  }

  /**
   * Vai pra tela para editar o estado selecionado
   */
  itemSelected(item: EstadoDTO) {
    this.navCtrl.push('EstadoPage', {item: item});
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
    this.estadoService.deletar(id).subscribe(response => {
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
