import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Refresher, AlertController } from 'ionic-angular';
import { CategoriaMedicamentoService } from '../../services/categoriamedicamento.service';
import { FormGroup } from '@angular/forms';
import { CatMedicamentoDTO } from '../../modules/catmedicamento.dto';



@IonicPage()
@Component({
  selector: 'page-categoriamedicamento-list',
  templateUrl: 'categoriamedicamento-list.html',
})
export class CategoriamedicamentoListPage implements OnInit {
@ViewChild(Refresher) refresher: Refresher;

loading: any;
formGroup: FormGroup;
items: CatMedicamentoDTO[] = [];

  constructor(public navCtrl: NavController, 
              public loadingCtl: LoadingController,
              public navParams: NavParams,
              public alertCtl: AlertController,
              public categoriaService: CategoriaMedicamentoService) {
  }

  ionViewWillEnter(){
    this.list();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriamedicamentoListPage');
  }

  ngOnInit(): void{

  }

  list(){
    this.items = [];
    this.showLoading();
    this.categoriaService.findAll().subscribe(response => {
      this.closeLoading();
      this.items = response;
    }, error => {
      this.loading = false;
    })
  }

  newItem(){
    this.navCtrl.push('CategoriamedicamentoPage');
  }

  showLoading(){
    this.loading = this.loadingCtl.create({
      content: "Aguarde..."
    });
    this.loading.present();
  }
  itemSelected(item : CatMedicamentoDTO){
    this.navCtrl.push('CategoriamedicamentoPage', {item: item});
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
    this.showLoading();
    this.categoriaService.delete(id).subscribe(response => {
        this.closeLoading();
        let alert = this.alertCtl.create({
          title: "Sucesso",
          message: "Cadastro removido com sucesso!",
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
      })
      this.navCtrl.setRoot('CategoriamedicamentoListPage');
  }
  back() {
    if (this.navCtrl.canGoBack()) {
      this.navCtrl.pop();
    } else {
      this.navCtrl.popToRoot();
    }
  }
}
