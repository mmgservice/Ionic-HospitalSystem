import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Refresher, AlertController } from 'ionic-angular';
import { LeitoService } from '../../services/domain/leito.service';
import { QuartoService } from '../../services/domain/quarto.service';
import { FormGroup } from '@angular/forms';
import { LeitoDTO } from '../../modules/leito.dto';
import { QuartoDTO } from '../../modules/quarto.dto';

@IonicPage()
@Component({
  selector: 'page-leito-list',
  templateUrl: 'leito-list.html',
})
export class LeitoListPage implements OnInit{
@ViewChild(Refresher) refresher: Refresher;

loading : any;
formGroup: FormGroup;
items: LeitoDTO[] = [];
quarto: QuartoDTO[] = [];


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtl: LoadingController,
              public leitoService: LeitoService,
              public quartoService: QuartoService,
              public alertControler: AlertController
              
  ) {


  }

  ionViewWillEnter(){
    this.list();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeitoListPage');
  }

  ngOnInit(): void{

  }

  itemSelected(item: LeitoDTO, quarto: QuartoDTO){
    this.navCtrl.push('LeitoPage', {item: item, quarto: quarto});
  }

  list(){
    this.items = [];
    this.showLoading();
    this.leitoService.findAll().subscribe(response => {
      this.closeLoading();
      this.items = response;
    }, error => {
      this.closeLoading();
    });
  }

  newItem(){
    this.navCtrl.push('LeitoPage');
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
  back() {
    if (this.navCtrl.canGoBack()) {
      this.navCtrl.pop();
    } else {
      this.navCtrl.popToRoot();
    }
  }
  
  deleteLeito(id) {
    this.leitoService.deletar(id).subscribe(response =>{
      this.navCtrl.setRoot('LeitoListPage');
    })
  }

}
