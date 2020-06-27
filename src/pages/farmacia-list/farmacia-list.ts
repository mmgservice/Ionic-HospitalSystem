import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher, LoadingController } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { FarmaciaDTO } from '../../modules/farmacia.dto';
import { MedicamentoDTO } from '../../modules/medicamento.dto';
import { FarmaciaService } from '../../services/domain/farmacia.service';
import { MedicamentoService } from '../../services/domain/medicamento.service';


@IonicPage()
@Component({
  selector: 'page-farmacia-list',
  templateUrl: 'farmacia-list.html',
})
export class FarmaciaListPage implements OnInit {
  @ViewChild(Refresher) refresher: Refresher;

  loading: any;
  formGroup: FormGroup;
  items: FarmaciaDTO [] = [];
  medicamento: MedicamentoDTO [] = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtl: LoadingController,
              public farmaciaService: FarmaciaService,
              public medicamentoService: MedicamentoService) {
  }

  ionViewWillEnter(){
    this.list();
  }

  ngOnInit(): void {

  }
  list(){
    this.items = [];
    this.showLoading();
    this.farmaciaService.findAll().subscribe(response =>{
      this.closeLoading();
      this.items = response;
    },error => {
      this.closeLoading();
    });

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

  newItem(){
    this.navCtrl.push('FarmaciaPage');
  }
  itemSelected(item: FarmaciaDTO, medicamento: MedicamentoDTO){
    this.navCtrl.push('FarmaciaPage', {item: item, medicamento:medicamento});
  }

  deletar(id){
    this.farmaciaService.deletar(id).subscribe(response =>{
      this.navCtrl.setRoot('FarmaciaListPage');
    })
  }
}
