import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController,AlertController, LoadingController, Refresher } from 'ionic-angular';
import { QuartoService } from '../../services/domain/quarto.service';
import { QuartoDTO } from '../../modules/quarto.dto';
import { FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-quarto-list',
  templateUrl: 'quarto-list.html',
})
export class QuartoListPage implements OnInit{
  @ViewChild(Refresher) refresher: Refresher;

   items: QuartoDTO[] = [];
   loading: any;
   formGroup: FormGroup;

  constructor(public navCtrl: NavController, 
              public alertControl: AlertController,
              public loadingCtrl: LoadingController, 
              public quartoservice: QuartoService) {
  }

  ionViewWillEnter(){
   this.list();
  }


 ngOnInit(): void {

 }

 newItem(){
   this.navCtrl.push('QuartoPage')
 }

 itemSelected(item: QuartoDTO){
   this.navCtrl.push('QuartoPage', {item: item});
 }


 list(){
   this.items = [];
   this.showLoading();
   this.quartoservice.findAll()
   .subscribe(response => {
      this.closeLoading();
      this.items = response;
    }, error => {
      this.loading = false;
      
    })
 }
   /**
   * Abre o loading
   */
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    this.loading.present();
  }

  /**
   * Fecha o loading
   */
  closeLoading() {
    if (this.loading) {
      this.loading.dismiss();
    }
    if (this.refresher) { // Avisa ao refresher que os itens foram listados
      this.refresher.complete();
    }
  }
}
