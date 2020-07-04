import { ExpecialideMedicoService } from './../../services/domain/expmedico.service';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpedicalidadeMedicaDTO } from '../../modules/expmedica.dto';

@IonicPage()
@Component({
  selector: 'page-expmedico',
  templateUrl: 'expmedico.html',
})
export class ExpmedicoPage implements OnInit {

  loading: any;
  formGroup: FormGroup;
  item: ExpedicalidadeMedicaDTO


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilider: FormBuilder,
              public alertControl: AlertController,
              public loadingCtrl: LoadingController,
              public expecialidadeservice: ExpecialideMedicoService) 
              {
               
              const exp = this.navParams.get('item');
              if(exp && exp.id){
                this.item = exp;
              }
  }
  ngOnInit(): void {
    // Monta os dados necessários para o formulário
    this.formGroup = this.formBuilider.group({
      // o id é obrigatório somente em casos de edição
      id: [null, this.item && this.item.id ? Validators.required : null],
      expecialidade: [null, Validators.required]
    });

    if (this.item && this.item.id) {
      // seta os dados do registro de edição no formulário
      this.formGroup.patchValue({
        id: this.item.id,
        expecialidade: this.item.expecialidade,
      })
    }
  }

  saveExpecialidade(){
    const exp = this.formGroup.value as ExpedicalidadeMedicaDTO;
    // TODO - verificar se os dados foram preenchidos
    if (exp.id) { // se o estado já tem id ele já foi cadastrado na base, então faço um update
      this.updateExpMedico(exp);
    } else {
      this.inserirExp(exp);
    }
  }

  inserirExp(exp: ExpedicalidadeMedicaDTO){
    this.expecialidadeservice.insert(this.formGroup.value).subscribe(response =>{
      this.insertOk();
    },
    error => {}
    )
  }

  insertOk(){
    let alert = this.alertControl.create({
      title: "Cadastrado",
      message: "Cadastrado efetuado com sucesso!",
      buttons:[{
         text: "OK"
      }]
    })
    alert.present();
  }


    /**
   * Atualizo os dados do estado
   * @param medico
   */
  private updateExpMedico(medico: ExpedicalidadeMedicaDTO) {
    this.showLoading();
    this.expecialidadeservice.update(medico).subscribe(response => {
        this.closeLoading();
        let alert = this.alertControl.create({
          title: "Sucesso",
          message: "Cadastro realizado com sucesso!",
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
  deleteExpMedico(id) {
    // TODO - exibir um modal para perguntar ao usuário se ele realmente quer excluir o estado
    this.showLoading();
    this.expecialidadeservice.deletar(id).subscribe(response => {
        this.closeLoading();
        let alert = this.alertControl.create({
          title: "Sucesso",
          message: "Expecialidade removida com sucesso!",
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
    this.loading.pssent();
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
      this.navCtrl.setRoot('TelaInicialPage');
    }
  }
}
