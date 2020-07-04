import { AlergiaDTO } from './../../modules/alergia.dto';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AlergiaService } from '../../services/domain/alergia.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-alergia',
  templateUrl: 'alergia.html',
})
export class AlergiaPage implements OnInit{

  loading: any;
  formGroup: FormGroup;
  item: AlergiaDTO;
  
  constructor(
     public navCtrl: NavController,
     public navParams: NavParams,
     public alergiaService: AlergiaService,
     public alertControl: AlertController,
     public loadingCtrl: LoadingController,
     public formBiulder: FormBuilder,) {

      const alergia = this.navParams.get('item');
      if (alergia && alergia.id) {
        this.item = alergia;
      }
  }
  ngOnInit(): void {
    // Monta os dados necessários para o formulário
    this.formGroup = this.formBiulder.group({
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
  
  saveAlergia(){
    const alergia = this.formGroup.value as AlergiaDTO;
    // TODO - verificar se os dados foram preenchidos
    if (alergia.id) { // se o estado já tem id ele já foi cadastrado na base, então faço um update
      this.updateAlergia(alergia);
    } else {
      this.insertAlergia(alergia);
    }
  }

  insertAlergia(alergia: AlergiaDTO) {
    this.showLoading();
    this.alergiaService.insert(alergia).subscribe(response => {
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

  showInsertOK(){
    let alert = this.alertControl.create({
      title: "Sucesso!",
      message: "Cadastrado efetuado com sucesso!",
      buttons: [
        {
          text: "OK"
        }
     ]
    });

    alert.present();
  }

  private updateAlergia(alergia: AlergiaDTO) {
    this.showLoading();
    this.alergiaService.update(alergia).subscribe(response => {
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

  back() {
    if (this.navCtrl.canGoBack()) {
      this.navCtrl.pop();
    } else {
      this.navCtrl.popToRoot();
      this.navCtrl.setRoot('TelaInicialPage');
    }
  }

}
