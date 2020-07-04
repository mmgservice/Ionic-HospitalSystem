import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaMedicamentoService } from '../../services/categoriamedicamento.service';
import { CatMedicamentoDTO } from '../../modules/catmedicamento.dto';

@IonicPage()
@Component({
  selector: 'page-categoriamedicamento',
  templateUrl: 'categoriamedicamento.html',
})
export class CategoriamedicamentoPage implements OnInit{

  loading: any;
  formGroup: FormGroup
  item: CatMedicamentoDTO

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public loadingCtl: LoadingController,
              public formBuilder: FormBuilder,
              public categoriaMedicamentoService:CategoriaMedicamentoService 
              
  ) {
  
    const medicamento = this.navParams.get('item');
    if(medicamento && medicamento.id){
        this.item = medicamento;
    }

  }

  ngOnInit(): void{
    this.formGroup = this.formBuilder.group({
      id: [null, this.item && this.item.id ? Validators.required : null],
      nome:[null, Validators.required]
    });

    if(this.item && this.item.id){
      this.formGroup.patchValue({
        id: this.item.id,
        nome: this.item.nome,
      })
    }
  }
  saveCategoriaMedicamento(){
    const categoriamedicamento = this.formGroup.value  as CatMedicamentoDTO
    if(categoriamedicamento.id){
      this.updateCategoriaMedicamento(categoriamedicamento);
    }else{
      this.insertCategoriaMedicamento(categoriamedicamento);
    }
  
  }
  insertCategoriaMedicamento(categoriamedicamento: CatMedicamentoDTO){
    this.showLoading();
    this.categoriaMedicamentoService.insert(categoriamedicamento).subscribe(response => {
        this.closeLoading();
        let alert = this.alertCtrl.create({
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
  updateCategoriaMedicamento(categoriamedicamento: CatMedicamentoDTO){
    this.showLoading();
    this.categoriaMedicamentoService.update(categoriamedicamento).subscribe(response => {
        this.closeLoading();
        let alert = this.alertCtrl.create({
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
    this.loading = this.loadingCtl.create({
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
      this.navCtrl.setRoot('TelaInicialPage');
    }
  }

}
