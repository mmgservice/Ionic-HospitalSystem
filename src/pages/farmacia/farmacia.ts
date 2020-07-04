import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MedicamentoDTO } from '../../modules/medicamento.dto';
import { FarmaciaDTO } from '../../modules/farmacia.dto';
import { MedicamentoService } from '../../services/domain/medicamento.service';
import { FarmaciaService } from '../../services/domain/farmacia.service';

@IonicPage()
@Component({
  selector: 'page-farmacia',
  templateUrl: 'farmacia.html',
})

export class FarmaciaPage implements OnInit{

  formGroup: FormGroup;
  listaMedicamento: MedicamentoDTO[];
  loading: any;
  item: FarmaciaDTO

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public medicamentoService: MedicamentoService,
              public farmaciaService: FarmaciaService,
              public alertControler: AlertController,
              public loadingCtrl: LoadingController
  ) {
    const farmacia = this.navParams.get('item');
    if(farmacia && farmacia.id){
      this.item = farmacia;
    }
    this.listMedicamento();
  }
  public date: string = new Date().toISOString();

  ngOnInit():void {
     this.formGroup = this.formBuilder.group({
      id:[null,this.item && this.item.id ? Validators.required: null],
      datasistema : [null,Validators.required],
      dosagem:  [null,Validators.required],
      quantidade : [null,Validators.required],
      quantidadetotal: [null,Validators.required],
      datavencimento: [null,Validators.required],
      valor:  [null,Validators.required],
      valortotal:  [null,Validators.required],
      medicamento:  [null,Validators.required],
     });
     if(this.item && this.item.id){
      this.formGroup.patchValue({
        id: this.item.id,
        datasistema: this.item.datasistema,
        dosagem: this.item.dosagem,
        quantidade: this.item.quantidade,
        quantidadetotal: this.item.quantidadetotal,
        datavencimento: this.item.datavencimento,
        valor: this.item.valor,
        valortotal: this.item.valortotal,
        medicamento: this.item.medicamento
      })  
     }
  }

  listMedicamento(){
      this.medicamentoService.findAll().subscribe(response =>{
        this.listaMedicamento = response;
      })
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
  insertFamarcia(farmacia: FarmaciaDTO){
    this.showLoading();
    this.farmaciaService.insert(farmacia).subscribe(response => {
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
  updateFamarcia(farmacia: FarmaciaDTO){
    this.showLoading();
    this.farmaciaService.update(farmacia).subscribe(response => {
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
  saveFarmacia(){
    const farmacia = this.formGroup.value as FarmaciaDTO;
    if(farmacia.id){
      this.updateFamarcia(farmacia);
    }else{
      this.insertFamarcia(farmacia);
    }
    this.navCtrl.setRoot('FarmaciaPage');
  }
}
