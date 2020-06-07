import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher, LoadingController } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { CidadeDTO } from '../../modules/cidade.dto';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoDTO } from '../../modules/estado.dto';
import { EstadoService } from '../../services/domain/estado.service';

@IonicPage()
@Component({
  selector: 'page-cidade-list',
  templateUrl: 'cidade-list.html',
})
export class CidadeListPage implements OnInit {
@ViewChild(Refresher) refresher: Refresher;

loading: any;
formGroup: FormGroup;
items: CidadeDTO[] = [];
estado: EstadoDTO[] = [];


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtl: LoadingController,
              public cidadeService: CidadeService,
              public estadoService: EstadoService) {
  }

  ionViewWillEnter(){
    this.list();
  }

  ngOnInit(): void{

  }

  list(){
    this.items = [];
    this.showLoading();
    this.cidadeService.findAll().subscribe(response => {
      this.closeLoading();
      this.items = response;
    },error => {
      // TODO - EXIBIR MSG DE ERRO NA TELA
      this.closeLoading();
    });
  }

  newItem(){
    this.navCtrl.push('CidadePage');
  }

  itemSelected(item: CidadeDTO, estado: EstadoDTO){
    this.navCtrl.push('CidadePage', {item: item , estado:estado});
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
    this.cidadeService.deletar(id).subscribe(response =>{
      this.navCtrl.setRoot('CidadeListPage');
    })
  }
}
