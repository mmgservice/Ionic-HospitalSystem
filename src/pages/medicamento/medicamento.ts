import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CatMedicamentoDTO } from '../../modules/catmedicamento.dto';
import { MedicamentoDTO } from '../../modules/medicamento.dto';
import { CategoriaMedicamentoService } from '../../services/categoriamedicamento.service';
import { MedicamentoService } from '../../services/domain/medicamento.service';


@IonicPage()
@Component({
  selector: 'page-medicamento',
  templateUrl: 'medicamento.html',
})
export class MedicamentoPage implements OnInit {

  formGroup: FormGroup;
  listaCategoria: CatMedicamentoDTO[];
  loading: any;
  item: MedicamentoDTO


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public categoriaMedicamento: CategoriaMedicamentoService,
              public formBuilder: FormBuilder,
              public loadingCtrl: LoadingController,
              public alertControler: AlertController,
              public medicamentoService: MedicamentoService
    ) {
      const medicamento = this.navParams.get('item');
      if(medicamento && medicamento.id){
        this.item = medicamento;
      }
      this.listCategoriaMedicamento();
  }


  ngOnInit(): void {
     this.formGroup = this.formBuilder.group({
       id:[null, this.item && this.item.id ? Validators.required: null],
       nome: [null,Validators.required],
       categoriamedicamento: [null,Validators.required]
     });
     if(this.item && this.item.id){
       this.formGroup.patchValue({
         id: this.item.id,
         nome: this.item.nome,
         categoria: this.item.categoriamedicamento
       })
     }
  }
  listCategoriaMedicamento(){
     this.categoriaMedicamento.findAll().subscribe(response => {
       this.listaCategoria = response;
     })
  }

  insertMedicamento(medicamento: MedicamentoDTO){
    this.showLoading();
    this.medicamentoService.insert(medicamento).subscribe(response => {
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

  private updateMedicamento(medicamento: MedicamentoDTO) {
    this.showLoading();
    this.medicamentoService.update(medicamento).subscribe(response => {
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
      this.navCtrl.setRoot('TelaInicialPage');
      this.navCtrl.popToRoot();
    }
  }

  saveMedicamento(){
    const medicamento = this.formGroup.value as MedicamentoDTO;
    if(medicamento.id){
      this.updateMedicamento(medicamento);
    }else{
      this.insertMedicamento(medicamento);
    }
    this.navCtrl.setRoot('MedicamentoPage');
  }

}
