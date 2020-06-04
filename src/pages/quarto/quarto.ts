import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { QuartoService } from '../../services/domain/quarto.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { QuartoDTO } from '../../modules/quarto.dto';

@IonicPage()
@Component({
  selector: 'page-quarto',
  templateUrl: 'quarto.html',
})
export class QuartoPage implements OnInit{

  loading: any;
  formGroup: FormGroup;
  item: QuartoDTO


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuiler: FormBuilder,
              public quartoservice: QuartoService,
              public alertControl: AlertController,
              public loadingCtrl: LoadingController
              ) {
             
          const quarto = this.navParams.get('item');
          if(quarto && quarto.id){
            this.item = quarto;
          }
  }

  ngOnInit(): void {
      this.formGroup = this.formBuiler.group({
        id: [null, this.item && this.item.id ? Validators.required: null],
        nome: [null,Validators.required]
      });

      if(this.item && this.item.id){
        this.formGroup.patchValue({
          id: this.item.id,
          nome: this.item.nome
        })
      }
  }
  
  saveQuarto(){
    const quarto = this.formGroup.value as QuartoDTO;
    if(quarto.id){
      this.updateQuarto(quarto);
    }else{
      this.insertQuarto(quarto);
    }
  }
  insertQuarto(quarto: QuartoDTO){
    this.showLoading();
    this.quartoservice.insert(quarto).subscribe(response =>{
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

  updateQuarto(quarto : QuartoDTO){
    this.showLoading();
    this.quartoservice.update(quarto).subscribe(response =>{
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
