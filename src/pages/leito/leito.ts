import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LeitoDTO } from '../../modules/leito.dto';
import { LeitoService } from '../../services/domain/leito.service';
import { QuartoService } from '../../services/domain/quarto.service';
import { QuartoDTO } from '../../modules/quarto.dto';

@IonicPage()
@Component({
  selector: 'page-leito',
  templateUrl: 'leito.html',
})
export class LeitoPage implements OnInit {

  formGroup: FormGroup;
  loading: any;
  listaQuarto: QuartoDTO[];
  item: LeitoDTO

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public leitoservice: LeitoService,
              public loadingCtrl: LoadingController,
              public quartoservice: QuartoService,
              public formBuilder: FormBuilder,
              public alertControler: AlertController
   ) {
   
    const leito = this.navParams.get('item');
    if(leito && leito.id){
        this.item = leito;
    }
    this.listQuarto();
  }

  ngOnInit(): void{
      this.formGroup = this.formBuilder.group({
        id:[null,this.item && this.item.id ? Validators.required : null],
        nomequarto: [null,Validators.required],
        statusquartoenum: [null,Validators.required],
        quarto: [null,Validators.required]
      });
      if(this.item && this.item.id){
        this.formGroup.patchValue({
          id: this.item.id,
          nomequarto: this.item.nomequarto,
          statusquartoenum: this.item.statusquartoenum,
          quarto: this.item.quarto
        })
      }
  }
  listQuarto(){
    this.quartoservice.findAll().subscribe(response =>{
      this.listaQuarto = response;
    })
  }
  
  saveLeito(){
    const leito = this.formGroup.value as LeitoDTO;
    if(leito.id){
      this.updateLeito(leito);
    }else{
      this.insertLeito(leito);
    }
    this.navCtrl.setRoot('LeitoListPage');
  }


  insertLeito(leito: LeitoDTO){
    this.showLoading();
    this.leitoservice.insert(leito).subscribe(response => {
    this.closeLoading();
        let alert = this.alertControler.create({
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

  private updateLeito(leito: LeitoDTO) {
    this.showLoading();
    this.leitoservice.update(leito).subscribe(response => {
        this.closeLoading();
        let alert = this.alertControler.create({
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
      }
    )

  }


}
