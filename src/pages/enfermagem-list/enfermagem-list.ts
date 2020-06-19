import { ExpecialidadeEnfermagemDTO } from './../../modules/expenfermagem.dto';
import { ExpecialidadeEnfermagemService } from './../../services/domain/expenfermagem';
import { EnfermagemService } from './../../services/domain/enfermagem.service';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Refresher, LoadingController } from 'ionic-angular';
import { EnfermagemDTO } from '../../modules/enfermagem.dto';

/**
 * Generated class for the EnfermagemListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-enfermagem-list',
  templateUrl: 'enfermagem-list.html',
})
export class EnfermagemListPage implements OnInit {
  @ViewChild(Refresher) refresher: Refresher;
 
  FormGroupName: FormGroup;
  items: EnfermagemDTO[] = [];
  listaExpEnfemagem: ExpecialidadeEnfermagemDTO[] = [];
  loading: any;
  alertControl: any;
 
  constructor(  
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtl: LoadingController,
    public enfermagemService: EnfermagemService,
    public expecialidadeEnfermagemService: ExpecialidadeEnfermagemService) {
  }

  ionViewWillEnter(){
   this.list();
  }

  ngOnInit(): void {
    
  }

  list(){
    this.items = [];
    this.showLoading();
    this.enfermagemService.findAll().subscribe(response => {
      this.closeLoading();
      this.items = response;
    },error => {
      // TODO - EXIBIR MSG DE ERRO NA TELA
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
    this.navCtrl.push('EnfermagemPage');
  }

  itemSelected(item: EnfermagemDTO, expenfermagem: ExpecialidadeEnfermagemDTO){
    this.navCtrl.push('EnfermagemPage', {item: item , expenfermagem:expenfermagem});
  }

  deletar(id){
    this.enfermagemService.deletar(id).subscribe(response => {
      this.items = response;
      this.list();
      let alert = this.alertControl.create({
        title: "Sucesso",
        message: "Estado removido com sucesso!",
        buttons: [{
          text: "OK"
        }]
      });
      alert.present();
    })
  }
}
