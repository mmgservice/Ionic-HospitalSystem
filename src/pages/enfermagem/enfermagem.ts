import { ExpecialidadeEnfermagemDTO } from './../../modules/expenfermagem.dto';
import { EnfermagemService } from './../../services/domain/enfermagem.service';
import { ExpecialidadeEnfermagemService } from './../../services/domain/expenfermagem';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EnfermagemDTO } from '../../modules/enfermagem.dto';



@IonicPage()
@Component({
  selector: 'page-enfermagem',
  templateUrl: 'enfermagem.html',
})
export class EnfermagemPage implements OnInit{

  loading: any;
  formGroup: FormGroup;
  item: EnfermagemDTO;
  especialidade: ExpecialidadeEnfermagemDTO;
  listaExpEnfermagem:ExpecialidadeEnfermagemDTO [] = [];

  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public alertControl: AlertController,
     public loadingCtrl: LoadingController,
     public formBuilider: FormBuilder,
     public expenfermagemservice: ExpecialidadeEnfermagemService,
     public  enfermagemservice: EnfermagemService
     ) {

      const enfermagem = this.navParams.get('item');
      if(enfermagem && enfermagem.id){
        this.item = enfermagem;
      }

      const especialidade = this.navParams.get('item');
      if(especialidade && especialidade.id){
        this.especialidade = especialidade;
      }


      this.listExpEnfermagem();
  }

  ngOnInit(): void {
      // Monta os dados necessários para o formulário
      this.formGroup = this.formBuilider.group({
        // o id é obrigatório somente em casos de edição
        id: [null, this.item && this.item.id ? Validators.required : null],
        nome: [null, Validators.required],
        coren: [null, Validators.required], 
        expecialidade:[null, Validators.required], 
  
   });
   if (this.item && this.item.id) {
    // seta os dados do registro de edição no formulário
    this.formGroup.patchValue({
      id: this.item.id,
      nome: this.item.nome,
      coren: this.item.coren,
      expecialidade: this.especialidade
    })
  }

  }

  listExpEnfermagem(){
    this.expenfermagemservice.findAll().subscribe(response =>{
      this.listaExpEnfermagem = response;
    })
  }

  saveEnfermagem(){
    const enfermagem = this.formGroup.value as EnfermagemDTO;
    // TODO - verificar se os dados foram preenchidos
    if (enfermagem.id) { // se o estado já tem id ele já foi cadastrado na base, então faço um update
      this.updateEnfermagem(enfermagem);
    } else {
      this.insertEnfermagem(enfermagem);
    }
  }

  insertEnfermagem(enfermagem: EnfermagemDTO){
    this.showLoading();
    this.enfermagemservice.insert(enfermagem).subscribe(response => {
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
        this.closeLoading()
        // TODO - verificar erro e exibir msg de erro
      }

    )
  }
 /**
   * Atualizo os dados do medico
   * @param enfermagem
   */

  private updateEnfermagem(enfermagem: EnfermagemDTO) {
    this.showLoading();
    this.enfermagemservice.update(enfermagem).subscribe(response => {
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

  
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    this.loading.present();
  }
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
