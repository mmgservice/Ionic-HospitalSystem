import { ExpecialidadeEnfermagemDTO } from './../../modules/expenfermagem.dto';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExpecialidadeEnfermagemService } from '../../services/domain/expenfermagem';

@IonicPage()
@Component({
  selector: 'page-expenfermagem',
  templateUrl: 'expenfermagem.html',
})
export class ExpenfermagemPage implements OnInit {

  formGroup: FormGroup;
  loading: any;
  item: ExpecialidadeEnfermagemDTO;

  constructor(
    public navCtrl: NavController,
    public alertControl: AlertController,
    public loadingCtrl: LoadingController,
    public formBuilider: FormBuilder,
     public navParams: NavParams,
    public expecialidadeService: ExpecialidadeEnfermagemService,
    
    ) {
      const expenfermagem = this.navParams.get('item');
      if(expenfermagem && expenfermagem.id){
        this.item = expenfermagem;
      }
  }

  ngOnInit():void{
    this.formGroup = this.formBuilider.group({
      id:[null, this.item && this.item.id ? Validators.required : null],
      expecialidade:[null,Validators.required]
    });
    if(this.item && this.item.id){
      this.formGroup.patchValue({
        id: this.item.id,
        expecialidade: this.item.expecialidade,
      })
    }
  }
  
  saveExpecialidade(){
    const expecialidade = this.formGroup.value as ExpecialidadeEnfermagemDTO;
    // TODO - verificar se os dados foram preenchidos
    if (expecialidade.id) { // se o estado já tem id ele já foi cadastrado na base, então faço um update
      this.updateExpecialidade(expecialidade);
    } else {
      this.insertExpecialidade(expecialidade);
    }
  }

  insertExpecialidade(expecialidade: ExpecialidadeEnfermagemDTO){
    this.showLoading();
    this.expecialidadeService.insert(expecialidade).subscribe(response => {
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
   * @param expecialidade
   */
  private updateExpecialidade(expecialidade: ExpecialidadeEnfermagemDTO) {
    this.showLoading();
    this.expecialidadeService.update(expecialidade).subscribe(response => {
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
  back() {
    if (this.navCtrl.canGoBack()) {
      this.navCtrl.pop();
    } else {
      this.navCtrl.popToRoot();
    }
  }

}
