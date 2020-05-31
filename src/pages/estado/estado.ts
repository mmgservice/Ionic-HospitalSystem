import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EstadoDTO} from '../../modules/estado.dto';
import {EstadoService} from '../../services/domain/estado.service';

@IonicPage()
@Component({
  selector: 'page-estado',
  templateUrl: 'estado.html',
})
export class EstadoPage implements OnInit {

  loading: any;
  formGroup: FormGroup;
  item: EstadoDTO

  constructor(public navCtrl: NavController,
              public alertControl: AlertController,
              public loadingCtrl: LoadingController,
              public formBuilider: FormBuilder,
              public navParams: NavParams,
              public estadoService: EstadoService
  ) {
    // Recupera o item para editar o registro
    // Caso não tenha, é um novo registro a ser cadastrado
    const estado = this.navParams.get('item');
    if (estado && estado.id) {
      this.item = estado;
    }
  }

  ngOnInit(): void {
    // Monta os dados necessários para o formulário
    this.formGroup = this.formBuilider.group({
      // o id é obrigatório somente em casos de edição
      id: [null, this.item && this.item.id ? Validators.required : null],
      nome: [null, Validators.required]
    });

    if (this.item && this.item.id) {
      // seta os dados do registro de edição no formulário
      this.formGroup.patchValue({
        id: this.item.id,
        nome: this.item.nome,
      })
    }
  }

  /**
   * Salvo o estado
   */
  saveEstado() {
    const estado = this.formGroup.value as EstadoDTO;
    // TODO - verificar se os dados foram preenchidos
    if (estado.id) { // se o estado já tem id ele já foi cadastrado na base, então faço um update
      this.updateEstado(estado);
    } else {
      this.insertEstado(estado);
    }
  }

  /**
   * Salva o estado cadastrado pelo usuário
   */
  insertEstado(estado: EstadoDTO) {
    this.showLoading();
    this.estadoService.insert(estado).subscribe(response => {
        this.closeLoading();
        let alert = this.alertControl.create({
          title: "Sucesso",
          message: "Cadastro efetuado com sucesso!",
          buttons: [{
            text: "OK"
          }]
        });
        alert.present();
        alert.onDidDismiss(() => {
          this.back();
        });
      },
      error => {
        this.closeLoading()
        // TODO - verificar erro e exibir msg de erro
      }
    )
  }

  /**
   * Atualizo os dados do estado
   * @param estado
   */
  private updateEstado(estado: EstadoDTO) {
    this.showLoading();
    this.estadoService.update(estado).subscribe(response => {
        this.closeLoading();
        let alert = this.alertControl.create({
          title: "Sucesso",
          message: "Cadastro efetuado com sucesso!",
          buttons: [{
            text: "OK"
          }]
        });
        alert.present();
        alert.onDidDismiss(() => {
          this.back();
        });
      },
      error => {
        this.closeLoading();
        // TODO - verificar erro e exibir msg de erro
      }
    )
  }

  /**
   * Remove o estado selecionado
   * @param id
   */
  deleteEstado(id) {
    // TODO - exibir um modal para perguntar ao usuário se ele realmente quer excluir o estado
    this.showLoading();
    this.estadoService.deletar(id).subscribe(response => {
        this.closeLoading();
        let alert = this.alertControl.create({
          title: "Sucesso",
          message: "Estado removido com sucesso!",
          buttons: [{
            text: "OK"
          }]
        });
        alert.present();
        alert.onDidDismiss(() => {
          this.back();
        });
      },
      error => {
        this.closeLoading();
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
  }

  /**
   * Volta para a tela que chamou
   */
  back() {
    if (this.navCtrl.canGoBack()) {
      this.navCtrl.pop();
    } else {
      this.navCtrl.popToRoot();
    }
  }

}
