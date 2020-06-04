import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaMedicamentoDTO } from '../../modules/categoriamedicamento.dto';
import { MedicoDadosDTO } from '../../modules/medicodados.dto';
import { CategoriaMedicamentoService } from '../../services/categoriamedicamento.service';


@IonicPage()
@Component({
  selector: 'page-categoriamedicamento',
  templateUrl: 'categoriamedicamento.html',
})
export class CategoriamedicamentoPage implements OnInit{

  loading: any;
  formGroup: FormGroup;
  item: CategoriaMedicamentoDTO;



  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertControl: AlertController,
              public loadingCtrl: LoadingController,
              public formBuilider: FormBuilder,
              public categoriaMedicamentoService: CategoriaMedicamentoService
    ) {

      const catmedicamento = this.navParams.get('item');
      if(catmedicamento && catmedicamento.id){
        this.item = catmedicamento;
      }
  }

  ngOnInit():void{
    this.formGroup = this.formBuilider.group({
      id:[null, this.item && this.item.id? Validators.required : null],
      nome:[null,Validators.required]
  });
    if(this.item && this.item.id){
      this.formGroup.patchValue({
      id: this.item.id,
      nome: this.item.nome

      })
    }
  }

  insertCatMedicamento(categoriamedicamento: CategoriaMedicamentoDTO){

  }

  updateCatMedicamento(categoriamedicamento: CategoriaMedicamentoDTO){
    this.showLoading();
    this.categoriaMedicamentoService.update(categoriamedicamento).subscribe(response =>{
      this.closeLoading();
    })
  }

  saveCatMedicamento(){
      const categoriamedicamento = this.formGroup.value as CategoriaMedicamentoDTO;
      if(categoriamedicamento.id){
        this.updateCatMedicamento(categoriamedicamento);
      }else{
        this.insertCatMedicamento(categoriamedicamento)
      }
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
