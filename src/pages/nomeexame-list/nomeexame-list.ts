import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Refresher, Item } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NomeExameDTO } from '../../modules/nomeexame.dto';
import { CategoriaExameDTO } from '../../modules/categoriaexame.dto';
import { NomeExameService } from '../../services/domain/nomeexame.service';
import { CategoriaExameService } from '../../services/domain/categoriaexame.service';


@IonicPage()
@Component({
  selector: 'page-nomeexame-list',
  templateUrl: 'nomeexame-list.html',
})
export class NomeexameListPage implements OnInit {
  
  @ViewChild(Refresher) refresher: Refresher;

  loading: any;
  formGroup: FormGroup;
  items: NomeExameDTO[]=[];
  categoriaExame: CategoriaExameDTO[]=[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loadingCtl: LoadingController,
    public alertControler: AlertController,
    public nomeService: NomeExameService,
    public categoriaService: CategoriaExameService,) {
  }


  ngOnInit(): void {
   
  }

  ionViewWillEnter(){
    this.list();
  }

  list(){
    this.items = [];
    this.showLoading();
    this.nomeService.findAll().subscribe(response => {
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

  itemSelected(item: NomeExameDTO,categoriaExame: CategoriaExameDTO){
    this.navCtrl.push('NomeexamePage', {item: item, categoriaExame:categoriaExame});
  }

  newItem(){
    this.navCtrl.push('NomeexamePage');
  }

  deletar(id){
    this.nomeService.deletar(id).subscribe(response => {
      this.items = response;
      this.list();
      let alert = this.alertControler.create({
        title: "Sucesso",
        message: "Nome removido com sucesso!",
        buttons: [{
          text: "OK"
        }]
      });
      alert.present();
    })
  }


}
