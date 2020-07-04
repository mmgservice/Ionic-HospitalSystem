import { Component, ViewChild, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher, LoadingController } from 'ionic-angular';
import { PrescricaoService } from '../../services/domain/prescricao.service';
import { MedicoService } from '../../services/domain/medico.service';
import { EnfermagemService } from '../../services/domain/enfermagem.service';
import { FormGroup } from '@angular/forms';
import { PrescricaoDTO } from '../../modules/prescricao.dto';
import { MedicoDTO } from '../../modules/medico.dto';
import { EnfermagemDTO } from '../../modules/enfermagem.dto';
import { MedicoDadosDTO } from '../../modules/medicodados.dto';


@IonicPage()
@Component({
  selector: 'page-prescricao-list',
  templateUrl: 'prescricao-list.html',
})
export class PrescricaoListPage implements OnInit{
@ViewChild(Refresher) refresher:  Refresher;

  loading: any;
  formGroup: FormGroup;
  items: PrescricaoDTO[] = [];
  medico: MedicoDTO[] = [];
  enfermagem: EnfermagemDTO[]= [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public prescricaoService: PrescricaoService,
              public medicoService: MedicoService,
              public enfermagemService: EnfermagemService) {
  }

  ionViewWillEnter(){
    this.list();
  }


  ngOnInit(): void{

  }

  newItem(){
    this.navCtrl.push('PrescricaoPage');
  }

  itemSelected(item: PrescricaoDTO, medico: MedicoDadosDTO, enfermagem: EnfermagemDTO){
    this.navCtrl.push('PrescricaoPage', {item: item , medico: medico, enfermagem: enfermagem});
  }

  list(){
    this.items = [];
    this.showLoading();
    this.prescricaoService.findAll().subscribe(response => {
      this.closeLoading();
      this.items = response;
    },error => {
      this.closeLoading();
    })
    
  }
  showLoading(){
    this.loading = this.loadingCtrl.create({
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
    this.prescricaoService.deletar(id).subscribe(response =>{
      this.navCtrl.setRoot('PrescricaoListPage');
    })
  }
  
}
