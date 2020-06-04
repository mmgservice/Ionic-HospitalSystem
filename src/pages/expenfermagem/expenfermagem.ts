import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ExpecialidadeEnfermagemService } from '../../services/domain/expenfermagem';
import { ExpecialidadeEnfermagemDTO } from '../../modules/expenfermagem.dto';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

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
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public formBuilider: FormBuilder,
    public alertControl: AlertController,
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
  /*
  saveExpenf(){
    const expenfermagem = this.formGroup.value as ExpecialidadeEnfermagemDTO;
    if(expenfermagem.id){
     // this.updateExpenf(expenfermagem);
         Message: "Em desenvolvimento";
    }else{
      this.insertExpenf(expenfermagem);
    }
  }
  insertExpenf(expenfermagem: ExpecialidadeEnfermagemDTO){
      this.showLoading();
      this.expecialidadeService.insert(expenfermagem).subscribe(response =>{
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
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    this.loading.present();
  }

  /**
   * Fecha o loading
   
  closeLoading() {
    if (this.loading) {
      this.loading.dismiss();
    }
  }

  /**
   * Volta para a tela que chamou
   
  back() {
    if (this.navCtrl.canGoBack()) {
      this.navCtrl.pop();
    } else {
      this.navCtrl.popToRoot();
    }
  }
  */

}
