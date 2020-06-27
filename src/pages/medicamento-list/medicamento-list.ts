import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Refresher } from 'ionic-angular';
import { CategoriaMedicamentoService } from '../../services/categoriamedicamento.service';
import { MedicamentoService } from '../../services/domain/medicamento.service';
import { FormGroup } from '@angular/forms';
import { MedicamentoDTO } from '../../modules/medicamento.dto';
import { CatMedicamentoDTO } from '../../modules/catmedicamento.dto';

@IonicPage()
@Component({
  selector: 'page-medicamento-list',
  templateUrl: 'medicamento-list.html',
})
export class MedicamentoListPage implements OnInit{
 @ViewChild(Refresher) refresher: Refresher;

  loading: any;
  formGroup: FormGroup;
  items: MedicamentoDTO[] = [];
  categoriaMedicamento: CatMedicamentoDTO[] = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtl: LoadingController,
              public medicamentoService: MedicamentoService,
              public categoriamedicamentoService: CategoriaMedicamentoService) {
  }

  ionViewWillEnter(){
   this.list();
  }
  ngOnInit(): void {

  }

  list(){
    this.items = [];
    this.showLoading();
    this.medicamentoService.findAll().subscribe(response => {
      this.closeLoading();
      this.items = response;
    }, error => {
      this.closeLoading();
    });
  }

  newItem(){
    this.navCtrl.push('MedicamentoPage');
  }

  itemSelected(item: MedicamentoDTO, categoriaMedicamento: CatMedicamentoDTO){
    this.navCtrl.push('MedicamentoPage', {item: item , categoriaMedicamento:categoriaMedicamento});
  }
  showLoading(){
    this.loading = this.loadingCtl.create({
      content: "Aguarde..."
    });
    this.loading.present();
  }
  closeLoading(){
    if(this.loading){
      this.loading.dismiss();
    }
    if(this.refresher){
      this.refresher.complete();
    }
  }
  deletar(id){
    this.medicamentoService.delete(id).subscribe(response => {
      this.navCtrl.setRoot('MedicamentoListPage');
    })
  }

}
